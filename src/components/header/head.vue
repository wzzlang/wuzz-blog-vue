<template>
  <div class="len-header">
    <div>
        <div @click="goIndex()" class="logo"></div>
    <div class="menu">
        <Menu mode="horizontal" theme="light" active-name="1">
          <div v-for="me in menuArr">
            <MenuItem :name=me.arr @click.native="toList(me.code)">
                <!--<Icon></Icon>--><!--type="ios-paper" 图标后期再处理-->
                {{me.menu}}
            </MenuItem>
          </div>
        </Menu>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        a: 1,
        theme1: 'light',
        menuArr: {},
      }
    },
    methods: {
      toIndex() {
        this.$router.push('/');
      },
      getHeader() {
        this.$http.get('api/blog/menu').then(response => {
          let arr = {};
          let data = response.data;
          for (let i in data) {
            let menu = {
              arr: 0,
              code: '',
              menu: ''
            };
            menu.arr = i;
            menu.code = data[i].code;
            menu.menu = data[i].name;
            arr[i] = menu;
          }
          this.menuArr = arr;
        });
      },
      init() {
        //标题
        this.getHeader();
      },
      toList(code) {
        this.$router.push("/category/" + code);
      },
      goIndex(){
        this.$router.push('/')
      },
    },
    mounted() {
      this.init();
    }
  }
</script>
<style>
  .len-header{
    background: white
  }
  .len-header .menu{
    margin-left: 35%
  }
  .len-header .logo{
    background: url("../../assets/logo.png") no-repeat;
    width: 150px;
    height: 60px;
    position: absolute;left:15%;top:-1%;
  }

  @media screen and (max-width: 768px) {
    .len-header .menu{
      width:90%;
      margin:0 auto;
      /*margin-left: 15%;*/
      /*border:1px solid red;*/
    }
    .len-header .logo{
      /*background: url("../../assets/logo.png") no-repeat;
      width: 150px;
      height: 55px;*/
      position: relative;left:50%;top:-1%;
      margin-left:-75px;

    }
    .ivu-menu-light{
      /*border:1px solid red;*/
      margin:0 auto;

    }
    .ivu-menu-light li{
      text-align: center;
      /*border:1px solid red;*/
      width:25%;
    }
  }
</style>
<style scoped>
  .ivu-menu-horizontal.ivu-menu-light:after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: white;
    position: absolute;
    bottom: 0;
    left: 0;
  }


</style>
