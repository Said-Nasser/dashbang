rts.init(document.querySelector("#chart1"));
// let chart2 = echarts.init(document.querySelector("#chart2"));
// let chart3 = echarts.init(document.querySelector("#chart3"));

// function drawChart1() {
//   let dataCount = 5e5;
//   let data = generateData(dataCount);

//   let option = {
//     title: {
//       text: echarts.format.addCommas(dataCount) + " Data",
//       left: 10,
//     },
//     toolbox: {
//       feature: {
//         dataZoom: {
//           yAxisIndex: false,
//         },
//         saveAsImage: {
//           pixelRatio: 2,
//         },
//       },
//     },
//     tooltip: {
//       trigger: "axis",
//       axisPointer: {
//         type: "shadow",
//       },
//     },
//     grid: {
//       bottom: 90,
//     },
//     xAxis: {
//       data: data.categoryData,
//       silent: false,
//       splitLine: {
//         show: false,
//       },
//       splitArea: {
//         show: false,
//       },
//     },
//     yAxis: {
//       splitArea: {
//         show: false,
//       },
//     },
//     series: [
//       {
//         type: "bar",
//         data: data.valueData,
//         // Set `large` for large data amount
//         large: true,
//       },
//     ],
//   };

//   function generateData(count) {
//     var baseValue = Math.random() * 1000;
//     var time = +new Date(2011, 0, 1);
//     var smallBaseValue;

//     function next(idx) {
//       smallBaseValue =
//         idx % 30 === 0
//           ? Math.random() * 700
//           : smallBaseValue + Math.random() * 500 - 250;
//       baseValue += Math.random() * 20 - 10;
//       return Math.max(0, Math.round(baseValue + smallBaseValue) + 3000);
//     }

//     var categoryData = [];
//     var valueData = [];

//     for (var i = 0; i < count; i++) {
//       categoryData.push(
//         echarts.format.formatTime("yyyy-MM-dd\nhh:mm:ss", time)
//       );
//       valueData.push(next(i).toFixed(2));
//       time += 1000;
//     }

//     return {
//       categoryData: categoryData,
//       valueData: valueData,
//     };
//   }

//   chart1.setOption(option);
// }

// function drawChart2() {
//   let xAxisData = [];
//   let data1 = [];
//   let data2 = [];
//   for (var i = 0; i < 100; i++) {
//     xAxisData.push("类目" + i);
//     data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
//     data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
//   }
//   option = {
//     title: {
//       text: "Distribution",
//     },
//     legend: {
//       data: ["bar", "bar2"],
//     },
//     toolbox: {
//       feature: {
//         magicType: {
//           type: ["stack", "tiled"],
//         },
//         dataView: {},
//         saveAsImage: {
//           pixelRatio: 2,
//         },
//       },
//     },
//     tooltip: {},
//     xAxis: {
//       data: xAxisData,
//       splitLine: {
//         show: false,
//       },
//     },
//     yAxis: {},
//     series: [
//       {
//         name: "bar",
//         type: "bar",
//         data: data1,
//         animationDelay: function (idx) {
//           return idx * 10;
//         },
//       },
//       {
//         name: "bar2",
//         type: "bar",
//         data: data2,
//         animationDelay: function (idx) {
//           return idx * 10 + 100;
//         },
//       },
//     ],
//     animationEasing: "elasticOut",
//     animationDelayUpdate: function (idx) {
//       return idx * 5;
//     },
//   };
//   chart2.setOption(option);
// }

// function drawChart3() {
//   option = {
//     backgroundColor: "#2c343c",

//     title: {
//       text: "Customized Pie",
//       left: "center",
//       top: 20,
//       textStyle: {
//         color: "#ccc",
//       },
//     },

//     tooltip: {
//       trigger: "item",
//       formatter: "{a} <br/>{b} : {c} ({d}%)",
//     },

//     visualMap: {
//       show: false,
//       min: 80,
//       max: 600,
//       inRange: {
//         colorLightness: [0, 1],
//       },
//     },
//     series: [
//       {
//         name: "Pie",
//         type: "pie",
//         radius: "55%",
//         center: ["50%", "50%"],
//         data: [
//           { value: 335, name: "X" },
//           { value: 310, name: "Y" },
//           { value: 274, name: "Z" },
//           { value: 235, name: "W" },
//           { value: 400, name: "V" },
//         ].sort(function (a, b) {
//           return a.value - b.value;
//         }),
//         roseType: "radius",
//         label: {
//           color: "rgba(255, 255, 255, 0.3)",
//         },
//         labelLine: {
//           lineStyle: {
//             color: "rgba(255, 255, 255, 0.3)",
//           },
//           smooth: 0.2,
//           length: 10,
//           length2: 20,
//         },
//         itemStyle: {
//           color: "#c23531",
//           shadowBlur: 200,
//           shadowColor: "rgba(0, 0, 0, 0.5)",
//         },

//         animationType: "scale",
//         animationEasing: "elasticOut",
//         animationDelay: function (idx) {
//           return Math.random() * 200;
//         },
//       },
//     ],
//   };
//   chart3.setOption(option);
// }

// drawChart1();
// drawChart2();
// drawChart3();
