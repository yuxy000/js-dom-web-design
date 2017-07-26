function insertAfter(newElement, targetElment) {
	var parent = targetElment.parentNode;
	if(parent.lastChild == targetElment) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElment.nextSibling);
	}
}