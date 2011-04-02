/*!
 * Responsive Images
 * Mobile-First images that scale responsively and responsibly
 * Copyright 2010, Scott Jehl, Filament Group, Inc
 * Dual licensed under the MIT or GPL Version 2 licenses. 
 * Check out the README.md file for instructions and optimizations
*/
(function(win){
	//defaults / mixins
	var	rwdi = (function(){
			var defaults = {
				widthBreakPoint: 480
			};
			//mixins from rwd_images global
			if( 'rwd_images' in win ){
				for (var setting in win.rwd_images) {
			        defaults[setting] = win.rwd_images[setting];
			    }
			}
			return defaults;
		})(),		
		widthBreakPoint = rwdi.widthBreakPoint,
		wideload = win.screen.availWidth > widthBreakPoint,
		doc = win.document,
		
		//record width cookie for subsequent loads
		recordRes = (function(){
			var date = new Date();
		    date.setTime(date.getTime()+(1/*1 day*/*24*60*60*1000));
		    doc.cookie = "rwd-imgsize="+ ( wideload ? "large" : "small" ) +"; expires=" + date.toGMTString() +"; path=/";
		})();

		//if wideload is false quit now
		if( !wideload ){
			return;
		}
		
		//find and replace img elements
		var findrepsrc = function(){
			var imgs = doc.getElementsByTagName('img'),
				il = imgs.length;
				
			for(var i = 0; i < il; i++){
				var img = imgs[i],
					fullsrc = img.getAttribute('data-fullsrc');
					
				if(fullsrc){
					img.src = fullsrc;
				}
			}
		},
			    
	    //flag for whether loop has run already
	    complete = false,
	    
	    //rfind/rep image srcs if wide enough (maybe make this happen at domready?)
	    readyCallback = function(){
	    	if( complete ){ return; }
	    	complete = true;
	    	findrepsrc();
	    };
	
	//DOM-ready or onload handler
	//W3C event model
	if ( doc.addEventListener ) {
		doc.addEventListener( "DOMContentLoaded", readyCallback, false );
		//fallback
		win.addEventListener( "load", readyCallback, false );
	}
	// If IE event model is used
	else if ( doc.attachEvent ) {
		doc.attachEvent("onreadystatechange", readyCallback );
		//fallback
		win.attachEvent( "onload", readyCallback );
	}
})(this);