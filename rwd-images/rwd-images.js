/*!
 * Responsive Images
 * Mobile-First images that scale responsively and responsibly
 * Copyright 2010, Scott Jehl, Filament Group, Inc
 * Dual licensed under the MIT or GPL Version 2 licenses. 
 * Check out the README.md file for instructions and optimizations
*/
(function( win ){
	//defaults / mixins
	var	rwdi			= win.rwd_images || {},
		widthBreakPoint	= rwdi.widthBreakPoint || 480,
		htmlClass		= "rwd-imgs-lrg",
		wideload		= win.screen.availWidth > widthBreakPoint,
		filePath		= location.href,
		dirPath			= filePath.substring( 0, filePath.lastIndexOf( "/" ) ) + "/",
		doc				= win.document,
		head			= doc.getElementsByTagName( "head" )[0],
		
		//record width cookie for subsequent loads
		recordRes		= (function( date ){
		    date.setTime(date.getTime()+(1/*1 day*/*24*60*60*1000));
		    doc.cookie = "rwd-resolution=" + screen.availWidth + "; expires=" + date.toGMTString() +"; path=/";
		})( new Date() );

		//if wideload is false quit now
		if( !wideload ){
			return;
		}
		
		//add HTML class
		doc.documentElement.className += " " + htmlClass;
		
		//base tag support test (returns base tag for use if support test passes)	
		var base = (function(){
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
            	base.href = dirPath +  "rwd-router/";
            }
	      return base;
	    })();
	    

})(this);