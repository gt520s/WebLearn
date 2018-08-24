/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-07-02 12:10:05
 * @version $Id$
 */

(function ($) {
	$.fn.extend({
		'bold': function(){
			return this.css({fontWeight: 'bold'})
		}
	})
})(jQuery);