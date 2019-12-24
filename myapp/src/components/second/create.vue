<template>
  <div id="box">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="图书名称">
        <el-input v-model="form.name" style="width: 40%;"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.writer" style="width: 40%;"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="form.price" style="width: 40%;"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="form.classify" placeholder="请选择书籍分类">
          <el-option label="文学" value="文学"></el-option>
          <el-option label="都市" value="都市"></el-option>
          <el-option label="神话" value="神话"></el-option>
          <el-option label="玄幻" value="玄幻"></el-option>
          <el-option label="历史" value="历史"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上架时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.time" style="width: 50%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" v-show="!isShow">立即创建</el-button>
        <el-button type="primary" @click="update" v-show="isShow">立即修改</el-button>
        <el-button @click="getBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      fileList: "",
      form: {
        number: parseInt(Math.random() * 8999 + 1000),
        name: "",
        writer: "",
        price: "",
        classify: "",
        time: ""
      }
    };
  },
  mounted() {
    //根据传来的sessionStorageh值判断是创建还是修改
    this.isShow = sessionStorage.getItem("isShow");
    this.fileList = JSON.parse(sessionStorage.getItem("filelist"));
    console.log(this.fileList, "11111");
    if (this.isShow == "true") {
      //进来显示修改界面，给input框填入内容
      this.isShow = true;
      this.form.name = this.fileList.name;
      this.form.writer = this.fileList.writer;
      this.form.price = this.fileList.price;
      this.form.classify = this.fileList.classify;
      this.form.time = this.fileList.time;
    } else {
      //进来显示新增界面
      this.isShow = false;
    }
  },
  methods: {
    //修改
    update(index) {
      this.$http({
        url: "/api/updateDevice",
        params: {
          number: this.form.number,
          name: this.form.name,
          writer: this.form.writer,
          price: this.form.price,
          classify: this.form.classify,
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
            this.$router.push("/index");
          } else {
            this.$message({
              message: res.data.info,
              type: "error"
            });
          }
        })
        .catch(err => {});
    },
    //新增
    onSubmit() {
      // console.log(this.form, "zhong");
      this.$http({
        url: "/api/addDevice",
        params: {
          number: this.form.number,
          name: this.form.name,
          writer: this.form.writer,
          price: this.form.price,
          classify: this.form.classify,
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
            this.$router.push("/index");
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
</style>