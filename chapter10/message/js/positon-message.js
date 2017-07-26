function positionMessage() {
	if(!document.getElementById) {
		return false;
	}
	var para = document.getElementById("message");
	if(!para) {
		return false;
	}
	para.style.position = "absolute";
	para.style.left = "50px";
	para.style.top = "100px";
	
	moveElement("message", 125, 25, 50);
}

addLoadEvent(positionMessage);
