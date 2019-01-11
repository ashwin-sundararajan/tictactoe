const express = require('express')

const app = express()
const server = require('http').Server(app)

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

server.listen(3000, function() {
  console.log('\n=== Server Running on 3000 ===\n')
})
