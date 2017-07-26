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

function moveElement(elementID, finalX, finalY, interval) {
	if(!document.getElementById) {
		return false;
	}
	var element = document.getElementById(elementID);
	if(!element) {
		return false;
	}
	
	if(element.movement) {
		clearTimeout(element.movement);
	}
	
	if(!element.style.left) {
		element.style.left = "0px";
	}
	if(!element.style.top) {
		element.style.top = "0px";
	}
	
	var xpos = parseInt(element.style.left);
	var ypos = parseInt(element.style.top);
	var dist = 0;

	if(xpos == finalX && ypos == finalY) {
		return true;
	}
//	if(xpos < finalX) {
//		dist = Math.ceil((finalX - xpos) / 10)
//		xpos  = xpos + dist;
//	}
//	if(xpos > finalX) {
//		dist = Math.ceil((xpos - finalX) / 10)
//		xpos  = xpos - dist;
//	}
//	
//	if(ypos < finalY) {
//		dist = Math.ceil((finalY - ypos) / 10);
//		ypos  = ypos + dist;
//	}
//	if(ypos > finalY) {
//		dist = Math.ceil((ypos - finalY) / 10);
//		ypos  = ypos - dist;
//	}
	
	
	dist = Math.ceil((finalX - xpos) / 10)
	xpos  = xpos + dist;

	dist = Math.ceil((finalY - ypos) / 10);
	ypos  = ypos + dist;
	element.style.left = xpos + "px";
	element.style.top = ypos + "px";
	
	var repeat = "moveElement('" + elementID + "',"  + finalX + "," + finalY + "," + interval + ")";
	element.movement = setTimeout(repeat, interval);
}

function prepareSlideshow() {
	if (!document.getElementsByTagName) {
		return false;
	}
	if (!document.getElementById) {
		return false;
	}
	
	var intro = document.getElementById("intro");
	if(!intro) {
		return false;
	}

	var slideshow = document.createElement("div");
	slideshow.setAttribute("id", "slideshow");
	
	var frame = document.createElement("img");
	frame.setAttribute("src", "./images/frame.gif");
	frame.setAttribute("alt", "");
	frame.setAttribute("id", "frame");
	slideshow.appendChild(frame);
	
	var preview = document.createElement("img");
	preview.setAttribute("src", "./images/slideshow.gif");
	preview.setAttribute("alt", "a glimpse of what awaits you");
	preview.setAttribute("id", "preview");
	slideshow.appendChild(preview);
	
	
	insertAfter(slideshow, intro);
	
	var links = document.getElementsByTagName("a");
	var destination;
	for (var i = 0; i < links.length; i++) {
		links[i].onmouseover = function() {
			destination = this.getAttribute("href");
			if(destination.indexOf("index.html") != -1) {
				moveElement("preview", 0, 0, 5);
			}
			if(destination.indexOf("about.html") != -1) {
				moveElement("preview", -150, 0, 5);
			}
			if(destination.indexOf("photos.html") != -1) {
				moveElement("preview", -300, 0, 5);
			}
			if(destination.indexOf("live.html") != -1) {
				moveElement("preview", -450, 0, 5);
			}
			if(destination.indexOf("contact.html") != -1) {
				moveElement("preview", -600, 0, 5);
			}
		}
	}
}

addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
