function addLoadEvent(func) {
	var oldOnload = window.onload;
	if(typeof window.onload !="function") {
		window.onload = func;
	} else {
		window.onload = function() {
			oldOnload();
			func();
		}
	}
}

function insertAfter(newElement, targetElment) {
	var parent = targetElment.parentNode;
	if(parent.lastChild == targetElment) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElment.nextSibling);
	}
}

/**
 * 新建显示图片的node和描述的node节点并添加列表后面
 */
function preparePlaceholder() {
	if(!document.createElement) {
		return false;
	}
	if(!document.createTextNode) {
		return false;
	}
	if(!document.getElementById) {
		return false;
	}
	var gallery = document.getElementById("imageGallery");
	if(!gallery){
		return false;
	}
	
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id", "placeholder");
	placeholder.setAttribute("title", "my image gallery.");
	placeholder.setAttribute("width", 400);
	placeholder.setAttribute("height", 300);
	var desc = document.createElement("p");
	desc.setAttribute("id", "desc");
	var descTxt = document.createTextNode("Choose an image");
	desc.appendChild(descTxt);
	
	insertAfter(placeholder, gallery);
	insertAfter(desc, placeholder);
}

/**
 * 获取各个列表项 添加click事件
 */
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
	
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
			//返回false阻止a标签的默认行为
			return showPic(this) ? false : true;
		}
	}
}

/**
 * 显示图片及描述
 * 
 * @param {Object} whichPic
 */
function showPic(whichPic){   
    var img = document.getElementById("placeholder");
    if(!img || img.nodeName != "IMG") {
    	return false;
    }
    var source = whichPic.getAttribute("href");
    img.setAttribute("src", source);
    
    var desc = document.getElementById("desc");
    if(desc) {
    	var text = whichPic.getAttribute("title") ? whichPic.getAttribute("title") : "";
    	if(desc.firstChild.nodeType == 3) {
    		desc.firstChild.nodeValue = text;
    	}
    }
    
    return true;
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

