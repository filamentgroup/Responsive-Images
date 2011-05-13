/*!
 * Responsive Images
 * Mobile-First images that scale responsively and responsibly
 * Copyright 2010, Scott Jehl, Filament Group, Inc
 * Dual licensed under the MIT or GPL Version 2 licenses. 
 * Check out the README.md file for instructions and optimizations
*/
(function(win){
	//defaults / mixins
	var rwdi = (function(){
			var defaults = {
				clientSideOnly: false,
				widthBreakPoint: 480,
				testImageWidths: false
			};
			//mixins from rwd_images global
			if( 'rwd_images' in win ){
				for (var setting in win.rwd_images) {
					defaults[setting] = win.rwd_images[setting];
				}
			}
			return defaults;
		})(),
		clientSideOnly = rwdi.clientSideOnly, 
		widthBreakPoint = rwdi.widthBreakPoint,
		wideload = win.screen.availWidth > widthBreakPoint,
		filePath = location.href,
		dirPath = filePath.substring(0, filePath.lastIndexOf('/')) + '/',
		doc = win.document,
		head = doc.getElementsByTagName('head')[0],
		
		//record width cookie for subsequent loads
		recordRes = (function(){
			var date = new Date();
			// Generic cookie that we can delete onload.
			date.setTime(date.getTime()+(1/*1 sec*/*1000))
			doc.cookie = "rwd=y; expires=" + date.toGMTString() +"; path=/";
			// Screen width cookie
			date.setTime(date.getTime()+(1/*1 day*/*24*60*60*1000));
			doc.cookie = "rwd-resolution=" + screen.availWidth + "; expires=" + date.toGMTString() +"; path=/";
		})();

		//if wideload is false quit now
		if( !wideload && !rwdi.testImageWidths ){
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
					if(!rwdi.testImageWidths) {
						img.src = fullsrc
					} else 
					// If image hasn't loaded yet, add a load event listener.
					// If we don't wait for load, image reports wrong size.
					if (!img.complete) {
						// Don't need to support IE event model here, because we've
						// already waited for images.
						img.addEventListener("load", function() {
							this.removeEventListener("load", arguments.callee, false);
							testAndUpdateImage(this);
						}, false);
					} else {
						testAndUpdateImage(img);
					}
				}
			}
		},

		//update an image src if its width is smaller than its rendered width. 
		testAndUpdateImage = function(img) {
			if(img.offsetWidth <= img.getAttribute("width")){
				// TODO: Why is this needed?
				img.src = img.src.replace(".r", "");
			} else {
				img.src = img.getAttribute('data-fullsrc');
			}
		}

		//flag for whether loop has run already
		complete = false,

		//remove base if present, find/rep image srcs if wide enough (maybe make this happen at domready?)
		readyCallback = function(){
			if( complete ){ return; }
			complete = true;
			//making this async seems to ensure images don't double request?
			setTimeout(function(){
				doc.cookie = "rwd=; expires=expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/";
				findrepsrc();
			},0);
		};

	//DOM-ready or onload handler
	//W3C event model
	if ( doc.addEventListener ) {
		doc.addEventListener( "DOMContentLoaded", readyCallback, false );
		//fallback
		win.addEventListener( "load", readyCallback, false );
	}
	//If IE event model is used
	else if ( doc.attachEvent ) {
		//FIX: This is firing before the images are ready in the DOM in IE8,
		//Wwich is fine for screen res check, but not image size check.
		//doc.attachEvent("onreadystatechange", readyCallback );
		//fallback
		win.attachEvent( "onload", readyCallback );
	}
})(this);