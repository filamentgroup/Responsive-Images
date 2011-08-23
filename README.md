## Responsive Images
### An Experiment with Content Aware Images that Scale Responsively

#### What is this?
The goal of this technique is to deliver optimized, contextual image sizes in [responsive layouts](http://www.alistapart.com/articles/responsive-web-design/) that utilize different image sizes depending on what size the image is going to be rendered at in the browser in a responsive layout.

This builds on <a href="https://github.com/filamentgroup/Responsive-Images/">work by Scott Jehl</a>.

### Instructions 
##### * Note: you'll need an apache web server for this to work.

1. Add the ".htaccess"" file* and "rwd-images" folder into your root directory 
	(*if you already have an .htaccess file, you can paste its contents into your existing file)

2. Reference "rwd-images.js" from your HTML:

	<script src="rwd-images/rwd-images.js"></script>
	
3. You determine which images you want to behave responsively in one of two ways:

a) Add a query string to the image URL which references the location of the larger image on the server.
	
	<img src="/small.jpg?r=/large.jpg" width="120" />

b) Add a ?r to the image URL, and then set a translateUrl function in the configuration.
	
	<img src="/small.jpg?r" width="120" />
	
	<script>
		var rwd_options = {
			translateUrl: function(url) {
				return url.replace(/\.(jpe?g|png|gif)$$/, function(str, p1) {
					return "@2x." + p1;
				})
			}
		};
	</script>
	
Make sure you add a `width` attribute to the image which matches the real width of the image in pixels.


### Browser support
To support IE 6/7, you must also include a `data-width` attribute the value of which should match the `width` attribute. If you do not so this, these browsers will receive the low src image.

### Non-Javascript Browsers
Non-javascript enabled/supporting browsers/devices will receive the low src image.