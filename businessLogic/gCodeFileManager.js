var fs = require('fs')

var GCodeFileManager = function () {
  
}

GCodeFileManager.prototype.getFiles = function () {
  var fileList = fs.readdirSync('./uploaded/')
  for (var i = 0; i < fileList.length; i++) {
    var currentFileName = fileList[i];

  }
  return fileList
}

GCodeFileManager.prototype.readFile = function (filename) {
  var path = './uploaded/'+filename
  var content = fs.readFileSync(path,"utf8")
  var contentArray = content.split('\n')

  return contentArray
}

GCodeFileManager.prototype.deleteFile = function (filename) {
  var path = './uploaded/'+filename
  fs.unlinkSync(path)
  return this.getFiles()
}

module.exports = new GCodeFileManager()