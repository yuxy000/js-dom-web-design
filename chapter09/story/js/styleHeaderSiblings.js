function styleHeaderSiblings(tag, theClass) {
	if(!document.getElementsByTagName) {
		return false;
	}
	
	var headers = document.getElementsByTagName(tag);
	
	var element;
	for (var i = 0; i < headers.length; i++) {
		element = getNextElement(headers[i].nextSibling);
//		element.style.fontWeight = 'bold';
//		element.style.fontSize = '1.2em';
//		element.style.color = 'red';
		addClass(element, theClass);
	}
}

function getNextElement(node) {
	if(node.nodeType == 1) {
		return node;
	}
	
	if(node.nextSibling) {
		return getNextElement(node.nextSibling);
	}
	
	return null;
}

function addClass(element, value) {
	if(!element.className) {
		element.className = value;
	} else {
		var newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
}

addLoadEvent(function () {
	styleHeaderSiblings("h1", "intro");
});
