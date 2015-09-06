// ==UserScript==
// @name          Save Magnets
// @author        Jeremie Jarosh
// @namespace     https://github.com/triple-j
// @description   Save Magnet links as text files.
// @version       1.2
// @include       *
// ==/UserScript==

// saveData from: http://jsfiddle.net/koldev/cw7w5/
var saveData = (function () {
	var a = document.createElement("a");
	document.body.appendChild(a);
	a.style = "display: none";
	return function (data, fileName, fileType) {
		var fileType = fileType || "text/plain",
			blob = new Blob([data], {type: fileType}),
			url = window.URL.createObjectURL(blob);
		a.href = url;
		a.download = fileName;
		a.click();
		window.URL.revokeObjectURL(url);
	};
}());

var links = document.querySelectorAll('a[href^="magnet:"]');

for ( var i=0; i < links.length; i++ ) {
	links[i].addEventListener('click', function(evt){
		evt.preventDefault();
		
		var magnetText = this.getAttribute('href'),
			filename = (this.textContent.trim() || "download") + ".magnet";
		
		saveData( magnetText, filename, "text/plain" );
	});
}
