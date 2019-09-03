<template>
  <div id="admin">
    <div class="layout">
      <Layout>
        <!--top导航-->
        <Sider ref="sides" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
          <siderItem :router="router" :menuClass="menuitemClasses"/>
        </Sider>
        <Layout>
          <!--左侧菜单-->
          <Header :style="{padding: 0}" class="layout-header-bar">
            <len-header :isCollapsed="isCollapsed" @collapsedSider="collapsedSider"/>
          </Header>
          <Content :style="{margin: '0px',border:'1px solid gray', background: '#fff', minHeight: height}">
            <!--中间标签-->
            <len-tag/>
            <!--活动区域-->
            <div class="len-context" :style="{height:bodyHeight}">
              <router-view/>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  </div>
</template>

<script>
  import lenHeader from './lenHeader'
  import adminTab from './tab'
  import siderItem from './siderItem'
  import lenTag from './tag'

  export default {
    name: "index",
    components: {
      lenHeader,adminTab, siderItem, lenTag
    },
    data() {
      return {
        router: [],
        isCollapsed: false,
        height: document.documentElement.clientHeight - 66 + 'px',
        bodyHeight: document.documentElement.clientHeight-120 + 'px',
      }
    },
    computed: {
      menuitemClasses() {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      }
    },
    created() {
      this.router = this.$router.options.routes;
    },
    methods: {
      collapsedSider() {
        this.$refs.sides.toggleCollapse();
      },
    }
  }
</script>

<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    border-radius: 4px;
    overflow: hidden;

  }
  .layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .len-context{
    margin:5px 10px 0 10px;
    width:100%;
    overflow-y:scroll;
    overflow-x:auto;
  }

</style>
