(function ( $ ) {

	$.fn.myNearestColour = function( options ) {

		var settings = $.extend({
			//default values
			paletteLength: 7,
			colours: ['#FF0000','#0000FF','#008000','#FFFF00']
		}, options);

		return this.each(function(index) {

			imgColors = [];
		    nearestImgColors = [];
		    var nearest = nearestColor.from(settings.colours);


			var $myImage = $(this);
			var colorThief = new ColorThief();

			//Grabs selected swatch color palette from image and sets quality to 5 (0 =slow, 10=default/fast)
			var cp = colorThief.getPalette($myImage[0], settings.paletteLength, 5);

			for (var i = 0; i < cp.length; i++) {
				var hexColor = rgbToHex(cp[i][0], cp[i][1], cp[i][2]);
				imgColors.push(hexColor);
			}

			for(var j = 0; j < imgColors.length; j++) {
				var theNearestColor = nearest(imgColors[j]);
				nearestImgColors.push(theNearestColor);
			}

			var frequency = {};  // array of frequency.
			var max = 0;  // holds the max frequency.
			var result;   // holds the max frequency element.
			for(var v in nearestImgColors) {
			    frequency[nearestImgColors[v]]=(frequency[nearestImgColors[v]] || 0)+1; // increment frequency.
			    if(frequency[nearestImgColors[v]] > max) { // is this frequency > max so far ?
			            max = frequency[nearestImgColors[v]];  // update max.
			            result = nearestImgColors[v];          // update result.
			    }
			}
		    
		    if($.isFunction(settings.getPalette)) {
		        settings.getPalette.call( this, imgColors );
		    }

		    if($.isFunction(settings.getNearestPalette)) {
		    	settings.getNearestPalette.call( this, nearestImgColors );
		    }

		    //getNearestColour
		    if($.isFunction(settings.getNearestColour)) {
		    	settings.getNearestColour.call( this, result );
		    }

		    imgColors = [];
		    nearestImgColors = [];


		    function componentToHex(c) {
		        var hex = c.toString(16);
		        return hex.length == 1 ? "0" + hex : hex;
		    }

		    function rgbToHex(r, g, b) {
		        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
		    }

		});

	};

}( jQuery ));