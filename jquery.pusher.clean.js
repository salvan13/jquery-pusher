;(function ( $, window, document ) {

  "use strict";
  
  var pluginName = "pusher",
    defaults = {
      watch: "a",
      initialPath: window.location.pathname,
      before: function(done) {
        done();
      },
      handler: function() {
      },
      after: function() {
      },
      fail: function() {
        window.alert("Failed to load " + this.state.path);
      },
      onStateCreation: function(state, elem) {
      }
    };

  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype = {

    init: function() {
      
      var self = this;
      
      if (!history.pushState) {
        return;
      }
      
      //create the initial state
      var initialState = createState({
        path: self.options.initialPath
      }, self.options.onStateCreation);
      
      history.replaceState(initialState, null, initialState.path);
      
      //click event
      $(self.element).on('click', self.options.watch, function (e) {
        e.preventDefault();
        
        var state = createState({
          path: $(this).attr('href'),
          elem: $(this)
        }, self.options.onStateCreation);
        
        
        run(self, state, true);
      });
      
      //popstate event
      window.addEventListener('popstate', function(e) {
        
        run(self, e.state);
      });
       
    }
    
  };
  
  var createState = function(params, fn) {
    var state = {};
    params = params || {};
    state.path = params.path;
    state.time = new Date().getTime();
    if(fn) {
      fn(state, params.elem);
    }
    return state;
  };
  
  var run = function(plugin, state, push) {
    
    if(!state) {
      return;
    }
    
    
    
    var context = {
      state: state,
      get: function(query) {
        return get(context.res, query);
      }
    };

    var done = function() {
      $.ajax({
        type: 'GET',
        url: state.path
      }).done(function (res) {
        context.res = res;
        if(push) {
          history.pushState(state, null, state.path);
        }
        plugin.options.handler.apply(context);  
      }).fail(function () {
        plugin.options.fail.apply(context);
      }).always(function () {
        plugin.options.after.apply(context);
      });
    };
  
    plugin.options.before.apply(context, [done]);
  };

  var get = function(data, query) {
    var html = $("<root>").html(data);
    var res = html.find(query);
    
    return res;
  };

  $.fn[pluginName] = function (options) {
    if (!$.data(document, "plugin_" + pluginName)) {
      $.data(document, "plugin_" + pluginName, new Plugin( this, options ));
    }
  };

})( jQuery, window, document );
