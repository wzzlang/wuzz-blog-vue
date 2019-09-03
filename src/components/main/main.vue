<template>
  <div class="blog-context">
    <ul>
      <li :key="index" v-for="(list,index) in articleList" class="one">
        <Card class="card">
          <lenSvg :isShow="list.topNum>0"/>
          <div class="blog-title" @click="detail(list.code)">
            <h3>{{list.title}}</h3>
          </div>
          <p class="time">作者：<span>{{list.createName}}</span> • {{dateFilter(list.createDate)}}</p>
          <!--<p class="cot">{{list.content}}</p>-->
          <div class="pic">
            <img v-if="list.firstImg==null" src="../../../static/image/default.png"/>
            <img style="" v-else="list.firstImg!=null" :src="list.firstImg"/>
          </div>
        </Card>
      </li>
    </ul>
    <div style="background: white;margin-top: 10px;width: 100%;border: 1px solid #ececec;">
    <Page :current="currentPage" :total="total" :page-size="pageSize" @on-change="changePage" show-total></Page>
    </div>


  </div>
</template>


<script>
  import {parseTime} from '@/util/date'
  import lenSvg from '../svg/index'

  export default {
    components:{lenSvg},
    data() {
      return {
        msg: 'zxm',
        message: [],
        datas: [
          {
            id: 1,
            name: '标题1'
          }, {
            id: 2,
            name: '标题2'
          }
        ],
        articleList: [],
        total: 0,
        currentPage: 1,
        pageSize: 20,
        value1: 0,
        param: '',
      }
    },
    created() {
      this.initArticle();
    },
    computed: {
      code: function () {
        return this.$route.params.code
      }
    },

    methods: {
      initArticle() {
        let page=this.$route.params.page;
        if(page!==undefined&&!isNaN(Number(page))){
          this.currentPage=Number(page);
        }
        this.$http.get('api/blog/article/list', {
          params: {
            page: this.currentPage, limit: this.pageSize
          },
        }).then(resp => {
          this.articleList = resp.data.data;
          this.total = resp.data.count;
         // this.currentPage = resp.data.currentPage;
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
          this.$router.push(`/index`)
        }else{
          this.$router.push(`/index/${page}`)
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

    watch: {}
  }
</script>
<style scoped>
  @import '../../../static/css/blog-context.css';
</style>
