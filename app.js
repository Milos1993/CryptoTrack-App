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
	let calc
	
	
    for(i = 0; i < jsonResponse.data.length; i++) { 
		const valuta = jsonResponse.data[i];
		let ind = i + 1;
		let tbodyTr = document.createElement('tr');
		
		let tbodyTdName = document.createElement('td');
		let a =  document.createElement('a');
		a.setAttribute('href', 'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=a4fc94b7-e321-4c01-882a-bf6bca4217ff');
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
		input.setAttribute('class', 'amountof')
		

		
	
		
		let calc = document.createElement('input');
		calc.setAttribute("form", "form" + i);
		calc.setAttribute("type", "submit");
		calc.setAttribute("value", "Calculate");
		calc.setAttribute("id", ind);
		calc.setAttribute('class','btn')
		calc.disabled = true;
			
		tbodyTdAmount.appendChild(input);
		tbodyTdAmount.appendChild(calc);

		tbodyTr.appendChild(tbodyTdAmount);
		
		let tbodyTdTotal = document.createElement('td');
		tbodyTdTotal.setAttribute("id", "output" + ind); 
		tbodyTr.appendChild(tbodyTdTotal);
		input.onchange = function() {
			console.log(this.value);
			localStorage.setItem(this.getAttribute("id") ,this.value);
		}
		
		input.value = localStorage.getItem("formInput" + ind);
		if(localStorage.getItem('price' + ind)){
			tbodyTdTotal.innerHTML = localStorage.getItem('price' + ind);
		}


		
		if(last24h < 0)
			tbodyTdLast24h.style.color="red";
		else
			tbodyTdLast24h.style.color="green";
		
			
		if(i%2 == 0)
			tbodyTr.style.background="lightgray";
		else
			tbodyTr.style.background="white";
		
		tbody.appendChild(tbodyTr);
		

	table.appendChild(tbody);
	document.getElementById('root').appendChild(table);
	}
		calc = document.querySelectorAll('.btn')
		calc.forEach(function(calc){
			calc.addEventListener('click', calculate)
		})
		 function calculate() {
			
			let elementId = "price" + this.getAttribute("id");
			let val = document.getElementById(elementId).innerHTML;
			
			val = val.split('$')[1];
			let amnt = document.getElementById("formInput" + this.getAttribute("id")).value;
			let tot = val * amnt;
			  document.getElementById("output" + this.getAttribute("id")).innerHTML = tot;
			
		
			const key2 = elementId;
			const value2 = tot;
			console.log(key2);
			console.log(value2);
							
			if (key2 && value2)  {
				localStorage.setItem(key2, value2);
				
			}
	
			document.getElementById("output" + this.getAttribute("id")).innerHTML = localStorage.getItem(key2);

			console.log(this.getAttribute("id"));
			if (event.keyCode === 13) {
				event.preventDefault();
				document.querySelectorAll('.btn').click();
			   }
		}
			
		
		let numinput = document.querySelectorAll('.amountof');
		
		numinput.forEach(function(input){
			
			input.addEventListener('keyup', manage);
		
		})
		function manage(event){
		
			if(this.value != ''){
				
				let id = this.getAttribute('id');
				
				let idnum = id.substr(id.length -1)
				
				let button = document.getElementById(idnum)
				console.log(button)
				button.removeAttribute('disabled')
		
			}

		}
	
};


xhr.send();
window.onload = function () {
	document.getElementById('loading').style.display = 'none';
}
setTimeout(function () { document.getElementById("tb").contentWindow.location.reload(true); }, 10000);
			
	