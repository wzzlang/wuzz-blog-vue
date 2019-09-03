<template>
  <div class="len-edit">
    <div>
      <input class="edit-title" v-model="article.title" placeholder="标题"/>
    </div>

    <div content="edit-context">
      <vue-editor
        useCustomImageHandler
        v-model="article.content"
        @imageAdded="handleImageAdded"
      ></vue-editor>
      <div>
        <span style="font-size: 15px">文章类别</span>
        <div style="height: 100px;width:40%;border: 1px solid lightsteelblue;overflow: auto;margin-top: 10px">
          <CheckboxGroup size="large" style="margin-top:10px;margin-left: 10px;" v-model="checkCategory">
            <Checkbox v-for="(cate,index) in category" :key="index"
                      :label="cate.name"></Checkbox>
          </CheckboxGroup>
        </div>
      </div>
      <div style="min-height: 100px">
        <span style="font-size: 15px">文章标签</span>

        <Input v-model="currentVal" search style="width: 200px" enter-button="添加" placeholder="请输入标签"
               @on-search="addTag"/>
        <div style="height: 100px;width:40%;border: 1px solid lightsteelblue;overflow: auto;margin-top: 20px">
          <Tag @on-close="removeTag" closable color="success" style="margin-top: 10px"
               :key="index" :name="tag"
               v-for="(tag,index) in tags"
          >{{tag}}
          </Tag>
        </div>
      </div>
      <div>

      </div>
      <span style="font-size: 15px">是否置顶</span>
      <div>
        <i-switch size="large" v-model="isTop">
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-switch>
      </div>
      <div style="min-height: 200px">
        <Button @click="editArticle" type="success" style="width: 30%" :loading="disabled">存稿</Button>
        <Button @click="addArticle" type="success" style="width: 55%" :loading="disabled">发表</Button>
        <Button @click="closeThis" type="warning" style="width: 10%":loading="disabled">关闭</Button>
      </div>
      <Spin size="small" fix="true" v-if="loading"></Spin>
    </div>

    <Modal
      v-model="editImg"
      title="图片编辑"
      width="60%"
      @on-ok="imgOk"
      >
<div>
  <Button type="primary"  @click="changeScale(1)"> + </Button>
  <Button type="primary"  @click="changeScale(-1)"> - </Button>
  <Button type="primary"  @click="rotateLeft">左旋转</Button>
  <Button type="primary"  @click="rotateRight">右旋转</Button>
  <Button type="primary"  @click="refreshCrop">刷新</Button>
</div>
    <div class="img-edit" style="width: 700px;height: 450px;">
      <vue-cropper
        ref="cropper"
        :img="option.img"
        :outputSize="option.size"
        :outputType="option.outputType"
        :info="true"
        :full="option.full"
        :canMove="option.canMove"
        :canMoveBox="option.canMoveBox"
        :fixedBox="option.fixedBox"
        :original="option.original"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :centerBox="option.centerBox"
        :high="option.high"
      >

      </vue-cropper></div>
    </Modal>

  </div>
</template>
<script>
  import {VueEditor} from 'vue2-editor'
  import Bus from '@/store/bus.js'
  export default {
    components: {VueEditor},
    data() {
      return {
        article: {
          id: '',
          code: '',
          title: '',
          content: '',
          topNum: 0,
        },
        option: {
          img: "",
          size: 1,
          full: false,
          outputType: "png",
          canMove: true,
          fixedBox: false,
          original: false,
          canMoveBox: true,
          autoCrop: true,
          autoCropWidth: 500,
          autoCropHeight: 400,
          centerBox: false,
          high: true,
          cropData: {}
        },
        isTop:false,
        title: '',
        content: '',
        category: [],
        checkCategory: [],
        tags: [],
        currentVal: '',
        lenEdit: undefined,
        loading:false,
        disabled:false,
        editImg:false,
        Editor:undefined,
        cursorLocation:undefined,
      }
    },
    methods: {
      changeScale(num) {
        num = num || 1;
        this.$refs.cropper.changeScale(num);
      },
      rotateLeft() {
        this.$refs.cropper.rotateLeft();
      },
      rotateRight() {
        this.$refs.cropper.rotateRight();
      },
      refreshCrop() {
        this.$refs.cropper.refresh();
      },
      imgOk(){
        this.$refs.cropper.getCropBlob(data => {
        this.imgAdd(data,this.Editor,this.cursorLocation);
        });
      },
      init() {
        let id = this.$route.params.id;
        if (id !== 'add') {
          this.getArticleDetail();
        }
      },
      handleScroll() {
      },
      getArticleDetail() {
        this.$http.get(`api/blog-admin/article/getDetail/${this.$route.params.id}`, {}).then(resp => {
          let data = resp.data.data;

          this.article = data.article;
          this.isTop=this.article.topNum>0;
          this.tags = data.tags;
          let exists = data.category;

          this.checkCategory = this.category.filter(ss => exists.indexOf(ss.id) > -1);
          this.checkCategory = this.checkCategory.map((it) => it.name);
        });
      },
      getCategory() {
        this.$http.get('api/blog-admin/article/getCategory').then(resp => {
          this.category = resp.data.data;
        });
      },
      imgAdd(file,Editor,cursorLocation){
        let files = new FormData();
        files.append('file', file);
        this.$http.post('api/blog-admin/article/addImage', files)
          .then(response => {
            Editor.insertEmbed(cursorLocation, 'image', response.data.data);
          })
          .then(res => {
          }).catch(res => {
          this.$Message.error("上传失败");
        })
      },
      handleImageAdded(file, Editor, cursorLocation) {
        this.Editor=Editor;
        this.cursorLocation=cursorLocation;
        console.log(cursorLocation);
        let reader = new FileReader();
        reader.onload = e => {
            this.option.img =  e.target.result;
            this.editImg=true;
        };
        reader.readAsDataURL(file);
      },
      addTag() {
        if (this.currentVal) {
          const index = this.tags.indexOf(this.currentVal.trim());
          if (index !== -1) {
            this.$Message.error('此标签名称已存在,请勿重复添加');
            return;
          }
          this.tags.push(this.currentVal);
          this.currentVal = '';
        } else {
          this.$Message.error('请填写标签')
        }
      },
      removeTag(event, name) {
        const index = this.tags.indexOf(name);
        this.tags.splice(index, 1);
      },
      editArticle() {

      },
      addArticle() {
        if (!this.article.title.trim()) {
          this.$Message.error('请填写文章标题');
          return;
        } else if (!this.article.content) {
          this.$Message.error('请填写内容');
          return;
        }
        let cc = this.checkCategory;
        if (cc.length === 0) {
          this.$Message.error('请选择分类');
          return;
        }
        if (this.tags.length === 0) {
          this.$Message.error('请选择标签');
          return;
        }
        let cate = this.category.filter(cate => cc.indexOf(cate.name) > -1);
        cate = cate.map((it) => it.id);
        console.log(this.article);

        if (this.isTop) {
          this.article.topNum = 1;
        } else {
          this.article.topNum = 0;
        }
        let data = {
          article: this.article,
          category: cate,
          tags: this.tags,

        };
        //data=this.$qs.stringify(data);
        this.loading=true;
        this.disabled=true;
        if (this.article.id !== '') {
          //更新
          this.$http.post('api/blog-admin/article/update', data).then(resp => {
            let data = resp.data.msg;
            this.loading=false;
            this.$Message.success(`${data}-即将关闭此页`);
            setTimeout(() => {
              this.disabled=false;
              Bus.$emit('closeCurrentTag', this.$route.path)
            }, 3000);
          });
        } else {
          this.$http.post('api/blog-admin/article/add', data).then(resp => {
            let data = resp.data.msg;
            this.loading=false;
            this.$Message.success(`${data}-即将关闭此页`);
            setTimeout(() => {
              this.disabled=false;
              Bus.$emit('closeCurrentTag', this.$route.path)
            }, 3000);
          });
        }

      },
      closeThis() {
        this.$Modal.confirm({
          title: '提示',
          content: '确定关闭此页?',
          onOk: () => {
            Bus.$emit('closeCurrentTag', this.$route.path)
          },
          onCancel: () => {
          }
        });
      }
    },
    created() {
      this.getCategory();
      this.init();
    },
    mounted() {

    }

  }
</script>
<style>
 /* @import "../../../../../static/css/quill.snow.css";
  @import "../../../../../static/css/quill.core.css";
  @import "../../../../../static/css/quill.bubble.css";*/
</style>
<style scoped>
  div {
    margin-top: 30px;
  }

  .len-edit {
    margin: 50px 40px 50px 40px;

  }

  .edit-title {
    border: 0;
    border-bottom: 1px solid gray;
    outline: none;
    font-size: 30px;
    width: 100%;
  }

  .edit-title:hover {
    border-bottom: 1px solid dodgerblue;
  }
</style>
