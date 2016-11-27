var express = require('express');
var router = express.Router();
var SerialPort = require('../businessLogic/serialPort')
var Queue = require('../businessLogic/queue')
var GCodeFileManager = require('../businessLogic/gCodeFileManager')

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {}

  data.portState = SerialPort
  data.commandQueue = Queue
  data.fileManager = GCodeFileManager

  console.log("VM:"+JSON.stringify(data));
  res.render('index',{viewModel:data})
});

router.post('/uploadDesign', function (req, res, next) {
  res.render('index')
})

module.exports = router;
