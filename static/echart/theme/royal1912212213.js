(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (
        typeof exports === 'object' &&
        typeof exports.nodeName !== 'string'
    ) {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
})(this, function(exports, echarts) {
    var log = function(msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }

    var colorPalette = [
        '#3f7ea6',
        '#993366',
        '#408000',
        '#8c6f56',
        '#a65149',
        '#731f17',
        '#adc2eb',
        '#d9c3b0'
    ];

    var theme = {
        color: colorPalette,

        title: {
            textStyle: {
                fontWeight: 'normal',
                color: '#3f7ea6'
            }
        },

        visualMap: {
            color: ['#3f7ea6', '#993366']
        },

        toolbox: {
            color: ['#3f7ea6', '#3f7ea6', '#3f7ea6', '#3f7ea6']
        },

        tooltip: {
           // backgroundColor: 'rgba(0,0,0,0.5)',
            axisPointer: {
                // Axis indicator, coordinate trigger effective
                type: 'line', // The default is a straight line： 'line' | 'shadow'
                lineStyle: {
                    // Straight line indicator style settings
                    color: '#3f7ea6',
                    type: 'dashed'
                },
                crossStyle: {
                    color: '#3f7ea6'
                },
                shadowStyle: {
                    // Shadow indicator style settings
                    color: 'rgba(200,200,200,0.3)'
                }
            }
        },

        // Area scaling controller
        dataZoom: {
            dataBackgroundColor: '#eee', // Data background color
            fillerColor: 'rgba(200,200,200,0.2)', // Fill the color
            handleColor: '#3f7ea6' // Handle color
        },

        timeline: {
            lineStyle: {
                color: '#3f7ea6'
            },
            controlStyle: {
                color: '#3f7ea6',
                borderColor: '#3f7ea6'
            }
        },

        candlestick: {
            itemStyle: {
                color: '#d9c3b0',
                color0: '#8c6f56'
            },
            lineStyle: {
                width: 1,
                color: '#731f17',
                color0: '#a65149'
            },
            areaStyle: {
                color: '#3f7ea6',
                color0: '#993366'
            }
        },

        map: {
            itemStyle: {
                color: '#d9c3b0'
            },
            areaStyle: {
                color: '#ddd'
            },
            label: {
                color: '#c12e34'
            }
        },

        graph: {
            itemStyle: {
                color: '#993366'
            },
            linkStyle: {
                color: '#3f7ea6'
            }
        },

        gauge: {
            axisLine: {
                lineStyle: {
                    color: [
                        [0.2, '#d9c3b0'],
                        [0.8, '#3f7ea6'],
                        [1, '#731f17']
                    ],
                    width: 8
                }
            }
        }
    };

    echarts.registerTheme('royal', theme);
});