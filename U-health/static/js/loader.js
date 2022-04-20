function addScript(url) {
  document.write("<script language=javascript src=" + url + "></script>");
}

function addCSS(url) {
  document.write("<link rel=stylesheet href=" + url + ">");
}

// 加载主题，必须在echarts.init之前。
var gTheme = "";
// $.ajaxSettings.async = false;
// $.getJSON("json/config.json").done(function (data) {
//   gTheme = data.theme;
// }); //end $.getJSON


gTheme = "infographic";
gTheme = "macarons";
gTheme = "roma";
gTheme = "shine";
gTheme = "walden";
gTheme = "westeros";
gTheme = "wonderland";

// gTheme = "vintage";  // 有背景色
// gTheme = "purple-passion"; // 有背景色
// gTheme = "chalk";// 有背景色
// gTheme = "dark"; // 有背景色
// gTheme = "essos"; // 有背景色

themeUrl = "../static/theme/" + gTheme + ".js";
alert(themeUrl);
addScript(themeUrl);
// 加载主题，必须在echarts.init之前。

// 0
addScript("../static/js/header.js");
// 1 2 3 4
addScript("../static/js/dom.js");
// 5
addScript("../static/js/sunburst.js");
// 6
addScript("../static/js/line.js");
// 7
addScript("../static/js/line_7.js");
// 8
addScript("../static/js/calendar.js");
// 9
addScript("../static/js/bar_background.js");
// 10
addScript("../static/js/area_chart.js");
// 11
addScript("../static/js/bar_background_11.js");

function asyncData() {
  asyncData_1234();
  asyncData_5();
  asyncData_6();
  asyncData_7();
  asyncData_8();
  asyncData_9();
  asyncData_10();
  asyncData_11();
  setTimeout(asyncData, 1000);
}

setTimeout(asyncData, 1000);
