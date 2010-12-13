## Responsive Images
### An Experiment with Mobile-First Images that Scale Responsively & Responsibly

#### What is this?
The goal of this technique is to deliver optimized, contextual image sizes in [responsive layouts](http://www.alistapart.com/articles/responsive-web-design/) that utilize dramatically different image sizes at different resolutions. Ideally, this could enable developers to start with mobile-optimized images in their HTML and specify a larger size to be used for users with larger screen resolutions -- without requesting both image sizes, and without UA sniffing.

### Instructions 
##### * Note: you'll need an apache web server for this to work.

1. Add the ".htaccess"" file* and "rwd-images" folder into your root directory 
	(*if you already have an .htaccess file, you can paste its contents into your existing file)

2. Reference "rwd-images.min.js" from your HTML (1.7kb minified, negligible when gzipped):

	<script src="rwd-images/rwd-images.min.js"></script>
	
3. Add data-fullsrc attributes to any img elements that offer a larger desktop-friendly size:

	<img src="small.jpg" data-fullsrc="large.jpg">
	

#### How's it work?
As soon as rwd-images.js loads, it inserts a BASE element into the head of your page, directing all subsequent image, script, and stylesheet requests through a fictitious directory called "/rwd-image-trap/". As these requests reach the server, the .htaccess file determines whether the request is an image or not. It redirects image requests to rwd.gif (a transparent 1px gif image), while all non-image requests go to their proper destination through a URL rewrite that ignores the "/rwd-image-trap/" segment. When the HTML finishes loading, the script removes the BASE element from the DOM (resetting the base URL) and sets the image sources to either their small or large size (when specified), depending on whether the screen resolution is greater than 480px.

### Supported Browsers 
Safari (desktop, iPhone, iPad), Chrome, Internet Explorer (8+), Opera

### Support Caveats: 
Firefox, IE 6/7, etc
##### Note: Unsupported browsers still receive responsive images; the drawback is that both image sizes are requested, so there's additional overhead on the initial request on the desktop. That aside, subsequent page visits can make use of a cookie that is set in all browsers to serve the appropriate size from the start.

### Non-Javascript Browsers
Non-javascript enabled/supporting browsers/devices will currently receive the image referenced in the image src attribute.

### Optional Configuration and Optimizations:

2 options are available for external configuration: widthBreakPoint and ClientSideOnly. You can set these within a global "rwd_images" object that must be defined before rwd-images.js is loaded.

	<script>
		//configure options here:
		var rwd_images = {};
	</script>

### Setting a different width breakpoint
If you'd like to use a different width breakpoint than the 480px default:

	<script>
		//configure options here:
		var rwd_images = {
			//set the width breakpoint to 600px instead of 480px
			widthBreakPoint: 600
		};
	</script>

#### Preventing all unnecessary image requests
If you are able to guarantee that your BODY element contains 
		no relative references to scripts, stylesheets (link elements), objects, 
		or anything else that makes an http request the moment they load (in other words, relative links (anchor elements) aren't a problem),
		then you can set the clientSideOnly argument to true, which will prevent all unnecessary requests from going out to the server. This is ideal, but difficult to support as a default.

	<script>
		//configure options here:
		var rwd_images = {
			//set clientSideOnly flag to true - preventing all unnecessary requests!
			ClientSideOnly: true
		};
	</script>

#### Server-side Optimizations
A cookie is set by the script so that on subsequent page loads you can set your images an appropriate source from the start and 
choose not to load the script at all. 

The cookie looks like this (where 1440 is the screen resolution):
"rwd-resolution=1440"

#### License & Disclaimer
 - Dual licensed under the MIT or GPL Version 2 licenses. 
 - Copyright 2010, Scott Jehl & Filament Group, Inc
 - This project is experimental. Please fork and contribute!