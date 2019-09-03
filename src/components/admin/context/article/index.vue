<template>
  <div>
    <div class="len-table">
      <div class="len-search">
        <Form class="len-search-content" :model="searchList" inline label-position="right" :label-width="50">
          <FormItem label="标题">
            <Input v-model="searchList.title"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="getList()" icon="ios-search">搜索</Button>
            <Button style="margin-left: 8px" @click="clear()">重置</Button>
          </FormItem>
          <FormItem>
            <Button @click="create">新建</Button>
          </FormItem>
        </Form>
      </div>
      <div class="len-table-content">
        <Table border :columns="columns7" :data="data"></Table>
      </div>
      <div style="float: right">
        <Page :current="this.page" :page-size="this.size" :total="this.count"
              @on-change="changePage" @on-page-size-change="changeSize"
              show-total show-elevator show-sizer/>
      </div>
    </div>
    <!--<Modal
      v-model="edit"
      title="编辑"
      @on-ok="ok"
      @on-cancel="cancel">
      13
    </Modal>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        edit: false,
        searchList: {
          createBy: '',
          title: '',
        },
        disabled:true,
        columns7: [
          {
            title: 'code',
            key: 'code',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.code)
              ]);
            }
          },
          {
            title: '标题',
            key: 'title'
          },
          {
            title: '作者',
            key: 'createBy'
          }, {
            title: '创建时间',
            key: 'createDate',
          }, {
            title: '阅读数量',
            key: 'readNumber'
          }, {
            title: '次序',
            key: 'topNum'
          },
          {
            title: '操作',
            key: 'action',
            width: 180,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.editData(params.index);
                    }
                  },
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data: [],
        page: 0,
        size: 20,
        count: 0,
      }
    },
    methods: {
      create() {
        this.$store.dispatch('add_tag', {path: '/article/edit/add', name: '新建'})
        this.$router.push({path: '/article/edit/add'});
      },
      show(index) {
        this.$Modal.info({
          title: 'User Info',
          content: `Name：${this.data[index].name}<br>Age：${this.data[index].age}<br>Address：${this.data[index].address}`
        })
      },
      editData(index) {
        // this.edit=true;
        let title = this.data[index].title;
        title = title.substring(0, 8).concat('...');
        this.$store.dispatch('add_tag', {path: '/article/edit/' + this.data[index].code, name: title})
        this.$router.push({path: '/article/edit/' + this.data[index].code});
      },
      getList() {
        this.$http.get('api/blog-admin/article/getList', {
          params: {title:this.searchList.title,createBy:this.searchList.createBy,page: this.page, limit: this.size}
        }).then(resp => {
          let data = resp.data;
          this.data = data.data;
          this.page = data.pageNum;
          this.count = data.count;
        });
      },
      changePage(page) {
        this.page = page;
        this.getList();
      },
      changeSize(size) {
        this.size = size;
        this.getList();
      },
      remove(index) {
        this.$Modal.confirm({
          title: '删除操作',
          content: '确定删除?',
          onOk: () => {
            let id = this.data[index].id;
            let param = new URLSearchParams();
            param.append('id',id);
            this.$http.post('api/blog-admin/article/del', param).then(resp => {
              this.$Message.success(resp.data.msg);
              this.getList();
            });
          },
          onCancel: () => {
          }
        });

      },
      clear(){
        if(this.searchList.title!==''){
          this.searchList.title='';
          this.getList();
        }
      },
      cachedViews() {
        return ['article', 'user'];
      }
    },
    created() {
      this.getList();
    }
  }
</script>

<style scoped>
  .len-table {
    margin: 0 20px 0 20px;
  }

  .len-table-content {
    margin-top: 20px;
  }

  .len-search {
    border: 1px solid lightsteelblue;
    margin-top: 10px;
  }

  .len-search-content {
    margin-top: 15px;
  }
</style>
