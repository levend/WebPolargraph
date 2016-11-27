var express = require('express')
var router = express.Router()
var Port = require('../businessLogic/serialPort')
var Queue = require('../businessLogic/queue')
var GCodeFileManager = require('../businessLogic/gCodeFileManager')
var fs = require('fs')

function renderActionPanel(res) {
  var data = {}

  data.portState = Port
  data.commandQueue = Queue

  //console.log("VM:"+JSON.stringify(data));
  Port.getPorts(function(ports) {
    res.render('sub/actions',{viewModel:data}, function (err, actionHTML) {

      res.render('sub/commandQueue', {viewModel:data}, function (err, commandHTML) {

        res.send({actionHTML:actionHTML, commandHTML:commandHTML})
      })
    })
  })
}

function insertDefaultCommands() {

  Queue.insert("C02,0.61,END")
  Queue.insert("C31,2000,END")
  Queue.insert("C32,4000,END")
}

function serialEventParser(message) {

  if (Queue.isRunning && message=="READY") {
    //get the top message from the queue
    var topMessage = Queue.peek()
    if (topMessage) {
      Port.sendMessage(topMessage, function(error) {
        if (error == null) {
          Queue.pop()
        }
      })
    }
  }
}

router.post('/openPort',function (req, res) {
  Port.open(serialEventParser,function (success) {

    if (success) {
      insertDefaultCommands()
    }

    renderActionPanel(res)
  })
})

router.post('/closePort',function (req, res) {
  Port.close()
  Queue.stop()
  renderActionPanel(res)
})

router.post('/startQueue',function (req, res) {
  Queue.start()
  renderActionPanel(res)
})

router.post('/stopQueue',function (req, res) {
  Queue.stop()
  renderActionPanel(res)
})

router.post('/clearQueue',function (req, res) {
  Queue.clear()

  renderActionPanel(res)
})

router.post('/sendCommand', function (req, res) {
  var command = req.body.command
  console.info("Insert new command to queue: %s", command)
  Queue.insert(command)
  renderActionPanel(res)
})

router.post('/uploadDesign', function (req, res, next) {
  var filename = './uploaded/'+ req.files.dataFile.name
  var fileContent = req.files.dataFile.data

  fs.writeFile(filename,fileContent,'utf8',function (err) {
    console.log("Uploaded file written")
    var data = {}

    data.fileManager = GCodeFileManager
    res.redirect('/')

  })
})

router.get('/loadFile', function (req, res, next) {

  var fileToLoad = req.query.filename
  var lines = GCodeFileManager.readFile(fileToLoad)
  for (var i = 0; i < lines.length; i++) {
    var currentLine = lines[i];
    Queue.append(currentLine.trim())
  }
  res.redirect('/')
})

router.get('/deleteFile',function (req, res) {
  var fileToDelete = req.query.filename

  GCodeFileManager.deleteFile(fileToDelete)

  res.redirect('/')
})

router.get('/selectPort', function(req, res, next){
  var selectedPort = req.query.portName
  Port.selectedPortName = selectedPort
  res.redirect('/')
})



module.exports = router;
