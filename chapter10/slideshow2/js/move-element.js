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
