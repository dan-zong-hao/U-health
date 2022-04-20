
var idContainer_1 = "container_1";
var idContainer_2 = "container_2";
var idContainer_3 = "container_3";
var idContainer_4 = "container_4";

var chartDom_1 = document.getElementById(idContainer_1);
var chartDom_2 = document.getElementById(idContainer_2);
var chartDom_3 = document.getElementById(idContainer_3);
var chartDom_4 = document.getElementById(idContainer_4);

function asyncData_1234() {
    $.getJSON("../../static/json/dom.json").done(function (data) {
        // chartDom_1.innerHTML = data[0] + '步' ;
        chartDom_1.innerHTML = '9655步' ;
        chartDom_2.innerHTML = data[1] + "次/分";
        chartDom_3.innerHTML = data[2] + "%";
        chartDom_4.innerHTML = data[3] ;
    });
  }