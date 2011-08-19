/*! Responsive Images: Mobile-First images that scale responsively and responsibly. (c) Scott Jehl. MIT Lic. https://github.com/filamentgroup/Responsive-Images  */
(function( win ){
	
	// Get screen width
	var	sw = win.screen.width,
		
		doc = win.document,
		
		// Allow for up-front setting of defaults
		def = win.responsive_imgs || {},
		
		// Name of cookie
		cookieName = def.cookieName || "rwd-screensize",
		
		// Cookie value
		cookieValue = def.cookieValue || sw > 500 ?  ( sw > 1000 ? "large" : "medium" ) : "small",
		
		// Cookie expiration time
		cookieAge = def.cookieAge || 30000,
		
		// Domain that cookie will affect
		cookieDomain = def.cookieDomain || location.host && location.host.match( /[^\.]+\.[^\.]+$/ ),
		
		// Allow access to cookie on subdomains
		subdomainAccess = def.subdomainAccess || false,
		
		// Reset cookieDomain with subDomain access, if true
		cookieDomain = subdomainAccess ? "." + cookieDomain : cookieDomain,
		
		// Path for cookies on domain
 		cookiePath = def.cookiePath || "/",
		
		//record width cookie for subsequent loads
		recordRes = (function(){
			var date = new Date();
		    date.setTime( date.getTime() + cookieAge );
		    doc.cookie = cookieName + "=" + cookieValue + ";" +
				"expires=" + date.toGMTString() + ";" +
				"path=" + cookiePath + ";" +
				( cookieDomain ? "domain=" + cookieDomain : "");
		})();
})(this);