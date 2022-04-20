var idContainer_7 = "container_7";

function initEchart_7() {
  var myChart = echarts.init(
    document.getElementById(idContainer_7),
    window.gTheme
  );

  option = {
    title: {
      text: "血压",
      left: "left",
      textStyle: {
        color: "rgba(11, 240, 125, 0.796)",
        fontSize: "10",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: "#dddc6b",
        },
      },
    },
    legend: {
      top: "0%",
      data: ["高压", "低压"],
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: 10,
      },
    },
    grid: {
      left: "5%",
      top: "30%",
      right: "5%",
      bottom: "5%",
      containLabel: true,
    },

    xAxis: [
      {
        type: "category",
        boundaryGap: false,
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
    ],

    yAxis: [
      {
        type: "value",
        name: "mmHg",
        min: 0,
        max: 300,
        axisTick: { show: false },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: 10,
          },
          // formatter: '{value} KM',
        },

        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
          },
        },

        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
          },
        },
      },
    ],
    series: [
      {
        name: "高压",
        type: "line",
        // 平滑曲线 或 折线
        smooth: true,
        // 面接图
        // areaStyle: {},
        symbol: "circle",
        symbolSize: 5,
        lineStyle: {
          normal: {
            // color: '#0184d5',
            width: 2,
          },
        },
        data: [],
      },
      {
        name: "低压",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        lineStyle: {
          normal: {
            // color: '#0184d5',
            width: 2,
          },
        },
        data: [],
      },
    ],
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
}

function asyncData_7() {
  $.getJSON("../../static/json/line_7.json").done(function (data) {
    var myChart = echarts.init(document.getElementById(idContainer_7));

    myChart.setOption({
      xAxis: data["xAxis"],
      series: data["series"],
    });
  }); //end $.getJSON
}

initEchart_7();
asyncData_7();
