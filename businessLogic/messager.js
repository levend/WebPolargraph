var Messager = function () {
  this.socket = null
  this.io = null
}


Messager.prototype.registerSocket = function (s) {
  console.info('Registering socket')
  this.socket = s
}

Messager.prototype.send = function (topic, message) {
  this.io.emit(topic,message)
}

Messager.prototype.sendReceived = function (message) {
  this.send("serialMessage",{message:message})
}

Messager.prototype.deleteFromQueue = function (identifier) {
  this.send("queueMessage", {identifier:identifier})
}

module.exports = new Messager()