<template>
  <Row>
    <div class="len-tag">
      <Col span="23">
      <div class="lab">
        <div class="pro-tag" id="pro-tag">
          <div :style="{left:left+'px',position: 'absolute'}">
            <router-link v-for="(view,index) in $store.state.tagList" :key="index" :to="view.path">
              <Tag type="dot" :name="view.path"
                   :color="currentTag(view)? 'success' : ''">
                <span :style="{color: currentTag(view)?'#19be6b':'black'}">{{view.name}}</span>
                <!--这里要阻止冒泡-->
                <Icon type="ios-close" @click.prevent.stop="closeCurrentTag(view.path)"/>
              </Tag>
            </router-link>
          </div>
        </div>
      </div>
      </Col>
      <Col span="1">
      <div class="len-select-tag">
        <Dropdown @on-click="changeThis" trigger="click" style="margin-left: 0px;">
          <Button type="primary">
            操作
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="closeCurrent">关闭当前</DropdownItem>
            <DropdownItem name="closeOther">关闭其他</DropdownItem>
            <DropdownItem name="closeAll">关闭所有</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      </Col>
    </div>
  </Row>

</template>

<script>
  import Bus from '@/store/bus.js'
  export default {
    data() {
      return {
        tagList: [],
        left: 10,
        current: {},
      }
    },
    methods: {
      getRoute() {
        if (this.$route.name) {
          return this.$route;
        }
        return false;
      },
      addTag() {
        const route = this.getRoute();
        if (route) {
          let tag = {path: route.path, name: route.meta};
          this.$store.dispatch('add_tag', tag);
        }
      },
      currentTag(view) {
        if (view.path === this.$route.path) {
          this.current = view;
          this.$store.state.lenTabs = view.name;
          return true;
        }
        return false;
      },
      closeCurrentTag(name) {
        this.$store.dispatch("del_tag", name);
        const tag = this.$store.state.tagList.slice(-1)[0];
        if (tag) {
          if (this.$route.path === name)
            this.$router.push(tag.path);
        } else {
          this.$router.push('/');
        }
      },
      closeOther(view) {
        this.$store.dispatch("del_other", view);
      },
      closeAll() {
        this.$store.dispatch("del_all");
        this.$router.push('/');
      },
      changeThis(name) {
        switch (name) {
          case 'closeCurrent':
            this.closeCurrentTag(this.current.path);
            break;
          case  'closeOther':
            this.closeOther(this.current);
            break;
          case 'closeAll':
            this.closeAll();
            break;
        }
      },
    },
    mounted(){
      let _this = this;
      Bus.$on('closeCurrentTag', (e) => {
        _this.message = e;
        this.closeCurrentTag(e);
      })
    },
    created() {
      this.addTag();
    }
    ,
    watch: {
      $route() {
        this.addTag();
      }
    }
  }
</script>

<style scoped>
  .pro-tag {
    border-bottom: 1px solid #dcdee2;
    overflow-y: hidden;
    position: relative;
    white-space: nowrap;
    width: 100%;
    height: 40px;
  }

  .pro-tag::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  .pro-tag::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  .pro-tag::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  .tag-options {
    float: right;
  }

  .len-tag {
    position: relative;
  }

  .lab {
    border-right: 1px solid rgba(0, 0, 0, .1);;
  }

  .len-select-tag {
    margin-top: 5%;
  }
</style>
