const express = require('express');
const bodyParser = require('body-parser');
var fs = require('fs');
const app = express();
const baseDir = './tests'
const csv = require('csv-parser')
const server = app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
var csvWriter = require('csv-write-stream')
var writer = csvWriter({sendHeaders: false})
const uuidv4 = require('uuid/v4');
writer.pipe(fs.createWriteStream(`${baseDir}/Documents.csv`, {flags: 'a'}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})

var io = require('socket.io').listen(server, {
  log: false,
  agent: false,
  origins: 'http://localhost:3000',
  transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
let valueStorage = []

fs.createReadStream(`${baseDir}/Documents.csv`)
  .pipe(csv())
  .on('data', (row) => {
    valueStorage[row.id] = row.value
  })


if (!fs.existsSync(`${baseDir}`)){
    fs.mkdirSync(`${baseDir}`)
}



app.get('/api/documentsInfo', async(req,res) =>{
  const results = []
  fs.createReadStream(`${baseDir}/Documents.csv`)
  .pipe(csv())
  .on('data', (row) => {
    results.push(row)
  })
  .on('end', () => {
    res.status(200).json(results)
  })
})

app.post('/api/newDocument', async(req,res) =>{
  try {
    writer.write({
      id: uuidv4(),
      title: req.body.title,
      author: req.body.author,
      value: ""
    })
    res.status(200)
  } catch (error) {
    console.log(error)
    res.status(400)
  }
  
})

app.get('/api/documentsInfo', async(req,res) =>{
  const results = []
  fs.createReadStream(`${baseDir}/Documents.csv`)
  .pipe(csv())
  .on('data', (row) => {
    results.push(row)
  })
  .on('end', () => {
    res.status(200).json(results)
  })
})

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

io.on('connection', socket => {
  
  socket.on('getValue', (id) => {
    if(!valueStorage[id]){
      valueStorage[id] = ""
    } 
    io.emit('getValue', {id, value: valueStorage[id]})
  })
  
  socket.on('changeValue', ({id, value}) => {
    if(valueStorage[id] !== value && value !== ""){
      valueStorage[id] = value
      io.emit('getValue', {id, value})
    }
  })
})