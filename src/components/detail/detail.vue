<template>
  <div class="blog-home" v-if="!loading">

    <!--文章名称-->
    <div class="title-article">
     <!-- <transition name="fade">-->
        <h3>
          {{article.title}}
        </h3>
     <!-- </transition>-->
    </div>
    <!--发表信息-->
    <div>
      <p class="time">作者：<span>{{article.createName}}</span>
        • {{dateFilter(article.createDate)}} </p>
<!--      阅读次数：{{article.readNumber}}-->
      <p>
        标签：
        <span :key="index" v-for="(tag,index) in tags">
                    <Tag :name="tag">{{tag}}</Tag>
                </span>
      </p>
    </div>
    <!--标签-->

    <div class="text-context len-context-detail">
      <ul>
        <!--内容-->
        <li>
          <div id="quill-container" class="ql-snow">
            <div class="ql-editor" v-html='article.content'>
            </div>
            <Spin size="large" fix v-if="loading"></Spin>
          </div>
        </li>
        <!--pre next-->
        <li class="link">
          <p>
            <span>上一篇：</span>
            <span v-if="previous==null">没有了</span>
            <a v-else @click="goOther(previous.code)">{{previous.title}}</a>
          </p>
          <p>
            <span>下一篇：</span>
            <span v-if="next==null">没有了</span>
            <a v-else @click="goOther(next.code)">{{next.title}}</a>
          </p>
        </li>
      </ul>
    </div>
    <!--评论-->
    <!--<div class="comment">
      <h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最新评论</h5>
      <div class="com clearfix">
        <div class="pic"></div>
        <div class="tit">
          <ul>
            <li>作者你好:谢谢作者</li>
            <li>时间：2018-05-26 <a>回复</a></li>
          </ul>
        </div>
      </div>
      <div class="answer">
              <textarea placeholder="这是帮助文字">

              </textarea>
        <input type="submit" value="提交评论"/>
      </div>
    </div>-->
    <!--评论-->

  </div>
  <div v-else-if="!err">
    加载中。。。
  </div>
  <div v-else>
    <img src="../../../static/image/bd.gif"/>
    <div>404</div>
  </div>
</template>

<script>
  import blogHead from "../header/head"
  import blogRight from "../right/right"
  import blogBottom from "../bottom/bottom"
  import {parseTime} from '@/util/date'

  export default {
    components: {
      blogHead,
      blogRight,
      blogBottom,
    },
    data() {
      return {
        article: undefined,
        loading: true,
        err: false,
        previous: null,
        next: null,
        tags: [],
        transition:false
      }
    },
    computed: {
      route: function () {
        return this.$route.params.code
      }
    },
    methods: {
      init() {
        let code = this.$route.params.code
        this.$http.get(`api/blog/article/getDetail/${code}`).then(resp => {
          let data = resp.data.data;
          console.log(data);
          if (data == null) {
            this.article = null;
            this.loading = true;
            this.err = true;
            return;
          }
          this.article = data.article;
          this.previous = data.previous;
          this.next = data.next;
          this.tags = data.tags;
          this.loading = false;
          this.transition=true;
        }).catch(res => {

        });
      },
      index: function () {
        this.$router.push('/');
      },
      goOther(code) {
        this.$router.push({path: `/detail/${code}`});
      },
      dateFilter(t) {
        if (t) {
          return parseTime(t)
        } else {
          return '未知'
        }
      }
    },
    mounted() {
      this.init();
      window.scrollTo(0, 60);
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          this.init();
          window.scrollTo(0, 60);
        },
      }
    }
  }
</script>

<style>
  @import "../../../static/css/quill.snow.css";
  @import "../../../static/css/quill.core.css";
  @import "../../../static/css/quill.bubble.css";
  @import "../../../static/css/blog-detail.css";
</style>
<style scoped>
</style>

