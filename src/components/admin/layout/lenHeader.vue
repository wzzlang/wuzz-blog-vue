<template>
  <div>
    <Row>
      <Col span="23">
      <Icon @click.native="coll" :class="rotateIcon" :style="{margin: '0 15px'}" type="md-menu"
            size="24"/>
      <span>首页/{{$store.state.lenTabs}}||<span @click="addTag">添加标签</span></span>
      </Col>
      <Col span="1">
      <Dropdown>
        <a href="javascript:void(0)">
          <Avatar size="large"
                  src="http://wx1.sinaimg.cn/mw690/0060lm7Tly1fv3mclni9ij30xc0xc41p.jpg"/>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem>修改资料</DropdownItem>
          <DropdownItem>
            <div @click="logout">退出</div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    props: ['isCollapsed'],
    data() {
      return {
        count: 0,
      }
    },
    methods: {
      addTag() {
        this.$store.dispatch('add_tag', {path: '/article/article1/' + this.count, name: `新标签${this.count}`})
        /*非自定义标签名称可去掉上面代码*/
        this.$router.push({path: '/article/article1/' + this.count});
        this.count++;
      },
      coll() {
        this.$emit('collapsedSider')
      },
      logout() {
        localStorage.removeItem('auth');
        this.$Message.success('退出成功!');
        setTimeout(() => {
          this.$router.push('/login')
        }, 1500);
      }
    },
    computed: {
      rotateIcon() {
        return [
          'menu-icon',
          this.isCollapsed ? 'rotate-icon' : ''
        ];
      },
    },
  }
</script>

<style scoped>
  .rotate-icon {
    transform: rotate(-90deg);
  }

  .collapsed-menu span {
    width: 0;
    transition: width .2s ease;
  }

  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
</style>
