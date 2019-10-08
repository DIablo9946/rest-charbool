function init(){

printGraphs();

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

function lineGraph(data){
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
};

function getSalesmenProfit(data){

  var sellers = {};

  for (var i=0; i<data.length; i++){
    var d = data[i];

    var name = d.salesman;
    var amount = d.amount;

    if (!sellers[name]){
      sellers[name] = 0;
    };

    sellers[name] += Number(amount);
  };

  console.log(sellers);
  return sellers;
};

function pieGraph(data){
  var sellers = getSalesmenProfit(data);
  var name = Object.keys(sellers);
  var amounts = Object.values(sellers);
  console.log(sellers);
  console.log(name);
  console.log(amounts);

  var ctx = document.getElementById('pieGraph').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: name,
          datasets: [{
              label: 'Vendite mensili',
              data: amounts,
              backgroundColor: 	[
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 0, 0, 0.6)'
              ],
          }]
      },
  });
};

function printGraphs(){

  $.ajax({
    url : "http://157.230.17.132:4003/sales",
    method : "GET",
    success: function(data){
      lineGraph(data);
      pieGraph(data);
    },
    error: function(){

    }
  });
};










// if (!sellers.includes(name)) è la stessa cosa che scrivere if(!sellers[name]) o è una cosa completamente diversa ?
