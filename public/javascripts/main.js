$( function() {

  function updateSidePanels(responseData) {
    $("#actionPanelPlaceholder").html(responseData.actionHTML)
    $("#commandQueuePlaceholder").html(responseData.commandHTML)
    bindActionButtons()
  }

  function bindActionButtons() {

    $("#openPortButton").click(function (){
      jQuery.post('/controller/openPort', function(responseData, testStatus){
        updateSidePanels(responseData)
      })
    })

    $("#closePortButton").click(function (){
      jQuery.post('/controller/closePort', function(responseData, testStatus){
        updateSidePanels(responseData)
      })
    })

    $("#startQueueButton").click(function (){
      jQuery.post('/controller/startQueue', function(responseData, testStatus){
        updateSidePanels(responseData)
      })
    })

    $("#stopQueueButton").click(function (){
      jQuery.post('/controller/stopQueue', function(responseData, testStatus){
        updateSidePanels(responseData)
      })
    })

    $("#emptyQueueButton").click(function (){
      jQuery.post('/controller/clearQueue', function(responseData, testStatus){
        updateSidePanels(responseData)
      })
    })

    $("#setHomeButton").click(function (){
      var payload = {}
      payload.command = "C09,965,968,END"

      jQuery.post('/controller/sendCommand', payload, function(responseData, testStatus){
        updateSidePanels(responseData)
      })
    })

    $("#returnHomeButton").click(function (){
      var payload = {}
      payload.command = "C01,965,968,END"
      jQuery.post('/controller/sendCommand', payload, function(responseData, testStatus){
        updateSidePanels(responseData)
      })
    })

    $("#liftPenButton").click(function (){
      var payload = {}
      payload.command = "C14,0,END"
      jQuery.post('/controller/sendCommand', payload, function(responseData, testStatus){
        updateSidePanels(responseData)
      })
    })

    $("#lowerPenButton").click(function (){
      var payload = {}
      payload.command = "C13,91,END"
      jQuery.post('/controller/sendCommand', payload, function(responseData, testStatus){
        updateSidePanels(responseData)
      })
    })




  }

  bindActionButtons()

  var socket = io.connect(window.location.origin)

  socket.on('connect', function(){
    console.log('Socket connected: %s',socket.id);
  });

  socket.on('serialMessage', function (data) {
    console.log("SERIAL MESSAGE:" + data.message)
    $("#statusRow").text("Status: "+data.message)
  });

  socket.on('queueMessage', function (data) {
    console.log("QUEUE MESSAGE:" + data.identifier)
    var rowToDelete = $("#"+data.identifier)
    var nextRow = rowToDelete.next()

    nextRow.addClass("success")
    rowToDelete.remove()

  });


} );