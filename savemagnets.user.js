// ==UserScript==
// @name          Save Magnets
// @author        Jeremie Jarosh
// @namespace     https://github.com/triple-j
// @description   Save Magnet links as text files.
// @version       1.3
// @include       *
// ==/UserScript==

var links = document.querySelectorAll('a[href^="magnet:"]');

for ( var i=0; i < links.length; i++ ) {
	links[i].addEventListener('click', function(evt){
		evt.preventDefault();
		
		var magnetText = this.getAttribute('href'),
			fileNameToSaveAs = (this.textContent.trim() || "download") + " - "
				+ document.querySelector('title').textContent + ".magnet",
			textFileAsBlob = new Blob([magnetText], {type: "text/plain"}),
			downloadLink = document.createElement("a");
		
		downloadLink.download = fileNameToSaveAs;
		downloadLink.innerHTML = "Download Magnet File";
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = function(event) { document.body.removeChild(event.target); };
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
		
		downloadLink.click();
	});
}
