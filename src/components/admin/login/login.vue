<template>
  <div id="login">
    <div class="context">
      <img src="https://file.iviewui.com/dist/2ecd3b0452aa197097d5131afacab7b8.png" height="85px" width="85px"/>

    </div>
    <div class="login">
      <div class="top">

      </div>
      <div class="center">
        <Input v-model="username" placeholder="用户名" style="width: 300px"/>
        <br/>
        <br/>
        <Input v-model="pass" type="password" placeholder="密码" style="width: 300px"/>
        <br/>
        <br/>
        <Button type="success"   @click="commit">登录</Button>
      </div>
      <div class="buttom">

      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        username: '',
        pass: ''
      }
    },
    created() {
      var _this = this;
      document.onkeydown = function(e) {
        var key = window.event.keyCode;
        if (key === 13) {
          _this.commit();
        }
      }
    },
    methods: {
      commit() {
        /* if(!/^[a-z1-9A-Z]{3,10}$/u.test(this.username)){
           this.$Message.error('用户名3-10位,不支持特殊字符');
           return;
         }*/
        if (this.username.trim() === '' || this.username.trim() == null) {
          this.$Message.error('用户名不能为空');
        } else if (this.pass.trim() === '' || this.pass.trim() == null) {
          this.$Message.error('密码不能为空');
        } else {
          this.$http({
            method: 'post',
            url: 'api/blogLogin',
            params: {username: this.username, password: this.pass}
          }).then(res => {
            let data = res.data;
            localStorage.setItem('auth', data.msg);
            this.$Message.success('登陆成功');
            setTimeout(() => {
              location.href = 'admin.html';
            }, 1200)
          }).catch(res => {
            this.$Message.error(res.msg);
          });
        }
      }
    },
    watch: {}
  }
</script>

<style scoped>

  .context {
    position: absolute;
    left: 100px;
    top: 50px;
  }

  .login {
    height: 200px;
    width: 400px;
    position: absolute;
    right: 200px;
    top: 200px;
    bottom: 150px;
    border-radius: 5px;
    margin: 0 auto;
    text-align: center;
    background: #666;
    min-height: 400px;
  }

  .top {
    height: 50px;
  }
</style>
