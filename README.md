# Note: Project no longer recommended!

We recommend you use picturefill instead. https://github.com/scottjehl/picturefill


















# Old Readme, kept for historic purposes:

## Responsive Images
### An Experiment with Mobile-First Images that Scale Responsively & Responsibly





#### What is this?
The goal of this technique is to deliver optimized, contextual image sizes in [responsive layouts](http://www.alistapart.com/articles/responsive-web-design/) that utilize dramatically different image sizes at different resolutions. Ideally, this could enable developers to start with mobile-optimized images in their HTML and specify a larger size to be used for users with larger screen resolutions -- without requesting both image sizes, and without UA sniffing.


### Instructions 
##### * Note: you'll need an apache web server for this to work.

1. Add the ".htaccess"" file* to your web server public rootfile's head (OR if you already have an .htaccess file, you can paste its contents into your existing file)

2. Grab "responsiveimgs.min.js" and reference it from your HTML in the HEAD of your document:

	<script src="rwd-images/rwd-images.min.js"></script>
	
3. For any img elements that offer a larger desktop-friendly size, reference the larger image's src via a ?full= query string on the image url. Note that the path after ?full= should be written so it works directly as the src attribute as well (in other words, include the same path info you need for the small version)

	&lt;img src="small.jpg?full=large.jpg" &gt;	
	

#### How's it work?
As soon as rwd-images.js loads, it tests the screen width, and if it's large, it inserts a BASE element into the head of your page, directing all subsequent image, script, and stylesheet requests through a fictitious directory called "/rwd-router/". As these requests reach the server, the .htaccess file determines whether the request is a responsive image or not (does it have a ?full query parameter?). It redirects responsive image requests immediately to their full size, while all non-responsive-image requests go to their proper destination through a URL rewrite that ignores the "/rwd-router/" segment. 

### Supported Browsers 
Safari (desktop, iPhone, iPad), Chrome, Internet Explorer (8+), Opera. Firefox 4

### Support Caveats: 
Firefox 3.6-, IE 6/7, etc
##### Note: 
Unsupported browsers still receive responsive images; the drawback is that both image sizes are requested, so there's additional overhead on the initial request on the desktop. That aside, subsequent page visits can make use of a cookie that is set in all browsers to serve the appropriate size from the start.

### Non-Javascript Browsers
Non-javascript enabled/supporting browsers/devices will receive the initial image referenced in the image src attribute (the mobile version)

### Optional Configuration and Optimizations:

1 option is available for external configuration: widthBreakPoint. You can set it within a global "rwd_images" object that must be defined before rwd-images.js is loaded.

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
