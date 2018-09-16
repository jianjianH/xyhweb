<template>
  <div class="centerView2">
    <div class="WXtop">
        <img src="http://pb0geuvxr.bkt.clouddn.com/mp/xyhweb/donation/ganen.png">
    </div>
    <div class="WXbody">
        <div class="WXDescrible">纪念母校复校40周年、95周年</div>
        <div class="WXtit">
            <div class="WXtitlis">姓名</div>
            <div class="WXtitlis">入学年级</div>
            <div class="WXtitlis">捐赠金额</div>
            <div class="WXtitlis">捐赠时间</div>
        </div>
        <div id="WXCon">
            <ul class="WXCon-list"  v-for="donate in donates" :key="donate.name">
                  <li class="WXCon-lis clear">
                      <div class="WXtitlis1">{{donate.name}}</div>
                      <div class="WXtitlis1">{{donate.grade}}</div>
                      <div class="WXtitlis1">{{donate.money}}</div>
                      <div class="WXtitlis1">{{donate.date}}</div>
                  </li>
            </ul>
        </div>
        <div v-if="show_error" class="net_error">
            <p>服务器异常</p>
            <p>请联系坚坚老师处理</p>
            <p>电话：15650705562</p>
            <p>微信：506177837</p>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      donates: undefined,
      show_error: false
    };
  },
  created() {
    this.initData();
  },
  methods: {
    /**
     * 获取捐款名单
     * https://www.jcbjxyh.cn/v1/donate/getDonateList
     */
    initData: function() {
        this.getDonateList().then(data => {
            this.donates = data;
        });
    },
    getDonateList: function() {
      let that = this;
      return axios
        // .get("/v1/donate/getDonateList")
        .get("https://www.jcbjxyh.cn/v1/donate/getDonateList")
        .then(function(response) {
            if(response.data.result === 1){
                return response.data.data;
            }else{
              that.show_error = true
            }
        })
        .catch(function(error) {
          console.log(error);
          that.show_error = true
        });
    },
    startmarquee: function(lh, speed, delay) {
      var t;
      var oHeight =
        6 * document.documentElement.style.fontSize; /** 6rem的高度 **/
      var p = false;
      var o = document.getElementById("WXCon");
      var preTop = 0;
      o.scrollTop = 0;
      function start() {
        t = setInterval(scrolling, speed);
        o.scrollTop += 1;
        // o.scrollTop = 100;
      }
      function scrolling() {
        if (
          o.scrollTop % lh != 0 &&
          o.scrollTop % (o.scrollHeight - oHeight - 1) != 0
        ) {
          preTop = o.scrollTop;
          o.scrollTop += 1;
          if (preTop >= o.scrollHeight || preTop == o.scrollTop) {
            o.scrollTop = 0;
          }
        } else {
          clearInterval(t);
          setTimeout(start, delay);
        }
      }
      setTimeout(start, delay);
    }
  },
  mounted() {
    this.startmarquee(20, 40, 50);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "./flexslider.css";
@import "./style.css";
</style>
