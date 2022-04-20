var ec_left1 = echarts.init(document.getElementById("l1"), "dark");
var ec_left1_Option = {
  tooltip: {
    trigger: "axis",
    //指示器
    axisPointer: {
      type: "line",
      lineStyle: {
        color: "#7171C6",
      },
    },
  },
  legend: {
    data: ["累计确诊", "目前确诊", "累计治愈", "累计死亡"],
    left: "right",
  },
  //标题样式
  title: {
    text: "全国累计趋势",
    textStyle: {
      color: "white",
    },
    left: "left",
  },
  darkmode: "auto",
  backgroundColor: "#2B303B",
  //图形位置
  grid: {
    left: "4%",
    right: "6%",
    bottom: "4%",
    top: 50,
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      //x轴坐标点开始与结束点位置都不在最边缘
      // boundaryGap : true,

      data: [],
    },
  ],
  yAxis: [
    {
      type: "value",
      //y轴字体设置

      //y轴线设置显示
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
      //与x轴平行的线样式
      splitLine: {
        show: true,
        lineStyle: {
          // color: '#FFF',
          width: 1,
          // type: 'solid',
        },
      },
    },
  ],
  series: [
    {
      name: "累计确诊",
      type: "line",
      smooth: true,
      data: [],
    },
    {
      name: "目前确诊",
      type: "line",
      smooth: true,
      data: [],
    },
    {
      name: "累计治愈",
      type: "line",
      smooth: true,
      data: [],
    },
    {
      name: "累计死亡",
      type: "line",
      smooth: true,
      data: [],
    },
  ],
};

ec_left1.setOption(ec_left1_Option);
