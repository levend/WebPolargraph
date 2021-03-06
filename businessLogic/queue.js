var UUID = require('uuid')

var Queue = function() {
  this.commandQueue = new Array()
  this.pointer = -1
  this.isRunning = false
}

Queue.prototype.loadData = function(data) {
  this.commandQueue.length(0)

  data.split(';').every(function(elem) {
    elem = elem.trim()
    console.log('Inserting element: %s',elem)
    this.append(elem)
  })

  //set the first element if there are any
  if (this.commandQueue.length() >0 ) {
    this.pointer = 0;
  }
}

Queue.prototype.getNextInstruction = function () {
  var instruction = this.commandQueue[this.pointer]
  if (this.pointer < this.commandQueue.length()-1) {
    this.pointer++;
  }
  return instruction
}

Queue.prototype.clear = function () {
  this.commandQueue = new Array()
  this.pointer = -1
}

Queue.prototype.start = function() {
  this.isRunning = true
}

Queue.prototype.stop = function () {
  this.isRunning = false
}

//insert a message to the end of the queue
Queue.prototype.append = function (command) {
  var m = {}
  m.id = UUID.v4()
  m.msg = command
  this.commandQueue.push(m)
}

//insert a message to the beginning of the queue
Queue.prototype.insert = function (command) {
  var m = {}
  m.id = UUID.v4()
  m.msg = command
  this.commandQueue.unshift(m)
}

Queue.prototype.peek = function () {
  if (this.commandQueue.length > 0) {
    return this.commandQueue[0]
  } else {
    return null
  }

}

Queue.prototype.pop = function () {
  if (this.commandQueue.length > 0) {
    return this.commandQueue.shift()
  } else {
    return null
  }
}

module.exports = new Queue()