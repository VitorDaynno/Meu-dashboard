labels = labels();
colors = ['#00aedb','#a200ff','#f47835','#d41243','#8ec127','#008744','#0057e7','#d62d20','#ffa700',
          '#fe0000','#fdfe02','#0bff01','#011efe','#fe00f6'];

data = {
    labels: labels,
    datasets: []
}

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {responsive:true}
});

fetch("http://localhost:5000/v1/FormPayments",{method:'get'})
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
		expenses = body.map(function(forms){
            return returnExpenses(forms._id);
        }) 
     
	}).catch(function (error){
        console.log(error);
    });

    
function returnExpenses(form)
{
    fetch("http://localhost:5000/v1/monthlyExpenses/"+form,{method:'get'})
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
            var values = []
            for(var i=0; i < 6; i++ ){
                value = 0;
                body.map(function (expenses){
                            if(expenses._id == labels[i])
                            {
                                value = parseFloat(expenses.value,2);
                            }
                        });
                values.push(value);
            }
            var color = colors[Math.floor((Math.random() * colors.length))];
            body = {
                fill:false,
                label: form,
                backgroundColor: color,
                borderColor: color,
                data: values
            }
            data.datasets.push(body)
            chart.update();                
    }).catch(function (error){
        console.log(error);
    });
}

function labels()
{
    var date = new Date();
    month = date.getMonth();
    year = date.getFullYear();
    var labels = []
    for(var i=5;i>=0;i--)
    {
        var date = new Date(year,month-i);
        var label = (date.getFullYear().toString() + "/" + ((date.getMonth() +1)>=10?(date.getMonth() +1).toString():"0"+(date.getMonth() +1).toString())); 
        labels.push(label);
    }

    return labels;
}
