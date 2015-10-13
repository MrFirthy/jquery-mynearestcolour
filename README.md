My Nearest Colour
=================

A jQuery plugin to find which colour in an array is nearest to the dominant colour of an image

---  
  
## Options

**paletteLength [integer]** - _default:_ **_7_**  
Specifies the amount of colours retrieved from your target image (**Min**: 1, **Max**: 7). _Note: The greater the number, the more accurate finding your nearest colour will be_  
  
**colours [array]** - _default:_ **_['#FF0000','#0000FF','#008000','#FFFF00'] - (Red, Blue, Green, Yellow)_**  
The array of hex colours you would like to compare to the image colours to find the nearest. The more colours your provide the more accurate it will be.  

**getPalette [function]** - _default:_ **N/A**  
A function that provides you with an array of the dominant hex codes found in your target image as the `data` parameter (example below).  

**getNearestPalette [function]** - _default:_ **N/A** 
A function that provides you with an array of the nearest colour from your array to each of the hex codes retrieved from the image. This is passed as the `data` parameter in a function (example below).  

**getNearestColour [function]** - _default:_ **N/A**  
A function that provides you with the hex code of the nearest colour from your array to your target image. This is passed as the `data` parameter in a function (example below).  

---

## Dependencies  

This plugin has two dependencies:  
* [color-thief](https://github.com/lokesh/color-thief/)  
* [nearest-color](https://github.com/dtao/nearest-color)

---  

## Setup  

1. Include jQuery followed by `myNearestColour.js` and it's dependencies just before the end of the body tag  
```html
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script src="https://raw.githubusercontent.com/lokesh/color-thief/master/dist/color-thief.min.js"></script>
<script src="https://raw.githubusercontent.com/dtao/nearest-color/master/nearestColor.js"></script>
<script src="jquery.myNearestColour.min.js"></script>
```   
2. Initialise the plugin below the included scripts  
```javascript
<script>
	$(window).load(function() {
        $('img').myNearestColour({
            paletteLength: 7,
            colours: ['#e62b27','#2b3b90','#0a8b37','#d9006c']
        });  
    });
</script>
```  
Or using the methods:  
```javascript
<script>
	$(window).load(function() {
        $('img').myNearestColour({
            paletteLength: 7,
            colours: ['#e62b27','#2b3b90','#0a8b37','#d9006c'],
            getPalette: function(data) {
            	// Will log full array inthe console
                console.log(data);
            },
            getNearestPalette: function(data) {
            	// Will log out each individual colour in the console
                for (var i = 0; i < data.length; i++) {
                    console.log('colour: ' + data[i]);
                }
            },
            getNearestColour: function(data) {
            	// Add the resulting colour to the body 
                $('body').append('<p>Nearest colour: ' + data + '</p>');
            }
        });  
    });
</script>
```  

---  

## Local issues  
There is a known issue in Google Chrome when developing locally. Chrome does not consider different local files to be sourced from the same domain. That is, each local file you reference via a `file://` URL is treated as if it comes from a unique domain separate from that of other `file://` URLs. That they're in the same directory makes no difference.  

In terms of solutions, you can:  
* Develop locally in Firefox or Safari  
* Develop using a local server i.e. MAMP, BrowserSync etc.  
* You can start Chrome through the command line with an option ("--allow-file-access-from-files") that tells it to treat local files as all being from a common domain.

---  

## Demo  
Coming soon.

---  

## Questions  

If you find anything wrong with the plugin, have issues getting it working, or think of something cool it could do, feel free to submit an issue.
