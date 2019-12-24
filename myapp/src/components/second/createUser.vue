<template>
  <div id="box">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" style="width: 40%;"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" style="width: 40%;"></el-input>
      </el-form-item>
      <el-radio v-model="form.radio" label="1">男</el-radio>
      <el-radio v-model="form.radio" label="2">女</el-radio>
      <el-form-item label="电话">
        <el-input v-model="form.tel" style="width: 40%;"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" style="width: 40%;"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="form.idx" style="width: 40%;"></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.time" style="width: 50%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" v-show="!userShow">立即创建</el-button>
        <el-button type="primary" @click="update" v-show="userShow">立即修改</el-button>
        <el-button @click="getBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userShow: false,
      form: {
        username: "",
        password: "",
        radio: "1",
        tel: "",
        email: "",
        idx: "",
        time: ""
      }
    };
  },
  mounted() {
    //根据传来的sessionStorageh值判断是创建还是修改
    this.userShow = sessionStorage.getItem("userShow");
    this.userList = JSON.parse(sessionStorage.getItem("userList"));
    console.log(this.userList, "11111");
    if (this.userShow == "true") {
      //进来显示修改界面，给input框填入内容
      this.userShow = true;
      this.form.username = this.userList.name;
      this.form.password = this.userList.pass;
      this.form.radio = this.userList.sex == "男" ? "1" : "2";
      this.form.tel = this.userList.tel;
      this.form.email = this.userList.email;
      this.form.idx = this.userList.idx;
      this.form.time = this.userList.time;
    } else {
      //进来显示新增界面
      this.userShow = false;
    }
  },
  methods: {
    //修改
    update(index) {
      console.log(this.form,"123456")
      this.$http({
        url: "/api/updateUser",
        params: {
          username: this.form.username,
          password: this.form.password,
          radio: this.form.radio,
          tel: this.form.tel,
          email: this.form.email,
          idx: this.form.idx,
          time: this.form.time
        }
      })
        .then(res => {
          console.log(res, "res");
          if (res.data.code == 0) {
            this.$message({
              message: res.data.info,
              type: "success"
            });
            this.$router.push("/user");
          } else {
            this.$message({
              message: res.data.info,
              type: "error"
            });
          }
        })
        .catch(err => {});
    },
    onSubmit() {
      console.log(this.form, "zhong");
      this.$http({
        url: "/api/addUser",
        params: {
          username: this.form.username,
          password: this.form.password,
          radio: this.form.radio,
          phone: this.form.tel,
          email: this.form.email,
          IDNumber: this.form.idx,
          time: this.form.time
        }
      })
        .then(res => {
          console.log(res, "res");
          if (res.data.code == 0) {
            this.$message({
              message: res.data.info,
              type: "success"
            });
            this.$router.push("/user");
          } else {
            this.$message({
              message: res.data.info,
              type: "error"
            });
          }
        })
        .catch(err => {});
    },
    //返回上一层
    getBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="" scoped>
#box {
  flex: 1;
}
.el-radio {
  margin-bottom: 10px;
  margin-left: 85px;
}
</style>