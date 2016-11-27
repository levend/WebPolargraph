var Port = require('serialport')

var SerialPort = function() {
  this.isOpen = false
  this.ports = []
  this.selectedPortName = "";

  this.getPorts()
  this.actualPort = null
}

SerialPort.prototype.open = function (parserFunction, callback) {
  var self = this
  if (self.selectedPortName.length > 0) {
    var portOptions = {}

    portOptions.baudRate = 57600
    portOptions.parser = Port.parsers.readline('\n')

    self.actualPort = new Port(this.selectedPortName, portOptions, function (error) {
      if (error) {
        console.error("Error opening serial port: %s",error)
        self.isOpen = false
        callback(false)
      } else {
        self.isOpen = true

        self.actualPort.on('data', function (data) {
          data = data.trim()
          console.log('Serial data: ' + data)
          parserFunction(data)
        });

        callback(true)
      }
    })
  }
}

SerialPort.prototype.close = function () {
  this.actualPort.close()
  this.isOpen = false
}

SerialPort.prototype.getPorts = function(callback) {
  var self = this
  Port.list(function (err, ports) {
    ports.forEach(function(port) {

      console.log(port.comName)
      console.log(port.pnpId)
      console.log(port.manufacturer)
    });
    self.ports = ports
    if (callback) {
      callback(ports)
    }
  });
}

SerialPort.prototype.sendMessage = function(message, callback) {
  this.actualPort.write(message+"\r\n", function (error) {
    console.log('Serial OUT: %s Error: %s',message,error)
    callback(error)
  })
}

module.exports = new SerialPort()