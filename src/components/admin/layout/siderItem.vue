<template>
  <div class="len-sider">
    <Menu theme="dark"  active-name="1-2" width="auto" :class="menuClass">
      <div v-for="(item,index) in router"  v-if="!item.hidden&&item.children" :key="index">
      <MenuItem :name="index" v-if="only(item.children)" :to="`${item.path}/${item.children[0].path}`">
        <Icon type="ios-paper"/>
        <span>{{item.children[0].meta}}</span>
      </MenuItem>
      <Submenu :name="index" v-else>
        <template slot="title">
          <Icon type="ios-paper"/>
          <span>{{item.meta}}</span>
        </template>
          <MenuItem :key="`${index}-${itIndex}`" :name="`${index}-${itIndex}`" v-for="(it,itIndex) in item.children" :to="`${item.path}/${it.path}`">
            <span>{{it.meta}}</span>
        </MenuItem>

      </Submenu>
      </div>
    </Menu>
  </div>
</template>

<script>
  export default {
    props: ['router','menuClass'],
    data() {
      return {
       // isCollapsed: false,
      }
    },
    methods: {
      only(item) {
        const num = item.filter(it => {
          return !it.hidden;
        });
        return num.length === 1;
      },
    },
    created() {
    }
  }
</script>

<style scoped>
.len-sider{

}
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

  .menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
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
