<template>
  <div id="context" class="blog-context">

    <div v-show="articleList.length>0">
    <ul>
      <li :key="index" v-for="(list,index) in articleList" class="one">
        <div>
        <Card  class="card">
          <lenSvg :isShow="list.topNum>0"/>
          <div class="blog-title" @click="detail(list.code)">
            <h3>{{list.title}}</h3>
          </div>
          <p class="time">作者：<span>{{list.createName}}</span> • {{dateFilter(list.createDate)}}</p>
          <div class="pic">
            <img v-if="list.firstImg==null" src="../../../static/image/default.png"/>
            <img style="" v-else="list.firstImg!=null" :src="list.firstImg"/>
          </div>
        </Card>
        </div>
        <div>

        </div>
      </li>
    </ul>
    <Page :current="currentPage" :total="total" :page-size="pageSize" @on-change="changePage" show-total></Page>
    </div>
    <div style="min-height: 50px;margin-top: 50px" v-show="articleList.length===0&&!loading">
      <img src="../../../static/image/bd.gif"/>
      <div>啥也没有</div>
    </div>
   <!-- <div v-show="loading">
      <img src="../../../static/image/bd.gif"/>
    </div>-->

  </div>
</template>


<script>
  import {parseTime} from '@/util/date'
  import lenSvg from '../svg/index'
  export default {
    name: 'context',
    components:{lenSvg},
    data() {
      return {
        message: [],
        articleList: [],
        total: 0,
        currentPage: 1,
        pageSize: 2,
        value1: 0,
        param: '',
        loading:false,
      }
    },
    created() {
      this.initArticle();
    },
    // computed: {
    //   code: function () {
    //     return this.$route.params.code
    //   }
    // },

    methods: {
      initArticle() {
        this.loading=true;
        let page=this.$route.params.page;
        let code=this.$route.params.code;
        if(page!==undefined&&!isNaN(Number(page))){
          this.currentPage=Number(page);
        }
        this.$http.get(`api/blog/article/list/${code}`, {
          params: {
            page: this.currentPage, limit: 20
          },
        }).then(resp => {
          this.articleList = resp.data.data;
          this.total = resp.data.count;
          this.loading=false;
        }).catch(err => {
          this.$Message.error('加载数据失败!');
        });
      },
      detail(code) {
        this.$router.push(`/detail/${code}`)
      },
      changePage(page) {
        this.currentPage = page;
        if(page===1){
          this.$router.push(`/tag/${this.$route.params.code}`)
        }else{
          this.$router.push(`/tag/${this.$route.params.code}/${page}`)
        }
        this.initArticle();
      },
      selectHome: function () {
        this.$router.push('/detail/' + this.message);
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
    },

    watch: {
      $route: {
        handler: function (val, oldVal) {
          this.initArticle();
        },
      }
    }
  }
</script>
<style scoped>
  @import '../../../static/css/blog-context.css';
</style>
