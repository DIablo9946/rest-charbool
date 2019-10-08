function init(){
  // getGraphic();
  console.log("Hello");
  getMonthLabel();
  printLineGraph();

};

$(document).ready(init);


// function getGraphic(){
//
//   var ctx = document.getElementById('myChart').getContext('2d');
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Grey', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [4, 5, 9, 6, 7, 3],
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });
//
// };


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
      var date = d.date;
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
    url : "http://157.230.17.132:3000/todos",
    method : "GET",
    success: function(data){
      console.log(data);
        var monthLabel = getMonthLabel();
        var monthProfit = getMonthProfit(data);
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: monthLabel,
                datasets: [{
                    label: '# of Votes',
                    data: monthProfit,
                }]
            },
        });
    },
    error: function(){

    }
  });
};
