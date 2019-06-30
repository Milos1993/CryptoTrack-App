let xhr = new XMLHttpRequest();
let proxy = 'https://cors-anywhere.herokuapp.com/';
let url = 'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=50&convert=USD&CMC_PRO_API_KEY=';
let apiKey = 'a4fc94b7-e321-4c01-882a-bf6bca4217ff';
let fullUrl = proxy + url + apiKey;


xhr.open("GET", fullUrl);
	
xhr.onload  = function() {

	let table = document.createElement('table');
	table.id = 'myTable';
	let thead = document.createElement('thead');
	let tbody = document.createElement('tbody');
	tbody.className = 'tbody'

	let labels = ["Name", "Short name", "$ Value", "Last 24h", "Amount you own", "$ value of your coin"];
	
	let theadTr = document.createElement('tr');
	for (let i = 0; i < labels.length; i++) {
		let theadTh = document.createElement('th');
		theadTh.innerHTML = labels[i];
		theadTr.appendChild(theadTh);
	}
	thead.appendChild(theadTr);
	table.appendChild(thead);

	let jsonResponse = JSON.parse(xhr.responseText);
	let i;
	
	
    for(i = 0; i < jsonResponse.data.length; i++) { 
		const valuta = jsonResponse.data[i];
		let ind = i + 1;
		let tbodyTr = document.createElement('tr');
		
		let tbodyTdName = document.createElement('td');
		let a =  document.createElement('a');
		a.setAttribute('href', valuta.data);
		a.className = 'a';
		tbodyTdName.appendChild(a);	
		a.innerHTML = valuta.name;
		tbodyTr.appendChild(tbodyTdName);
	
		
		let tbodyTdSymbol = document.createElement('td');
		tbodyTdSymbol.innerHTML = valuta.symbol;
		tbodyTr.appendChild(tbodyTdSymbol);


		let tbodyTdValue = document.createElement('td');
		let price = valuta.quote.USD.price;
		price =  (Math.floor(price * 100) / 100);
		tbodyTdValue.innerHTML =  "$" + price;
		tbodyTdValue.setAttribute("id", "price" + ind);
		tbodyTr.appendChild(tbodyTdValue);


		let tbodyTdLast24h = document.createElement('td');
		let last24h = valuta.quote.USD.percent_change_24h;
		last24h = (Math.floor(last24h * 100) / 100);
		tbodyTdLast24h.innerHTML = last24h + ' %';
		tbodyTr.appendChild(tbodyTdLast24h);
		

		let tbodyTdAmount = document.createElement('td');
		let input =  document.createElement('input');
		input.setAttribute("form", "formInput" + ind); 
		input.setAttribute("id", "formInput" + ind);
		// input.setAttribute('type', 'text');
		// input.setAttribute('id', 'txt');
		// input.setAttribute('onkeyup', 'manage(formInput)');
		// input.className = 'input';
		
		let calc = document.createElement('input');
		calc.setAttribute("form", "form" + i);
		calc.setAttribute("type", "submit");
		calc.setAttribute("value", "Submit");
		calc.setAttribute("id", ind);
		// calc.setAttribute('class','btn')	
		// calc.disabled = true;
	
	
		calc.onclick = function() {
			let val = document.getElementById("price" + this.getAttribute("id")).innerHTML;
			val = val.split('$')[1];
			let amnt = document.getElementById("formInput" + this.getAttribute("id")).value;
			let tot = val * amnt;
			let total =  document.getElementById("output" + this.getAttribute("id")).innerHTML = tot;
			const key2 = 'total';
			const value2 = total;
			
			// console.log(key2);
			// console.log(value2);
			
			if (key2 && value2)  {
				localStorage.setItem(key2, value2);
				// location.reload();
			}
			total = localStorage.getItem(value2);
			// document.getElementById("output" + this.getAttribute("id")).innerHTML = localStorage.getItem(key2);
	
			console.log(this.getAttribute("id"));
		}
			
	
		tbodyTdAmount.appendChild(input);
		tbodyTdAmount.appendChild(calc);
		tbodyTr.appendChild(tbodyTdAmount);
		
		let tbodyTdTotal = document.createElement('td');
		
		tbodyTdTotal.setAttribute("id", "output" + ind); 
		tbodyTr.appendChild(tbodyTdTotal);


		
		if(last24h < 0)
			tbodyTdLast24h.style.color="red";
		else
			tbodyTdLast24h.style.color="green";
		
			
		if(i%2 == 0)
			tbodyTr.style.background="lightgray";
		else
			tbodyTr.style.background="white";
		
		tbody.appendChild(tbodyTr);
					
	}
	table.appendChild(tbody);
	document.getElementById('root').appendChild(table);
		
};



// function manage(formInput) {
		
// 	let calc = document.getElementById('formInput');

// if (formInput.value != '') {
// 	calc.disabled = false;
// 	if (event.keyCode === 13) {
// 		event.preventDefault();
// 		document. document.querySelectorAll('formInput').click();
// 	   }
// }
// else {
// 	calc.disabled = true;
// }	

// }
class Loader {
	static css(url) {
	  return new Promise((resolve, reject) => {
		this._load("link", url, resolve, reject);
	  });
	}
  
	static js(url) {
	  return new Promise((resolve, reject) => {
		this._load("script", url, resolve, reject);
	  });
	}
  
	static _load(tag, url, resolve, reject) {
	  let element = document.createElement(tag);
	  let attr;
	  let parent;
  
	  // resolve and reject for the promise
	  element.addEventListener("load", () => {
		resolve(url);
	  });
	  element.addEventListener("error", () => {
		reject(url);
	  });
  
	  // set different attributes depending on tag type
	  switch (tag) {
		case "script":
		  parent = "body";
		  attr = "src";
		  element.async = false;
		  break;
		case "link":
		  parent = "head";
		  attr = "href";
		  element.type = "text/css";
		  element.rel = "stylesheet";
		  break;
		default:
		  throw new Error("Unsupported tag.");
	  }
  
	  // set the url for the element
	  element[attr] = url;
  
	  // initiate the loading of the element
	  document[parent].appendChild(element);
	}
  }
  
  
  Promise.all([
	Loader.css("https://rawgit.com/CodeSeven/toastr/master/build/toastr.min.css"),
	Loader.js("https://code.jquery.com/jquery-3.3.1.min.js"),
	Loader.js("https://rawgit.com/CodeSeven/toastr/master/build/toastr.min.js")
  ])
	.then(messages => {
	  console.log("Resolved!", messages);
	  toastr.info("Loading");
	})
	.catch(error => {
	  console.error("Rejected!", error);
	});
			
	xhr.send();