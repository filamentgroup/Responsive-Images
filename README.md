# Responsive Design Images
### Mobile-First Images that Scale Responsively & Responsibly

### What is this?
The goal of this technique is to deliver optimized, contextual image sizes in [responsive web designs](http://www.alistapart.com/articles/responsive-web-design/) that utilize dramatically different image sizes at different resolutions. The approach enables developers to start with mobile-optimized image references in their HTML that automatically loads a larger image on larger screen resolutions -- without requesting both image sizes, and without UA sniffing.

### [Live demo](http://filamentgroup.com/examples/responsive-images-new/demos/A-Default/demo.html):
See the demos folder for implementation, or [view it live](http://filamentgroup.com/examples/responsive-images-new/demos/A-Default/demo.html)

Note that since responsive images rely on screen size rather than window size, you'll need to try the demos on different devices to see its effect.

### Original Responsive Images Article:
_Note: the approach has changed slightly since this article was published. Follow this readme for current how-tos.
[http://filamentgroup.com/lab/responsive_images_experimenting_with_context_aware_image_sizing/](http://filamentgroup.com/lab/responsive_images_experimenting_with_context_aware_image_sizing/)

### Instructions 
_Note: you'll need an apache web server for the redirect approach provided._
 
1. Add the ".htaccess"" file* into your root directory (found in demos/A-Default/ folder)
	(*if you already have an .htaccess file, you can paste its contents into your existing file)

2. Reference "responsive-images.js" from your HTML:

    <script src="responsive-images.js"></script>
	
3. Reference any "responsive" images in the src attribute of your img tags. You should reference the mobile size first, and then the paths to medium and large sizes via query parameters, like so:

    <img src="_imgs/running.jpg?medium=_imgs_/running.medium.jpg&large=_imgs/running.large.jpg">	

That's it! A demo of this approach is in the demos/A-default/ folder, or [here on Filament's site](http://filamentgroup.com/examples/responsive-images-new/demos/A-Default/demo.html)

#### Minor cleaner variation
If your images all reside in the same directory, you can skip writing the entire paths to the medium and large references, just specifying the filename instead.
With this approach, the image path above looks like this instead:

    <img src="_imgs/running.jpg?medium=running.medium.jpg&large=running.large.jpg">

A demo of this approach is in the demos/B-same-image-paths/ folder, or [here on Filament's site](http://filamentgroup.com/examples/responsive-images-new/demos/B-same-image-paths/demo.html)

#### How's it work?
As soon as responsive-images.js loads, it checks the device or computer's screen width and sets a cookie for whether that size is considered small, medium or large (at 500, and 100px min-width breakpoints).

The server then uses .htaccess to detect if that cookie is set to "medium" or "large", and if so, redirect responsive images to their larger size counterpart immediately, depending on what's present in that image's query string.

### Hat Tip
Responsive Images has had several iterations before arriving at this current approach. Credit for the cookie-driven solution used in this technique goes to [Keith Clark](http://twitter.com/#!/keithclarkcouk/status/53807492957880320).

### Supported Browsers 
All browsers will receive a usable mobile-friendly image, and responsive image upgrades will work in any browser with cookies and Javascript enabled.

### Non-Javascript Browsers
Non-javascript or cookie enabled/supporting browsers/devices will receive the image referenced in the image src attribute before the query string.

### Optional Configuration and Optimizations:

Several configuration options are available in responsive images.
You can set options by including a script element BEFORE the reference to responsive images, which defines options in a variable called responsive_images. Values should be specified in object literal format, as shown below.

    <script>
        //configure options here:
        var responsive_images = {
            foo": "bar"
        };
    </script>
	
The following options are available for external configuration: 

- cookieName: The name of the cookie that is set by the script and detected on the server. Default: <code>"rwd-screensize"</code>,

- cookieValue: The value of the cookie that is set by the script and detected on the server. Default: <code>sw > 500 ?  ( sw > 1000 ? "large" : "medium" ) : "small"</code>

- cookieAge: The number of milliseconds the cookie should stay valid. Default: <code>30000</code>

- cookieDomain: The domain that the cookie may be retreived. Default: <code>location.host && location.host.match( /[^\.]+\.[^\.]+$/ )</code>. Note that this usally evaluates to something like "example.com"

- subdomainAccess: Allow access to the cookie on subdomains of the cookieDomain. Default: true when cookieDomain is a valid "example.com" format

- cookiePath: The path on the cookieDomain where the cookie is valid. Default: <code>"/"</code>

#### License & Disclaimer
 - MIT License
 - Copyright 2011, Scott Jehl & Filament Group, Inc
 - Please fork and contribute!

