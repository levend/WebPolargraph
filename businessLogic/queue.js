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
    this.commandQueue.push(elem)
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

Queue.prototype.append = function (command) {
  this.commandQueue.push(command)
}

Queue.prototype.insert = function (command) {
  this.commandQueue.unshift(command)
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