/*
 *  jquery-boilerplate - v3.4.0
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

    "use strict";

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "numpad";
    var defaults = {
	input: ".inputs",
	btnClass: "btnClass"
    };

    //called thusly
    //$("#container").numpad({
    //		input: ".inputs",
    //		btnClass: ".btnClass"
    //});
    
    // The actual plugin constructor
    function Plugin ( element, options ) {
	this.element = element;
	// jQuery has an extend method which merges the contents of two or
	// more objects, storing the result in the first object. The first object
	// is generally empty as we don't want to alter the default options for
	// future instances of the plugin
	this.settings = $.extend( {}, defaults, options );
	this._defaults = defaults;
	this._name = pluginName;
	this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
	
	init: function () {
	    // Place initialization logic here
	    // You already have access to the DOM element and
	    // the options via the instance, e.g. this.element
	    // and this.settings
	    // you can add more functions like the one below and
	    // call them like so: this.yourOtherFunction(this.element, this.settings).
            var plugin = this;
        
	    this.output = this.element;
	    this.target = this.settings.input;
	    
            this.display(this.element, this.settings.input, this.settings.btnClass);
                        
            $(this.settings.input).on("click", function(){
                var newID = $(this).attr("id");
                plugin.retarget("#" + newID);
            });
            
            this.retarget( $(this.settings.input)[0] );
	},
	
	display: function (output, target, btnClass) {
	    var that = this;
	    var buttons = [];
    
	    for(var i=0; i<=9; i++) {
		 var button = $("<BUTTON class='"+btnClass+"' type='button' value='"+i+"'>"+i+"</BUTTON>").click(function() {
		    var add = $(this).val();
		    var old = $(that.target).val();
		    $(that.target).val("" + old + add);
		});
		buttons[i] = button;
	    }
    
	    var out = $("<TABLE style='float:right;'></TABLE>");
    
	    var row = $("<TR></TR>");
	    for(var i=7; i<=9; i++) {
		var td = $("<TD></TD>");
		td.append(buttons[i]);
		row.append(td);
	    }
	    out.append(row);
    
	    var row = $("<TR></TR>");
	    for(var i=4; i<=6; i++) {
		var td = $("<TD></TD>");
		td.append(buttons[i]);
		row.append(td);
	    }
	    out.append(row);
    
	    var row = $("<TR></TR>");
	    for(var i=1; i<=3; i++) {
		var td = $("<TD></TD>");
		td.append(buttons[i]);
		row.append(td);
	    }
	    out.append(row);
	    
	    var row = $("<TR></TR>");
	    var td = $("<TD></TD>");
	    td.append(buttons[0]);
	    row.append(td);
	    var td = $("<TD></TD>");
	    td.append($("<BUTTON class='"+btnClass+"' type='button' value='.'>.</BUTTON>").click(function() {
		var add = $(this).val();
		var old = that.target.val();
		that.target.val("" + old + add);
	    }));
	    row.append(td);
	    var td = $("<TD></TD>");
	    td.append($("<BUTTON class='"+btnClass+"' type='button' value='backspace'>&lt;&lt;</BUTTON>").click(function() {
		var old = that.target.val();
		var bspace = old.substring(0, old.length-1);
		that.target.val(bspace);
	    }));
	    row.append(td);
	    out.append(row);
    
	    $(this.output).empty();
	    $(this.output).append(out);
        },
	
	retarget: function(newTarget){
	    this.target = $(newTarget);
            //console.log("Target changed to " + newTarget);
	}
        
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {
	return this.each(function() {
	    if ( !$.data( this, "plugin_" + pluginName ) ) {
		$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
	    }
	});
    };

})( jQuery, window, document );
