// var ec_right2 = echarts.init(document.getElementById('r2'), "dark");

// // var ddd = [{'name': '肺炎', 'value': '12734670'}, {'name': '实时', 'value': '12734670'},
// //     {'name': '新型', 'value': '12734670'}]
// var ec_right2_option = {
//     // backgroundColor: '#515151',
//     title: {
//         text: "百度热搜",
//         textStyle: {
//             color: 'white',
//         },
//         left: 'left'
//     },
//     tooltip: {
//         show: false
//     },
//     series: [{
//         type: 'wordCloud',
//         // drawOutOfBound:true,
//         gridSize: 1,
//         sizeRange: [12, 55],
//         rotationRange: [-45, 0, 45, 90],
//         // maskImage: maskImage,
//         textStyle: {
//             normal: {
//                 color: function () {
//                     return 'rgb(' +
//                         Math.round(Math.random() * 255) +
//                         ', ' + Math.round(Math.random() * 255) +
//                         ', ' + Math.round(Math.random() * 255) + ')'
//                 }
//             }
//         },
//         // left: 'center',
//         // top: 'center',
//         // // width: '96%',
//         // // height: '100%',
//         right: null,
//         bottom: null,
//         // width: 300,
//         // height: 200,
//         // top: 20,
//         data: []
//     }]
// }
var ec_right2 = echarts.init(document.getElementById('r2'), "dark");
var ec_right2_option = {
	tooltip: {
		trigger: 'axis',
		//指示器
		axisPointer: {
			type: 'line',
			lineStyle: {
				color: '#7171C6'
			}
		},
	},
	legend: {
		data: ['新增确诊', '新增疑似', '新增治愈', '新增死亡'],
		left: "right"
	},
	//标题样式
	title: {
		text: "全国新增趋势",
		textStyle: {
			color: 'white',
		},
		left: 'left'
	},
	darkmode: "auto",
	backgroundColor: "#2B303B",
	//图形位置
	grid: {
		left: '0%',
		right: '6%',
		bottom: '4%',
		top: 50,
		containLabel: true
	},
	xAxis: [{
		type: 'category',
		//x轴坐标点开始与结束点位置都不在最边缘
		// boundaryGap : true,

		data: []
	}],
	yAxis: [{
		type: 'value',
		//y轴字体设置

		//y轴线设置显示
		axisLine: {
			show: true
		},
		axisLabel: {
			show: true,
			color: 'white',
			fontSize: 12,
			formatter: function(value) {
				if (value >= 1000) {
					value = value / 1000 + 'k';
				}
				return value;
			}
		},
		//与x轴平行的线样式
		splitLine: {
			show: true,
			lineStyle: {
				// color: '#FFF',
				width: 1,
				// type: 'solid',
			}
		}
	}],
	series: [{
		name: "新增确诊",
		type: 'line',
		smooth: true,
		data: []
	}, {
		name: "新增疑似",
		type: 'line',
		smooth: true,
		data: []
	}, {
		name: "新增治愈",
		type: 'line',
		smooth: true,
		data: []
	}, {
		name: "新增死亡",
		type: 'line',
		smooth: true,
		data: []
	}]
};

ec_right2.setOption(ec_right2_option);
