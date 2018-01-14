document.getElementById("screen").style.height=(window.innerHeight * 0.92 )+ "px";

var p = document.getElementById('historic');
var nodes = p.childNodes

fetch('http://localhost:5000/v1/historic',{method:'get'})
	.then(function(response){
		if (response.status != 200)
		{
			console.log("error");
		}
		else
		{
			return response.json();
		}
	}).then(function (body){
		for (var i =0; i < body.length; i++) 
		{
			var item = document.createElement('div');
			var text = document.createElement('span');
			var img = document.createElement('img');
		
			if(body[i]['name'].length > 13)
			{
				var name = body[i]['name'].substring(0,12) + '...';
			}
			else
			{
				var name = body[i]['name'];
			}
		
			img.src = 'images/down.jpg';
			img.className = 'indicator';
			text.innerHTML = name + ' <br> ' + body[i]['value'].toLocaleString('pt-BR',{ minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' }) ;
			item.className = 'itemP';
			item.appendChild(img);
			item.appendChild(text);
			p.appendChild(item);
		}
	});