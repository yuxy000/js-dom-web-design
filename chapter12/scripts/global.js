function addLoadEvent(func) {
	var oldOnload = window.onload;
	if(typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function () {
			oldOnload();
			func();
		}
	}
}

function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

function addClass(element, value) {
	if(!element.className) {
		element.className = value;
	} else {
		var tempClassName = element.className;
		tempClassName += " ";
		tempClassName += value;
		element.className = tempClassName;
	}
}

function highlightPage() {
	if(!document.getElementsByTagName) {
		return false;
	}
	if(!document.getElementById) {
		return false;
	}
	
	var headers = document.getElementsByTagName("header");
	if (headers.length == 0) {
		return false;
	}
	var navs = document.getElementsByTagName("nav");
	if(navs.length == 0) {
		return false;
	}
	
	var links = navs[0].getElementsByTagName("a");
	var linkUrl;
	for (var i = 0; i < links.length; i++) {
		linkUrl = links[i].getAttribute("href");
		if(location.href.indexOf(linkUrl) != -1) {
			links[i].className = "here";
			var linkText = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id", linkText);
		}
	}
}

addLoadEvent(highlightPage);
