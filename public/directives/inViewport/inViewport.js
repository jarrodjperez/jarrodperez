myApp.directive('inViewport', function() {
	return {
		restrict: 'A',
		link: function(scope, elem, attrs) {
			var animation = attrs.animation || '';
			var viewport = $(window);

			var setVisible = function (e) {
	            var viewportTop = viewport.scrollTop(),
	                viewportBottom = viewport.scrollTop() + viewport.height();
	            
                var element = $(elem),
                    top = element.offset().top,
                    bottom = top + element.height(),
                    topOnScreen = top >= viewportTop && top <= viewportBottom,
                    bottomOnScreen = bottom >= viewportTop && bottom <= viewportBottom,
                    elemVisible = topOnScreen; //|| bottomOnScreen;
                
                    if(elemVisible) {
                		element.addClass('animated ' + animation);	
                	} 
                	//else {
                	// 	element.removeClass('animated ' + animation);
                	// }
	        };

	        viewport.scroll(setVisible);
	        setVisible();
		}
	}
});