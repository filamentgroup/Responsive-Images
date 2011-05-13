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
				img.src = img.src;
			} else {
				img.src = img.getAttribute('data-fullsrc');
			}
		}

		//base tag support test (returns base tag for use if support test passes)
			//originally used in the jQuery Mobile framework, converted to plain JS in the hasjs framework, modified for use here	
		base = (function(){
			var backup,
				baseAdded = false,
				a = doc.createElement("a"),
				supported = false,
				base = head.getElementsByTagName("base")[0] || (function(){
					baseAdded = true;
					return head.insertBefore(doc.createElement("base"), head.firstChild);
				})();

			backup = !baseAdded && base.href;
			//test base support before using
			base.href = location.protocol + "//" + "x/";
			a.href = "y";
			//if dynamic base tag is unsupported (Firefox)
			if( a.href.indexOf("x/y") < 0 ){
				if(backup){
					base.href = backup;
				}
				else{
					head.removeChild(base);
				}
				base = null;
			}
			else{
				if(clientSideOnly){
					//more info up top, use with caution!
					base.href = "javascript://";
				}
				else{
					var href = dirPath + "rwd-router/";
					var pathDepth = location.pathname.split("/").length - 2;
					for (var i = 0, j = pathDepth; i<j; ++i) {
						href += "/";
					}
					base.href = href;
				}
			}
		  return base;
		})(),

		//flag for whether loop has run already
		complete = false,

		//remove base if present, find/rep image srcs if wide enough (maybe make this happen at domready?)
		readyCallback = function(){
			if( complete ){ return; }
			complete = true;
			//making this async seems to ensure images don't double request?
			setTimeout(function(){
				if( base ) {
					//set base back to something real before removing
					base.href = dirPath;
					head.removeChild(base);
				}
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