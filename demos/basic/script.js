jQuery(function($) {
  
  $("#menu").pusher({
    handler: function() {
      this.updateText("title");
      this.updateHtml("#content");
    }
  });
  
});
