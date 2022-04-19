var idContainer_10 = "container_10";
var chartDom = document.getElementById(idContainer_10);
var myChart = echarts.init(chartDom, window.gTheme);
var option;

option = {
  title: {
    text: "卡路里",
    left: "left",
    textStyle: {
      color: "rgba(11, 240, 125, 0.796)",
      fontSize: "10",
    },
  },
  grid: {
    left: "3%",
    right: "5%",
    bottom: "5%",
    // 距离顶部边框的相对距离，太近压到了legend
    // top:'30%',
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // Use axis to trigger tooltip
      type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    axisLabel: {
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: 10,
      },
      // formatter: '{value}%',
    },
    axisLine: {
      lineStyle: {
        color: "rgba(255,255,255,.2)",
      },
    },
    splitLine: {
      lineStyle: {
        color: "rgba(255,255,255,.1)",
      },
    },
    data: [],
  },
  yAxis: {
    type: "value",
    name: "千卡",
    axisLabel: {
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: 10,
      },
      // formatter: '{value}%',
    },
    axisLine: {
      lineStyle: {
        color: "rgba(255,255,255,.2)",
      },
    },
    splitLine: {
      lineStyle: {
        color: "rgba(255,255,255,.1)",
      },
    },
  },
  series: [
    {
      data: [],
      type: "line",
      areaStyle: {},
    },
  ],
};

option && myChart.setOption(option);
window.addEventListener("resize", function () {
  myChart.resize();
});

function asyncData_10() {
  $.getJSON("../../static/json/area_chart.json").done(function (data) {
    var myChart = echarts.init(document.getElementById(idContainer_10));
    // console.log(JSON.stringify(data));
    myChart.setOption(data);
  });
}

asyncData_10();
