jquery pusher plugin
=================

Enable HTML5 History navigation in your web site easly.

This plugin aims to enable the HTML5 navigation in sites without having to change anything server side. If the browser does not support HTML5 no fallback is provided, the site will be simply browsed in the old way.

###Basic usage
    $("#menu").pusher({

      handler: function() {

        //when a link in the #menu is clicked, the plugin load the page internally
        
        //then we change the page title
        $("title").text(this.get("title").text());

        //and replace the #content contents
        var cnt = "#content";
        $(cnt).html(this.get(cnt).contents());

     }

    });


###Demo
[Basic][1] and [Advanced][2]

###Options
Option | Dafault | Note
--- | --- | ---
handler | noop | function that defines the plugin main behavior, executed after the page load, if no errors occur
before | `function(done) { done(); }` | function executed before ajax call that loads the page. **IMPORTANT**: the `done` function must be called, otherwise the execution does not continuous
after | noop | function executed after the page load, everytime
fail | `window.alert("Failed to load " + this.state.path);` | function executed after the page load, if errors occur
watch | `"a"`| watched elements
initialPath | `window.location.pathname` | first state path
onStateCreation | noop | function executed everytime when new state is created, takes as parameters: the new state and the clicked element (if exists) , can be used to add additional values to the state


LICENSE
---------

Copyright 2013 Antonio Salvati

Released under the MIT and GPL (version 2 or later) Licenses.


[1]: http://www.antoniosalvati.it/public/jquery-pusher/demo/basic/
[2]: http://www.antoniosalvati.it/public/jquery-pusher/demo/advanced/


