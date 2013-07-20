jQuery(function($) {
  
  var initialActive = $("#menu a.active");
  
  $(document).pusher({
    watch: "a:not([href^='http'])",
    initialPath: initialActive.attr('href'),
    before: function(done) {
      showLoading(done);
    },
    after: function() {
      hideLoading();
      activate(this.state.path);
    },
    handler: function() {
      $("title").text(this.get("title").text());
      slide(this.get("#content").contents());
    },
    fail: function() {
      slide("<p class='error'>Oops... failed to load page " + this.state.path + "</p>");
    },
    onStateCreation: function(state, elem) {
      var data = {};
      if(elem) {
        data.mainMenu = elem.closest('#menu').length > 0;
      }
      state.myData = data;
    }
  });
  
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
