$(function() {
  var socket = io("http://localhost:8888/");



  socket.on("message", function(data) {
    // var html = $("#log").html() + data.message;
    // $("#log").html(html)
    $("#log").html(data.message)
  });

  

  socket.on("initBack", function(data) {
    console.log(data);
    $("#log").html(data.message)
  });

  socket.emit("initData");
  
});
