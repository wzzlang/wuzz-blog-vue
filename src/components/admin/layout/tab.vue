<template>
  <div id="tab">
    <Menu :theme="theme" active-name="1-2" width="auto" :class="menuitemClasses" @on-select="chage"
   >
      <MenuItem
        v-for="(item,index) in title"
        :key="index"
        :name="item.id"
        >
        <Icon type="ios-paper"/>
        <span>{{item.name}}</span>
      </MenuItem>

    </Menu>
  </div>
</template>

<script>
  export default {
    name: "tab",
    data() {
      return {
        theme: 'dark',
        isCollapsed: false,
        title: []
      }
    },
    created(){
      this.title=[
        {id:'',name:'首页'},
        {id:'article',name:'文章列表'},
        {id:'user',name:'用户列表'}
        ];
    },
    methods: {
      menuitemClasses() {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      },
      chage(id) {
       let _c= this.title.find((e) => {
          return e.id===id;
        });
        this.$emit('changeTabName', _c);
      }

    }
  }
</script>

<style scoped>
  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 70px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }

  .menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }

  li .ivu-menu-item i {
    transform: translateX(-10px);
  }
  .collapsed-menu span {
    width: 0px;
    transition: width .2s ease;
  }

  .collapsed-menu i {
    transform: translateX(7px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
  }
</style>
