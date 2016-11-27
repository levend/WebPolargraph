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
} );