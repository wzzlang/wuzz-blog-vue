<template>
  <div id="blog-right">
    <div class="c-right">
      <ul>
        <li>
          <Tabs value="name1">
            <TabPane label="标签" name="name1">
              <span :key="index" v-for="(la,index) in label">
                    <Tag @click.native="showTagArticle(la.tagName)" :name="la.tagName"
                         :color="la.color">{{la.tagName}}</Tag>
                </span>
            </TabPane>
<!--            <TabPane label="阅读排行" name="name2">-->
<!--              <div style="text-align: left" :key="index" v-if="articles!=null" v-for="(article,index) in articles">-->

<!--                <a @click="showDetail(article.code)">-->
<!--                  <div style="height: 25px;width: 98%;margin:2px 0 0 5%;font-size: 15px">-->
<!--                    <span>{{article.title}}</span>-->
<!--                  </div>-->
<!--                </a>-->
<!--              </div>-->
<!--            </TabPane>-->
            <!--<TabPane label="标签三" name="name3">标签三的内容</TabPane>-->
          </Tabs>
        </li>
<!--        <li class="two">-->
<!--          <Tabs value="name2">-->
<!--            <TabPane label="推荐" name="name2">-->
<!--              <Carousel autoplay v-model="value1"-->
<!--                        :autoplay-speed="speed"-->
<!--                        loop>-->
<!--                <CarouselItem>-->
<!--                  <div class="demo-carousel">1</div>-->
<!--                </CarouselItem>-->
<!--                <CarouselItem>-->
<!--                  <div class="demo-carousel">2</div>-->
<!--                </CarouselItem>-->
<!--                <CarouselItem>-->
<!--                  <div class="demo-carousel">3</div>-->
<!--                </CarouselItem>-->
<!--                <CarouselItem>-->
<!--                  <div class="demo-carousel">4</div>-->
<!--                </CarouselItem>-->
<!--              </Carousel>-->

<!--              &lt;!&ndash; <Button @click="start">Start</Button>-->
<!--               <Button @click="finish">Finish</Button>-->
<!--               <Button @click="error">Error</Button>&ndash;&gt;-->
<!--            </TabPane>-->
<!--          </Tabs>-->
<!--        </li>-->
        <li class="two">
          <Tabs value="name1">
            <TabPane label="关于我" name="name1">
              <div class="aboutme">
                <h2 class="ab_title">关于我</h2>
                <div class="avatar">
                  <img
                    src="../../assets/22397648.png">
                </div>
                <div class="ab_con">
                  <p>姓名：吴占轴</p>
                  <p>职业：java工程师</p>
                  <p>github:<a target="_blank" href="https://github.com/wzzlang">wzzlang</a></p>
                  <p>简书:<a target="_blank" href="https://www.jianshu.com/u/a21e29be81d8">轴儿</a></p>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "blog-right",
    data() {
      return {
        value1: 1,
        speed: 4000,
        label: {},
        checkable: true,
        articles: []
      }
    },
    methods: {
      start() {
        this.$Loading.start();
      },
      finish() {
        this.$Loading.finish();
      },
      error() {
        this.$Loading.error();
      },
      init() {
        this.getLabel();
        this.getOrderArticle();
      },
      getLabel() {
        this.$http.get("/api/blog/getTag").then(res => {
          this.label = res.data;
        }).catch(error => {
          this.$Message.error('获取标签失败');
        })
      },
      getOrderArticle() {
        this.$http.get('/api/blog/article/list/order/read').then(res => {
          console.log(res)
          this.articles = res.data.data;
        }).catch(error => {
          this.$Message.error('获取阅读排行失败');
        })
      },
      showTagArticle(name) {
        this.$router.push({path: `/tag/${name}`});
      },
      showDetail(code) {
        this.$router.push({path: `/detail/${code}`});
      }
    },
    mounted() {
      this.init();
    }
  }
</script>

<style scoped>

  .aboutme {
    background: #FFF;
    border-radius: 10px;
    overflow: hidden;
  }

  .ab_title {
    text-align: center;
    position: relative;
    margin: 20px;
  }

  .ab_title:before {
    content: "";
    width: 25%;
    height: 2px;
    background: #000;
    position: absolute;
    left: 0;
    bottom: 8px;
  }

  .ab_title:after {
    content: "";
    width: 25%;
    height: 2px;
    background: #000;
    position: absolute;
    right: 0;
    bottom: 8px;
  }

  .avatar {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 50px;
    margin: auto;
  }

  .avatar img {
    width: 100px;
    height: 100px;
  }

  img {
    border: 0;
    display: block;
  }

  .ab_con {
    line-height: 30px;
    padding: 10px;
  }
  .demo-carousel {
    height: 200px;
    line-height: 200px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    background: #5fe1ff;
  }

  .c-right {
    width: 35%;
    height: auto;
    float: right;
  }

  .c-right ul li {
    list-style: none;
    width: 100%;
    height: auto;
    min-height: 200px;
    background: #fff;
    border: 0px solid red;
    margin-top: 10px;
  }

  @media screen and (max-width: 768px) {
    .c-right {
      width: 100%;
      height: auto;
      float: right;
    }

    .c-right ul li {
      width: 100%;
      height: auto;
      background: #fff;
      margin-top: 10px;
    }

  }
</style>
