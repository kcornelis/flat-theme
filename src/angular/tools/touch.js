(function(){
	'use strict';
	
	var $html = $('html'), $win = $(window);

	$.support.touch                 = (
		('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
		(window.DocumentTouch && document instanceof window.DocumentTouch)  ||
		(window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 0) || //IE 10
		(window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 0) || //IE >=11
		false
	);

	$html.addClass($.support.touch ? 'touch' : 'no-touch');

})();
