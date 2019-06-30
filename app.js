let xhr = new XMLHttpRequest();
let proxy = 'https://cors-anywhere.herokuapp.com/';
let url = 'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=50&convert=USD&CMC_PRO_API_KEY=';
let apiKey = 'a4fc94b7-e321-4c01-882a-bf6bca4217ff';
let fullUrl = proxy + url + apiKey;


xhr.open("GET", fullUrl);
	
xhr.onload  = function() {

	
	




	var table = document.createElement('table');
	table.className = 'tbl'
	var thead = document.createElement('thead');
	var tbody = document.createElement('tbody');
	tbody.className = 'tbody'

	var labels = ["Name", "Short name", "$ Value", "Last 24h", "Amount you own", "$ value of your coin"];
	
	var theadTr = document.createElement('tr');
	for (var i = 0; i < labels.length; i++) {
		var theadTh = document.createElement('th');
		theadTh.innerHTML = labels[i];
		theadTr.appendChild(theadTh);
	}
	thead.appendChild(theadTr);
	table.appendChild(thead);


	
	let jsonResponse = JSON.parse(xhr.responseText);
	
	var i;
	
	
    for(i = 0; i < jsonResponse.data.length; i++) { 
		const valuta = jsonResponse.data[i];
		var tbodyTr = document.createElement('tr');
		
		var tbodyTdName = document.createElement('td');
		var a =  document.createElement('a');
		a.setAttribute('href', 'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=a4fc94b7-e321-4c01-882a-bf6bca4217ff');
		a.className = 'a';
		tbodyTdName.appendChild(a);
		
		a.innerHTML = valuta.name;
		tbodyTr.appendChild(tbodyTdName);
		
		var tbodyTdSymbol = document.createElement('td');
		tbodyTdSymbol.innerHTML = valuta.symbol;
		tbodyTr.appendChild(tbodyTdSymbol);


		var tbodyTdValue = document.createElement('td');
		var price = valuta.quote.USD.price;
		tbodyTdValue.innerHTML = price + " $";
		tbodyTr.appendChild(tbodyTdValue);

		var tbodyTdLast24h = document.createElement('td');
		var last24h = valuta.quote.USD.percent_change_24h;
		tbodyTdLast24h.innerHTML = last24h;
		tbodyTr.appendChild(tbodyTdLast24h);

		var tbodyTdAmount = document.createElement('td');
		var input =  document.createElement('input');
		input.setAttribute('type', 'text');
		input.className = 'input';
		var button = document.createElement('button');
		button.setAttribute('type', 'submit');
		button.className = 'button';
		button.appendChild(document.createTextNode("Submit"));
		
		
		tbodyTdAmount.appendChild(input);
		tbodyTdAmount.appendChild(button);

		tbodyTr.appendChild(tbodyTdAmount);
		
		var tbodyTdCoin = document.createElement('td');
		var span = document.createElement('span');
		tbodyTdCoin.appendChild(span);
		span.appendChild(document.createTextNode("nesto"));
		tbodyTr.appendChild(tbodyTdCoin);


		
		if(last24h < 0)
			tbodyTdLast24h.style.color="red";
		else
			tbodyTdLast24h.style.color="green";
		
			
		if(i%2 == 0)
			tbodyTr.style.background="lightgray";
		else
			tbodyTr.style.background="white";
		
		tbody.appendChild(tbodyTr);
		
		
		
			
				
	};
	table.appendChild(tbody);
	document.getElementById('root').appendChild(table);
	

};


window.onload = function () {
	document.getElementById('loading').style.display = 'none';
}

xhr.send();

// setTimeout(function () { document.getElementById("tb").contentWindow.location.reload(true); }, 10000, alert("cao"));
			
