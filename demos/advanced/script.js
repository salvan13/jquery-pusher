jQuery(function($) {
  
  $(document).pusher({
    
    //watch on all 'a' in the document excpet external links
    watch: "a:not([href^='http'])",
    
    before: function(done) {
      //show loading before page load
      showLoading(done); 
    },
    after: function() {
      //hide loading when the page is loaded
      hideLoading();
    },
    handler: function() {
      //update the page title
      this.updateText("title");
      
      //update the menu
      this.updateHtml("#menu");
      
      //slide effect to show the loaded content
      slide(this.get("#content").contents());
    },
    fail: function() {
      //slide effect to show the problem
      slide("<p class='error'>Oops... failed to load page " + this.state.path + "</p>");
    },
    onStateCreation: function(state, elem) {
      //add some data to the state (we access that data in handler, after and fail in this.state )
      var data = {};
      if(elem) {
        data.mainMenu = elem.closest('#menu').length > 0;
      }
      state.myData = data;
    }
  });
  
  
  //non related plugin functions
  
  var loading = $("<div/>").attr("id", "loading").text("Loading...").hide();
  $("body").append(loading);
  
  var showLoading = function(done) {
    $("#loading").fadeIn(function() {
      done();
    });
  };
  
  var hideLoading = function() {
    $("#loading").fadeOut();
  };
  
  var slide = function(content) {
    var cnt = $("#content");
    var next = $("#next");
    next = next.length ? next : $("<div>").attr("id", "next");
    next.html(content);
    next.insertAfter(cnt);
    next.animate({left: 0}, function(){
      cnt.remove();
      next.attr("id", "content");
    });
    
  };
  
});
