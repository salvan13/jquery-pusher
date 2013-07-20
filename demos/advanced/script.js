jQuery(function($) {
  
  //initial active menu element
  var initialActive = $("#menu a.active");
  
  $(document).pusher({
    
    //watch on all 'a' in the document excpet external links
    watch: "a:not([href^='http'])",
    
    //set initial path = the .active link in menu
    initialPath: initialActive.attr('href'), 
    
    before: function(done) {
      //show loading before page load
      showLoading(done); 
    },
    after: function() {
      //hide loading when the page is loaded
      hideLoading(); 
      
      //add active class on all element with href = state.path
      activate(this.state.path);  
    },
    handler: function() {
      //change the page title
      $("title").text(this.get("title").text());
      
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
    next.animate({left: 0});
    cnt.animate({left: -500}, function(){
      cnt.remove();
      next.attr("id", "content");
    });
    
  };
  
  var activate = function(path) {
    $("a.active").removeClass("active");
    $("a[href='" + path + "']").addClass("active");
    if(!$("a.active").length) {
      initialActive.addClass("active");
    }
  };
  
});
