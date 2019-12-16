
Paperli = window.Paperli || {};

// add required functions and initialization
Paperli.Loader = function(){

	var distUrl = ('https:' == document.location.protocol ? 'https://s3.amazonaws.com/widgets.paper.li' : 'http://widgets.paper.li');
	
	var stylesheetUrls = [
		'//fonts.googleapis.com/css?family=Yanone+Kaffeesatz:200,300,400,700', 
		distUrl + '/stylesheets/widget.css'
	];
	
	var scriptUrls = [
		distUrl + '/javascripts/jquery-1.4.2.min.js',
		distUrl + '/javascripts/jquery-ui-1.8.2.custom.min.js',
		distUrl + '/javascripts/jquery.timers.min.js',
		distUrl + '/javascripts/sr.widget.min.js',
		distUrl + '/javascripts/jquery.noconflict.min.js'
	];

    function createElement(e, attrs) {
        var el = document.createElement(e);
        for (var k in attrs) {
            if (k == "text") {
                el.appendChild(document.createTextNode(attrs[k]));
            }
            else if (k == "html") {
                el.innerHTML = attrs[k];
            }
            else {
                setAttribute(el, k, attrs[k]);
            }
        }
        return el;
    };
    
    function setAttribute(e, k, v) {
        if (k == "class") {
            e.setAttribute("className", v); // set both "class" and "className"
        }
        if (k == "style") {
            e.style.cssText = v; // set cssText for IE
        }
        
        return e.setAttribute(k, v);
    };

    function loadScript(_src) {
        var e = createElement('script', {
            'language': 'javascript', 
            'type': 'text/javascript',
            'src': _src
        });
        try {
            document.getElementsByTagName('head')[0].appendChild(e);
        } 
        catch (z) {
            document.body.appendChild(e);
        }
    };

    function loadCss(_src) {
        var e = createElement('link', {
            'type': 'text/css', 
            'rel': 'stylesheet',
            'media': 'screen',
            'href': _src
        });
        try {
            document.getElementsByTagName('head')[0].appendChild(e);
        } 
        catch (z) {
            document.body.appendChild(e);
        }
    };
	
	function writeScript(src) {
		document.writeln('<scri'+'pt src="' + src +'" type="text/javascript"></sc' + 'ript>')		
	}
	
	return {
		css: function() {
			for (i = 0; i < stylesheetUrls.length; i++) {
				loadCss(stylesheetUrls[i]);
			}
		},
		
		scripts: function() {
			for (i = 0; i < scriptUrls.length; i++) {
				writeScript(scriptUrls[i]);
			}
		}
	}
}();

Paperli.Loader.css();
Paperli.Loader.scripts();

