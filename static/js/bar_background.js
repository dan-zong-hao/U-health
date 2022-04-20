var idContainer_9 = "container_9";
var chartDom = document.getElementById(idContainer_9);
var myChart = echarts.init(chartDom, window.gTheme);
var option;

option = {
  title: {
    text: "体重",
    left: "left",
    textStyle: {
      color: "rgba(11, 240, 125, 0.8)",
      fontSize: "10",
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    top: "30%",
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow", 
    },
  },
  xAxis: {
    type: "category",
    data: [],
    axisLabel: {
        textStyle: {
          color: "rgba(255,255,255,.5)",
          fontSize: 10,
        },
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
  yAxis: {
    type: "value",
    min: 0,
    max: 100,
    axisLabel: {
        textStyle: {
          color: "rgba(255,255,255,.5)",
          fontSize: 10,
        },
        formatter: '{value}%',
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
      type: "bar",
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.1)",
      },
    },
  ],
};

option && myChart.setOption(option);

myChart.setOption(option);
window.addEventListener("resize", function () {
  myChart.resize();
});

function asyncData_9() {
  $.getJSON("../../static/json/bar_background.json").done(function (data) {
    var myChart = echarts.init(document.getElementById(idContainer_9));
    myChart.setOption({
      xAxis: data["xAxis"],
      series: data["series"],
    });
  });
}

asyncData_9();
