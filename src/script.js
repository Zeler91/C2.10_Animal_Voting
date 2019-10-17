let animalForm = document.getElementById('animal-form'),
	btn = document.getElementById('btn'),
	choose = document.getElementsByClassName('choose'),
	progress = document.getElementsByClassName('progress');

choose[0].checked = true;

const header = new Headers({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*'
});

const url = new URL('https://sf-pyw.mosyag.in/sse/vote/stats');

const ES = new EventSource(url, header);

btn.addEventListener("click", function () {
	if (choose[0].checked){
		reqName = "https://sf-pyw.mosyag.in/sse/vote/cats";
	}else if(choose[1].checked){
		reqName = "https://sf-pyw.mosyag.in/sse/vote/parrots";
	}else if(choose[2].checked){
		reqName = "https://sf-pyw.mosyag.in/sse/vote/dogs";	
	}
	let req = new XMLHttpRequest();
		req.open("POST", reqName, true);
		req.send();
	ES.onmessage = message => {
		let startIndex = message.data.indexOf(":"),
			endIndex = message.data.indexOf(",");
		for (var i = 0; i < progress.length; i++) {
			if (i != 0){
				startIndex = message.data.indexOf(":", endIndex);
				endIndex = message.data.indexOf(",", startIndex)
			}
			votes = +message.data.slice(startIndex + 1, endIndex);
			progress[i].style.cssText = `width: ${votes/5}px;`;
			progress[i].textContent = `${votes}`;
			progress[i].hidden = false;
		}
	};
});