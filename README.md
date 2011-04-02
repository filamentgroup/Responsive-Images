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
	
3. Add a data-fullsrc attribute to any img elements that offer a larger desktop-friendly size AND ALSO add an ".r" prefix to those images' file extensions in the src attribute ("small.jpg" becomes "small.r.jpg").

	&lt;img src="small.r.jpg" data-fullsrc="large.jpg"&gt;
	
Note: the actual image file does not need the ".r" in its filename. The .htaccess will remove this when requesting the actual file.	
	

#### How's it work?
As soon as rwd-images.js loads, it inserts a BASE element into the head of your page, directing all subsequent image, script, and stylesheet requests through a fictitious directory called "/rwd-router/". As these requests reach the server, the .htaccess file determines whether the request is a responsive image or not (does it have a ".r.png", ".r.jpg" extension?). It redirects responsive image requests to rwd.gif (a transparent 1px gif image), while all non-responsive-image requests go to their proper destination through a URL rewrite that ignores the "/rwd-router/" segment. When the HTML finishes loading, the script removes the BASE element from the DOM (resetting the base URL) and sets the image sources to either their small or large size (when specified), depending on whether the screen resolution is greater than 480px.

### Supported Browsers 
Safari (desktop, iPhone, iPad), Chrome, Internet Explorer (8+), Opera. Firefox 4

### Support Caveats: 
Firefox 3.6-, IE 6/7, etc
##### Note: 
Unsupported browsers still receive responsive images; the drawback is that both image sizes are requested, so there's additional overhead on the initial request on the desktop. That aside, subsequent page visits can make use of a cookie that is set in all browsers to serve the appropriate size from the start.

### Non-Javascript Browsers
Non-javascript enabled/supporting browsers/devices will currently receive the image referenced in the image src attribute (minus the ".r" of course)

### Optional Configuration and Optimizations:

1 option is available for external configuration: widthBreakPoint. You can set this within a global "rwd_images" object that must be defined before rwd-images.js is loaded.

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

#### Server-side Optimizations
A cookie is set by the script so that on subsequent page loads you can set your images an appropriate source from the start and 
choose not to load the script at all. 

The cookie looks like this (where 1440 is the screen resolution):
"rwd-resolution=1440"

#### License & Disclaimer
 - Dual licensed under the MIT or GPL Version 2 licenses. 
 - Copyright 2010, Scott Jehl & Filament Group, Inc
 - This project is experimental. Please fork and contribute!