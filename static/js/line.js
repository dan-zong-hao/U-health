var idContainer_6 = "container_6";

function initEchart_6() {
  var myChart = echarts.init(
    document.getElementById(idContainer_6),
    window.gTheme
  );

  option = {
    title: {
      text: "心率&血氧饱和度",
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
      data: ["心率", "血氧饱和度"],
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
        min: 0,
        max: 200,
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
      {
        type: "value",
        min: 1,
        max: 100,
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
          },
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: 10,
          },
          formatter: '{value}%',
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
        name: "心率",
        type: "line",
        // 平滑曲线 或 折线
        // smooth: true,
        // 面接图
        areaStyle: {},
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
        name: "血氧饱和度",
        type: "line",
        yAxisIndex: 1,
        // 平滑曲线 或 折线
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

function asyncData_6() {
  $.getJSON("../../static/json/line.json").done(function (data) {
    var myChart = echarts.init(document.getElementById(idContainer_6));

    myChart.setOption({
      xAxis: data["xAxis"],
      series: data["series"],
    });
  }); //end $.getJSON
}

initEchart_6();
asyncData_6();
