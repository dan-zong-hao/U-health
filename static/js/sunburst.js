var idContainer_5 = "container_5";
var chartDom = document.getElementById(idContainer_5);
var myChart = echarts.init(chartDom, gTheme);

option = {
  title: {
    text: "运动卡路里等级",
    left: "left",
    textStyle: {
      color: "rgba(11, 240, 125, 0.796)",
      fontSize: "12",
    },
  },
  series: {
    type: "sunburst",
    data: [],
    radius: [3, "90%"],
    itemStyle: {
      borderRadius: 15,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,.1)",
    },

    label: {
      textStyle:{
        color: "rgba(0,0,0,.8)",
      }
    },
  },
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
window.addEventListener("resize", function () {
  myChart.resize();
});

function asyncData_5() {
  $.getJSON("../../static/json/sunburst.json").done(function (data) {
    var myChart = echarts.init(document.getElementById(idContainer_5));
    myChart.setOption({
      series: [{ data: data }],
    });
  }); //end $.getJSON
}

asyncData_5();
