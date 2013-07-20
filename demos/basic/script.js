jQuery(function($) {
  
  $("#menu").pusher({
    handler: function() {
      $("title").text(this.get("title").text());
      var cnt = "#content";
      $(cnt).html(this.get(cnt).contents());
    }
  });
  
});
