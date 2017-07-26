function getNewContent() {
	var request = getHttpObject();
	if(request) {
		request.open("GET", "data/example.txt", true);
		request.onreadystatechange = function () {
			if(request.readyState == 4) {
				var para = document.createElement("p");
				var txt = document.createTextNode(request.responseText);
				para.appendChild(txt);
				document.getElementById("new").appendChild(para);
			}
		};
		request.send(null);
	} else {
		alert("你的浏览器不支持XMLHttpRequest");
	}
}

addLoadEvent(getNewContent);
