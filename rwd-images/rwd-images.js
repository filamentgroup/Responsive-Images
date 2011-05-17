/*!
 * Responsive Images
 * Images that scale responsively based on their rendered size.
 * Based on code Copyright 2010, Scott Jehl, Filament Group, Inc
 * Dual licensed under the MIT or GPL Version 2 licenses.
*/
(function(win){
        
    var doc = win.document,
        domLoaded = false;
    
    //defaults / mixins
    var options = (function(){
        var defaults = {
            translateUrl: function(url) {
                return url.replace("-sml.", "-lrg.");
            }
        };
        //mixins from rwd_images global
        if( 'rwd_options' in win ) {
            for (var setting in win.rwd_options) {
                defaults[setting] = win.rwd_options[setting];
            }
        }
        return defaults;
    })();

    // Set cookie to return 1x1 gif
    var date = new Date();
    date.setTime(date.getTime()+(5/*5 sec*/*1000));
    doc.cookie = "rwd=y; expires=" + date.toGMTString() +"; path=/";

    // Find and replace img elements
    function findImages() {
        var imgs = doc.getElementsByTagName('img');
        for (var i = 0, j = imgs.length; i < j; ++i) {
            var img = imgs[i];
            if (img.src.indexOf("?r") > 0) {
                // If 1x1 image hasn't loaded yet, add a load event listener.
                // If we don't wait for load, image reports wrong size.
                if (!img.complete) {
                    // Don't need to support old IE event model here, because we've
                    // already waited for images.
                    img.addEventListener("load", function() {
                        this.removeEventListener("load", arguments.callee, false);
                        testAndReplaceImage(this);
                    }, false);
                } else {
                    testAndReplaceImage(img);
                }
            }
        }
    }

    function testAndReplaceImage(img) {
        if (img.offsetWidth <= img.getAttribute("width")) {
            // Both URLs need to change to cache bust.
            img.src = img.src.split("?")[0];
        } else {
            // If we have a value after r, then use it.
            if (img.src.indexOf("?r=") != -1) {
                img.src = img.src.split("?r=")[1];
            } else {
                img.src = options.translateUrl(img.src.split("?")[0]);
            }
        }
    }
    
    function domLoadedCallback() {
        if( domLoaded ) { return; }
        domLoaded = true;
        doc.cookie = "rwd=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/";
        findImages();
    };

    // Add ready event, if W3C event model
    if ( doc.addEventListener ) {
        doc.addEventListener( "DOMContentLoaded", domLoadedCallback, false );
        //fallback
        win.addEventListener( "load", domLoadedCallback, false );
    }
    // Add ready event, if IE event model
    else if ( doc.attachEvent ) {
        // FIX: This is firing before the images are ready in the DOM in IE8,
        // Which is fine for screen res check, but not image size check.
        // doc.attachEvent("onreadystatechange", readyCallback );
        // fallback
        win.attachEvent( "onload", domLoadedCallback );
    }
})(this);