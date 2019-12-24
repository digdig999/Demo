<template>
  <div>
    <el-container>
      <div id="main" style="width: 600px;height:400px;margin:0 auto"></div>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "app",
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "借阅信息统计",
          subtext: "虚构数据",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 10,
          left: "center",
          data: ["文学", "都市", "神话", "玄幻", "历史"]
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              {
                value: 1548,
                name: "文学",
                label: {
                  normal: {
                    formatter: [
                      "{title|{b}}{abg|}",
                      "  {weatherHead|男生}{valueHead|女生}{rateHead|占比}",
                      "{hr|}",
                      "  {Sunny|}{value|202}{rate|55.3%}",
                      "  {Cloudy|}{value|142}{rate|38.9%}",
                      "  {Showers|}{value|21}{rate|5.8%}"
                    ].join("\n"),
                    backgroundColor: "#eee",
                    borderColor: "#777",
                    borderWidth: 1,
                    borderRadius: 4,
                    rich: {
                      title: {
                        color: "#eee",
                        align: "center"
                      },
                      abg: {
                        backgroundColor: "#333",
                        width: "100%",
                        align: "right",
                        height: 25,
                        borderRadius: [4, 4, 0, 0]
                      },
                      Sunny: {
                        height: 30,
                        align: "left",
                        // backgroundColor: {
                        //   image: weatherIcons.Sunny
                        // }
                      },
                      Cloudy: {
                        height: 30,
                        align: "left",
                        // backgroundColor: {
                        //   image: weatherIcons.Cloudy
                        // }
                      },
                      Showers: {
                        height: 30,
                        align: "left",
                        // backgroundColor: {
                        //   image: weatherIcons.Showers
                        // }
                      },
                      weatherHead: {
                        color: "#333",
                        height: 24,
                        align: "left"
                      },
                      hr: {
                        borderColor: "#777",
                        width: "100%",
                        borderWidth: 0.5,
                        height: 0
                      },
                      value: {
                        width: 20,
                        padding: [0, 20, 0, 30],
                        align: "left"
                      },
                      valueHead: {
                        color: "#333",
                        width: 20,
                        padding: [0, 20, 0, 30],
                        align: "center"
                      },
                      rate: {
                        width: 40,
                        align: "right",
                        padding: [0, 10, 0, 0]
                      },
                      rateHead: {
                        color: "#333",
                        width: 40,
                        align: "center",
                        padding: [0, 10, 0, 0]
                      }
                    }
                  }
                }
              },
              { value: 535, name: "都市" },
              { value: 510, name: "神话" },
              { value: 634, name: "玄幻" },
              { value: 735, name: "历史" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted() {
    this.drawChart();
  }
};
</script>
<style lang="">
</style>