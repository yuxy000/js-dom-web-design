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
	
	var xpos = parseInt(element.style.left);
	var ypos = parseInt(element.style.top);

	if(xpos == finalX && ypos == finalY) {
		return true;
	}
	if(xpos < finalX) {
		xpos ++;
	}
	if(xpos > finalX) {
		xpos --;
	}
	
	if(ypos < finalY) {
		ypos ++;
	}
	if(ypos > finalY) {
		ypos --;
	}
	
	element.style.left = xpos + "px";
	element.style.top = ypos + "px";
	
	var repeat = "moveElement('" + elementID + "',"  + finalX + "," + finalY + "," + interval + ")";
	element.movement = setTimeout(repeat, interval);
}
