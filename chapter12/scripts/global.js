function addLoadEvent(func) {
	var oldOnload = window.onload;
	if(typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
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
	if(headers.length == 0) {
		return false;
	}
	var navs = document.getElementsByTagName("nav");
	if(navs.length == 0) {
		return false;
	}

	var links = navs[0].getElementsByTagName("a");
	var linkUrl;
	for(var i = 0; i < links.length; i++) {
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
	xpos = xpos + dist;

	dist = Math.ceil((finalY - ypos) / 10);
	ypos = ypos + dist;
	element.style.left = xpos + "px";
	element.style.top = ypos + "px";

	var repeat = "moveElement('" + elementID + "'," + finalX + "," + finalY + "," + interval + ")";
	element.movement = setTimeout(repeat, interval);
}

function prepareSlideshow() {
	if(!document.getElementsByTagName) {
		return false;
	}
	if(!document.getElementById) {
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
	for(var i = 0; i < links.length; i++) {
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

function showSection(id) {
	var sections = document.getElementsByTagName("section");
	for(var i = 0; i < sections.length; i++) {
		if(sections[i].getAttribute("id") != id) {
			sections[i].style.display = "none";
		} else {
			sections[i].style.display = "block";
		}
	}
}

function prepareInternalNav() {
	if(!document.getElementsByTagName) {
		return false;
	}
	if(!document.getElementById) {
		return false;
	}

	var articles = document.getElementsByTagName("article");
	if(articles.length == 0) {
		return false;
	}
	var navs = articles[0].getElementsByTagName("nav");
	if(navs.length == 0) {
		return false;
	}
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	for(var i = 0; i < links.length; i++) {
		var sectionId = links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId)) {
			return false;
		}
		document.getElementById(sectionId).style.display = "none";
		links[i].destination = sectionId;

		links[i].onclick = function() {
			showSection(this.destination);
			return false;
		}
	}
}

function preparePlaceholder() {
	if(!document.getElementsByTagName) {
		return false;
	}
	if(!document.getElementById) {
		return false;
	}
	if(!document.createElement) {
		return false;
	}
	if(!document.createTextNode) {
		return false;
	}
	var gallery = document.getElementById("imageGallery");
	if(!gallery) {
		return false;
	}

	var placeholder = document.createElement("img");
	placeholder.setAttribute("id", "placeholder");
	placeholder.setAttribute("src", "images/placeholder.gif");
	placeholder.setAttribute("alt", "");

	var desc = document.createElement("p");
	desc.setAttribute("id", "desc");
	var descTxt = document.createTextNode("Choose an image");
	desc.appendChild(descTxt);

	insertAfter(desc, gallery);
	insertAfter(placeholder, desc);
}

function prepareGallery() {
	if(!document.getElementsByTagName) {
		return false;
	}
	if(!document.getElementById) {
		return false;
	}
	var gallery = document.getElementById("imageGallery");
	if(!gallery) {
		return false;
	}

	var links = gallery.getElementsByTagName("a");
	for(var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
			return showPic(this);
		}
	}
}

function showPic(whichPic) {
	if(!document.getElementById) {
		return true;
	}
	var source = whichPic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src", source);

	var desc = document.getElementById("desc");
	if(!desc) {
		return false;
	}

	if(whichPic.getAttribute("title")) {
		var text = whichPic.getAttribute("title");
	} else {
		var text = "";
	}

	if(desc.firstChild.nodeType == 3) {
		desc.firstChild.nodeValue = text;
	}

	return false;
}

/**
 * dom的方式给表格添加斑马线
 */
function stripeTables() {
	if(!document.getElementsByTagName) {
		return false;
	}
	var tables = document.getElementsByTagName("table");
	for(var i = 0; i < tables.length; i++) {
		var odd = false;
		var rows = tables[i].getElementsByTagName("tr");
		for(var j = 0; j < rows.length; j++) {
			if(odd) {
				addClass(rows[j], "odd");
				odd = false;
			} else {
				odd = true;
			}
		}
	}
}

/**
 * dom的方式给行添加高亮
 */
function highlightRow() {
	if(!document.getElementsByTagName) {
		return false;
	}
	var rows = document.getElementsByTagName("tr");
	for(var i = 0; i < rows.length; i++) {
		var oldChassName = rows[i].className;
		rows[i].onmouseover = function() {
			addClass(this, "highlight");
		}
		rows[i].onmouseout = function() {
			this.className = oldChassName;
		}
	}
}

function displayAbbreviations() {
	if(!document.getElementsByTagName ||
		!document.createElement ||
		!document.createTextNode) {
		return false;
	}

	var abbreviations = document.getElementsByTagName("abbr");
	if(abbreviations.length < 1) {
		return false;
	}
	var defs = new Array();
	for(var i = 0; i < abbreviations.length; i++) {
		var currentAbbr = abbreviations[i];
		if(currentAbbr.childNodes.length < 1) {
			continue;
		}
		var definition = currentAbbr.getAttribute("title");
		var key = currentAbbr.lastChild.nodeValue;
		defs[key] = definition;
	}

	var dlist = document.createElement("dl");
	for(key in defs) {
		var definition = defs[key];
		var dtitle = document.createElement("dt");
		var dtitleTxt = document.createTextNode(key);
		dtitle.appendChild(dtitleTxt);
		var ddesc = document.createElement("dd");
		var ddescTxt = document.createTextNode(definition);
		ddesc.appendChild(ddescTxt);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}

	if(dlist.childNodes.length < 1) {
		return false;
	}

	var header = document.createElement("h3");
	var headerTxt = document.createTextNode("Abbreviations");
	header.appendChild(headerTxt);
	var articles = document.getElementsByTagName("article");
	if(articles.length < 1) {
		return false;
	}
	var container = articles[0];
	container.appendChild(header);
	container.appendChild(dlist);
}

/**
 * 点击label使相应的input获取焦点
 */
function focusLabels() {
	if(!document.getElementsByTagName || !document.getElementById) {
		return false;
	}

	var labels = document.getElementsByTagName("label");
	for(var i = 0; i < labels.length; i++) {
		if(!labels[i].getAttribute("for")) {
			continue;
		}
		labels[i].onclick = function() {
			var id = this.getAttribute("for");
			if(!document.getElementById(id)) {
				return false;
			}
			var element = document.getElementById(id);
			element.focus();
		}

	}
}

function prepareForms() {
	for(var i = 0; i < document.forms.length; i++) {
		var thisForm = document.forms[i];
		resetFields(thisForm);
		thisForm.onsubmit = function() {
			if(!validateForm(this)) {
				return false;
			}
			var article = document.getElementsByTagName("article")[0];
			if(submitFormWithAjax(this, article)) {
				return false;
			}

			return true;
		}
	}
}

/**
 * 添加placeholder 解决老浏览器不支持placeholder的问题
 */
function resetFields(whichForm) {
	if(Modernizr.input.placeholder) {
		return;
	}

	for(var i = 0; i < whichForm.elements.length; i++) {
		var element = whichForm.elements[i];
		if(element.type == "submit") {
			continue;
		}
		var check = element.placeholder || element.getAttribute("placeholder");
		if(!check) {
			continue;
		}
		element.onfocus = function() {
			var text = this.placeholder || this.getAttribute("placeholder");
			if(this.value == text) {
				this.className = "";
				this.value = "";
			}
		};
		element.onblur = function() {
			if(this.value == "") {
				this.className = "placeholder";
				this.value = this.placeholder || this.getAttribute("placeholder");
			}
		};
		element.onblur();
	}
}

/**
 * 验证form
 * 
 * @param {Object} whichForm
 */
function validateForm(whichForm) {
	for(var i = 0; i < whichForm.elements.length; i++) {
		var element = whichForm[i];
		if(element.required) {
			if(!isFilled(element)) {
				alert("Please fill in the " + element.name + " field.");
				return false;
			}
		}
		if(element.type == "email") {
			if(!isEmail(element)) {
				alert("The " + element.name + " field must be a valid email address.");
				return false;
			}
		}
	}
	return true;
}

function isFilled(element) {
	if(element.value.trim().length == 0) {
		return false;
	}
	var placeholder = element.placeholder || element.getAttribute("placeholder");
	return element.value != placeholder;
}

function isEmail(element) {
	return(element.value.indexOf("@") != -1 && element.value.indexOf(".") != -1);
}

function getHttpObject() {
	if(typeof XMLHttpRequest == 'undefined') {
		XMLHttpRequest = function() {
			try {
				return new ActiveCObject("Msxml2.XMLHTTP.6.0");
			} catch(e) {}
			try {
				return new ActiveCObject("Msxml2.XMLHTTP.3.0");
			} catch(e) {}
			try {
				return new ActiveCObject("Msxml2.XMLHTTP");
			} catch(e) {}
			return false;
		}
	}
	return new XMLHttpRequest();
}

function displayAjaxLoading(element) {
	while(element.hasChildNodes()) {
		element.removeChild(element.lastChild);
	}

	var content = document.createElement("img");
	content.setAttribute("src", "images/loading.gif");
	content.setAttribute("alt", "Loading...");
	element.appendChild(content);
};

function submitFormWithAjax(whichForm, theTarget) {
	var request = getHttpObject();
	if(!request) {
		return false;
	}

	displayAjaxLoading(theTarget);

	var dataParts = [];
	var element;
	for(var i = 0; i < whichForm.elements.length; i++) {
		element = whichForm.elements[i];
		dataParts[i] = element.name + "=" + encodeURIComponent(element.value);
	}
	var data = dataParts.join("&");

	request.open("POST", whichForm.getAttribute("action"), true);
	request.setRequestHeader("Content-type", "application/x-form-urlencoded");
	request.onreadystatechange = function() {
		if(request.status == 200 || request.status == 0) {
			var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
			if(matches.length > 0) {
				theTarget.innerHTML = matches[1];
			} else {
				theTarget.innerHTML = "<p>Oops, there was an error. Sorry.</p>";
			}
		} else {
			theTarget.innerHTML = "<p>" + request.responseText + "</p>";
		}
	};
	request.send(data);
	return true;
}

addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalNav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

addLoadEvent(stripeTables);
addLoadEvent(highlightRow);
addLoadEvent(displayAbbreviations);

addLoadEvent(prepareForms);