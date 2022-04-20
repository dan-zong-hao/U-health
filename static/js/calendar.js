var idContainer_8 = "container_8";
var chartDom = document.getElementById(idContainer_8);
var myChart = echarts.init(chartDom, window.gTheme);
var option;

function getVirtulData(year) {
  year = year || "2021";
  const timeElapsed = Date.now();
 
  var date = +echarts.number.parseDate(year + "-01-01");
  var end = +echarts.number.parseDate(+year + 1 + "-01-01");

  var dayTime = 3600 * 24 * 1000;
  var data = [];
  for (var time = date; time < end; time += dayTime) {
    data.push([
      echarts.format.formatTime("yyyy-MM-dd", time),
      Math.floor(Math.random() * 10000),
    ]);
  }
  return data;
}

option = {
  title: [
    {
      text: "每日步数",
      left: "left",
      textStyle: {
        color: "rgba(11, 240, 125, 0.796)",
        fontSize: "10",
      },
    },
  ],
  tooltip: {},
  visualMap: {
    min: 0,
    max: 10000,
    splitNumber: 2,
    type: "piecewise",
    orient: "horizontal",
    left: "center",
    top: 20,
    textStyle: {
      color: "rgba(255,255,255,.5)",
      fontSize: 10,
    },
  },
  calendar: {
    top: 65,
    bottom: 10,
    left: 30,
    right: 30,
    cellSize: ["auto", 13],
    // 显示坐标系的区段
    range: ['2021-01-01','2021-8-18'],
    itemStyle: {
      borderWidth: 0.5,
    },
    monthLabel: {
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: 10,
      },
    },
    dayLabel: {
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: 10,
      },
    },
    Label: {
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: 10,
      },
    },
    yearLabel: { show: false },
  },
  series: {
    type: "heatmap",
    coordinateSystem: "calendar",
    data: getVirtulData(2021),
  },
};


option && myChart.setOption(option);
window.addEventListener("resize", function () {
  myChart.resize();
});

function asyncData_8() {
  $.getJSON("../../static/json/calendar.json").done(function (data) {
    var myChart = echarts.init(document.getElementById(idContainer_8));
    myChart.setOption(
      data
    );
  }); //end $.getJSON
}

asyncData_8();
