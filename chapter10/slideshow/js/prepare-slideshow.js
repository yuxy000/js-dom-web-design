function prepareSlideshow() {
	if (!document.getElementsByTagName) {
		return false;
	}
	if (!document.getElementById) {
		return false;
	}
	
	var linklist = document.getElementById("linklist");
	var preview = document.getElementById("preview");
	if(!linklist) {
		return false;
	}
	if(!preview) {
		return false;
	}
	
	preview.style.position = "absolute";
	preview.style.left = "0px";
	preview.style.top = "0px";
	
	var links = linklist.getElementsByTagName("a");
	links[0].onmouseover = function () {
		moveElement("preview", -100, 0, 10);
	};
	links[1].onmouseover = function () {
		moveElement("preview", -200, 0, 10);
	};
	links[2].onmouseover = function () {
		moveElement("preview", -300, 0, 10);
	};	
}

addLoadEvent(prepareSlideshow);
