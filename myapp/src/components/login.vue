<template>
  <div id="box">
    <div class="box">
      <div class="boxMain">
        <h3>图书管理系统</h3>
        <el-select v-model="keys.type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input v-model="keys.name" placeholder="请输入内容"></el-input>
        <el-input placeholder="请输入密码" v-model="keys.pass" show-password></el-input>
        <el-row>
          <el-button type="primary" @click="login()">登录</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keys: {
        name: "",
        pass: "",
        type: ""
      },
      options: [
        {
          value: "0",
          label: "超级管理员"
        },
        {
          value: "1",
          label: "管理员"
        },
        {
          value: "2",
          label: "成员"
        }
      ]
    };
  },
  methods: {
    login() {
      console.log(this.keys, 11111);
      //调用登录接口，解决跨域问题
      this.$http({
        // url:'http://localhost:3000/login',
        url: "/api/login",
        method: "post",
        data: this.keys
      })
        .then(res => {
          console.log(res, "res");
          if (res.data.code == 0) {
            this.$message({
              message: res.data.info,
              type: "success"
            });
            this.$router.push("/index");
          } else {
            this.$message({
              message: res.data.info,
              type: "error"
            });
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="" scoped>
.box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url(../assets/banner.jpg) no-repeat;
  background-size: 100%;
  position: fixed;
}
.boxMain {
  width: 500px;
  height: 300px;
  margin: 100px auto;
  background: rgba(245,245,245,.4);
  padding: 10px;
  border-radius: 10px;
}
h3 {
  text-align: center;
  font-size: 20px;
  line-height: 40px;
}
.el-select {
  margin: 15px auto;
  display: block;
  width: 80%;
}
.el-input {
  margin: 15px auto;
  display: block;
  width: 80%;
}
.el-button {
  width: 60%;
  display: block;
  margin: 20px auto;
}
</style>