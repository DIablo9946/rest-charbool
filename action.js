function init(){

printLineGraph();
printDonaughtGraph()
};

$(document).ready(init);



function getMonthLabel(){
  var months = moment.months();
  console.log(months);
  return months;

};

function getMonthProfit(data){

  var monthProfit = new Array(12).fill(0);
    // console.log(monthProfit);

    for(var i=0; i< data.length; i++){

      var d = data[i];
      var date = d.date; //come mai .date???
      var amount = Number(d.amount);

      var month = moment(date, "DD/MM/YYYY").month();
      console.log(d);

      monthProfit[month] += amount;
    }

    console.log(monthProfit);
    return monthProfit;
};


function printLineGraph(){

  $.ajax({
    url : "http://157.230.17.132:4003/sales",
    method : "GET",
    success: function(data){
      console.log(data);
        var monthLabel = getMonthLabel();
        var monthProfit = getMonthProfit(data);
        var ctx = document.getElementById('lineGraph').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: monthLabel,
                datasets: [{
                    label: 'Vendite mensili',
                    data: monthProfit,
                    backgroundColor: 	['rgba(255, 0, 0, 0.3)'],
                    borderColor: ['rgba(0, 0, 255, 0.6)'],
                }]
            },
        });
    },
    error: function(){

    }
  });
};

function getSalesmanAmount(data){


var agenti = {
  nome : [],
  somma : []
};

for (var i=0; i< data.length; i++){

  var d = data[i];

  var nome = d.salesman;

  if(!agenti.nome.includes(nome)){
    agenti.nome.push(nome);
    agenti.somma.push(0)
  };

  var amount = d.amount;

  for (var x=0; x < agenti.nome.length; x++){
    if (nome == agenti.nome[x]){
      agenti.somma[x] += amount;
    }
  }

};
  return agenti;
};

function printDonaughtGraph(){

  $.ajax({
    url : "http://157.230.17.132:4003/sales",
    method : "GET",
    success: function(data){
      console.log(data);

        getSalesmanAmount(data);
        var ctx = document.getElementById('donoughGraph').getContext('2d');
        var myPieChart  = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: agenti.nome,
                datasets: [{
                    label: '# of Votes',
                    data: agenti.somma,
                    backgroundColor: 	['rgba(255, 0, 0, 0.3)'],
                    borderColor: ['rgba(0, 0, 255, 0.6)'],
                }]
            },
        });
    },
    error: function(){

    }
  });
};
