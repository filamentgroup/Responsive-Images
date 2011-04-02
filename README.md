# Responsive Images
### Mobile-First Images that Scale Responsively & Responsibly

#### What is this?
The goal of this technique is to deliver optimized, contextual image sizes in [responsive web designs](http://www.alistapart.com/articles/responsive-web-design/) that utilize dramatically different image sizes at different resolutions. The approach enables developers to start with mobile-optimized image references in their HTML that automatically loads a full-size image on larger screen resolutions -- without requesting both image sizes, and without UA sniffing.

#### Live Demo (check resources to see):

http://filamentgroup.com/examples/responsive-images-2/demo.html

Note: to view the small version of the image on a large screen, you can open it without the "r." in the filename, or disable cookies and JavaScript and refresh.

### Notes on this version & hat tip
There are two versions of Responsive Images. The first does not require cookies, but it does not work in as many browsers as this cookie-based approach either, so we're evaluating which to use based on project needs & limitations.

The cookie-driven approach that this branch is using was conceived by [Keith Clark](http://twitter.com/#!/keithclarkcouk/status/53807492957880320). This approach allows us to cut several workarounds out of our initial technique.

### Non-cookie-based version
For the non-cookie based approach:
- Article: http://filamentgroup.com/lab/responsive_images_experimenting_with_context_aware_image_sizing/
- Source Code: https://github.com/filamentgroup/Responsive-Images


### Instructions 
##### * Note: you'll need an apache web server for the redirect approach provided.

1. Add the ".htaccess"" file* and "rwd-images" folder into your root directory 
	(*if you already have an .htaccess file, you can paste its contents into your existing file)

2. Reference "rwd-images.min.js" from your HTML (1.7kb minified, negligible when gzipped):

	<script src="rwd-images/rwd-images.min.js"></script>
	
3. Add an ".r" prefix to all responsive images' file extensions in their src attribute ("small.jpg" becomes "small.r.jpg").

	&lt;img src="filename.r.jpg"&gt;
	
Note: the actual image file does not need the ".r" in its filename. The .htaccess will remove this when requesting the actual file.	

4. Save the full size version of filename.jpg with a ".large" in the filename, before the extension (ie. filename.large.jpg)	

### Demo:
See demo.html for implementation, or view it live: http://filamentgroup.com/examples/responsive-images-2/demo.html


#### How's it work?
As soon as rwd-images.js loads, it checks the device or computer's screen width and sets a cookie for whether that size is considered small or large (480px is the breakpoint for this decision).

The server then uses .htaccess to detect if that cookie is set to "large", and if so, redirect responsive images to their full size counterpart immediately.

### Supported Browsers 
All browsers will receive a usable image, and responsive image upgrades will work in any browser with cookies and Javascript enabled.


### Non-Javascript Browsers
Non-javascript enabled/supporting browsers/devices will receive the image referenced in the image src attribute (minus the ".r" of course)



## Alternate Approach
If your image filenames are not predictable enough to use the ".large" naming convention, you can use this second approach, using data-fullsrc attribute to specify your larger filename.

To use this approach, you'll need to take 2 steps in addition to the steps above:
1. Open the .htaccess file; comment out the RewriteRule for approach A, and uncomment the RewriteRule for approach B.

2. Set the JavaScript configuration option immediateRedirect to false by adding the following script tag to your HTML (before your reference to rwd-images.js):

    <script>
      //set immediateRedirect to false, use data- attribute instead
      var rwd_images = { 
        immediateRedirect: false
      };
    </script> 
	
Approach B is slightly sub-optimal for two reasons: older browsers like Firefox 3.6 and IE 6/7 will download both image sizes, and the approach incorporates a temporary request to a 1px gif until redirecting to the larger image (however, this is much better than requesting the small image and never using it)

#### Approach B Demo: http://filamentgroup.com/examples/responsive-images-2-demo-data/demo-data.html

#### How's Approach B work?
If the device or computer's screen width is greater than 480px, As soon as rwd-images.js loads it inserts a BASE element into the head of your page, directing all subsequent image, script, and stylesheet requests through a fictitious directory called "/rwd-router/". As these requests reach the server, the .htaccess file determines whether the request is a responsive image or not (does it have a ".r.png", ".r.jpg" extension?). It redirects responsive image requests to rwd.gif (a transparent 1px gif image), while all non-responsive-image requests go to their proper destination through a URL rewrite that ignores the "/rwd-router/" segment. When the HTML finishes loading, the script removes the BASE element from the DOM (resetting the base URL) and sets the image sources to either their larger size.

### Approach B Supported Browsers:
Safari (desktop, iPhone, iPad), Chrome, Internet Explorer (8+), Opera. Firefox 4

### Approach B Support Caveats: 
Firefox 3.6-, IE 6/7, etc
##### Note: 
Unsupported browsers still receive responsive images; the drawback is that both image sizes are requested, so there's additional overhead on the initial request on the desktop. That aside, subsequent page visits can make use of a cookie that is set in all browsers to serve the appropriate size from the start.

### Optional Configuration and Optimizations:

2 options are available for external configuration: widthBreakPoint and immediateRedirect (noted above). You can set these within a global "rwd_images" object that must be defined before rwd-images.js is loaded.

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
Regardless of approach A or B, a cookie is set by the script. For great optimization, you could use the presence of this cookie to choose not to load rwd-images.js at all, as long as you're using Approach A.

The cookie looks like this (where 1440 is the screen resolution):

    rwdimgsize=large

For a device with a screen smaller than 480px, the cookie would be this:

    rwdimgsize=small

#### License & Disclaimer
 - MIT License
 - Copyright 2011, Scott Jehl & Filament Group, Inc
 - Please fork and contribute!

