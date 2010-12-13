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
				clientSideOnly: false,
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
		clientSideOnly = rwdi.clientSideOnly, 
		widthBreakPoint = rwdi.widthBreakPoint,
		wideload = screen.availWidth > widthBreakPoint,
		filePath = location.href,
		dirPath = filePath.substring(0, filePath.lastIndexOf('/')) + '/',
		doc = win.document,
		head = doc.getElementsByTagName('head')[0],
		
		//record existing window onload handler
		winload = win.onload,
		
		//record width cookie for subsequent loads
		recordRes = (function(){
			var date = new Date();
		    date.setTime(date.getTime()+(1/*1 day*/*24*60*60*1000));
		    doc.cookie = "rwd-resolution=" + screen.availWidth + "; expires=" + date.toGMTString() +"; path=/";
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
				else{
					img.src = img.src;
				}
			}
		},
		//base tag support test (returns base tag for use if support test passes)
			//originally used in the jQuery Mobile framework, converted to plain JS in the hasjs framework, modified for use here	
		base = (function(){
			var backup,
				baseAdded = false,
				q = doc.createElement("q"),
				supported = false,
				base = head.getElementsByTagName("base")[0] || (function(){
	                baseAdded = true;
	                return head.insertBefore(doc.createElement("base"), head.firstChild);
	            })();
	         
	        backup = !baseAdded && base.href;   
	        //test base support before using
            base.href = location.protocol + "//" + "x/";
            q.cite = "y";
            //if dynamic base tag is unsupported (Firefox)
            if(q.cite.indexOf("x/y") < 0 ){
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
            		base.href = dirPath +  "rwd-image-trap/";
            	}
            }
	      return base;
	    })();
	
	//on load, remove base if present, find/rep image srcs if wide enough (maybe make this happen at domready?)
	win.onload = function(){	
		if( base ) {
			//set base back to something real before removing
			base.href = dirPath;
			head.removeChild(base);
		}
		findrepsrc();
		if( winload ){
			winload();
		}
	};
})(this);