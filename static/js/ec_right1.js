var ec_right1 = echarts.init(document.getElementById("r1"), "dark");
var ec_right1_option = {
  //标题样式
  title: {
    text: "剩余确诊TOP5",
    textStyle: {
      color: "white",
    },
    left: "left",
  },
  color: ["#3398DB"],
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  darkmode: "auto",
  backgroundColor: "#2B303B",
  xAxis: {
    type: "category",
    color: "white",
    data: [],
  },
  yAxis: {
    type: "value",
    color: "white",
    axisLine: {
      show: true,
    },
    axisLabel: {
      show: true,
      color: "white",
      fontSize: 12,
      formatter: function (value) {
        if (value >= 1000) {
          value = value / 1000 + "k";
        }
        return value;
      },
    },
  },
  series: [
    {
      data: [],
      type: "bar",
      barMaxWidth: "50%",
    },
  ],
};
ec_right1.setOption(ec_right1_option);
