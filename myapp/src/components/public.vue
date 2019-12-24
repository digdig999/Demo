<template>
  <div>
    <el-container>
      <el-header style="text-align: right; font-size: 12px ;">
        <div class="title" style="color:#fff">图书管理系统</div>
        <div class="right">
          <div class="head"></div>
          <el-button
            type="primary"
            style="width:82px; height:28px; padding: 7px 15px"
            @click="exit"
          >退出登录</el-button>
          <span>欢迎你，admin</span>
        </div>
      </el-header>
      <el-container style="margin-top:60px; width: 100%; height: 100%; position:fixed">
        <el-aside width="200px" style="background-color: #30333b">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                :default-active="this.$route.fullPath"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#30333b"
                text-color="#fff"
                active-text-color="#ffd04b"
                router
              >
                <el-menu-item index="/index">
                  <i class="el-icon-location"></i>
                  <span slot="title">图书信息</span>
                </el-menu-item>
                <el-menu-item index="/borrow">
                  <i class="el-icon-menu"></i>
                  <span slot="title">借阅信息</span>
                </el-menu-item>
                <el-menu-item index="/user">
                  <i class="el-icon-document"></i>
                  <span slot="title">用户管理</span>
                </el-menu-item>
                <el-menu-item index="/vindicate">
                  <i class="el-icon-setting"></i>
                  <span slot="title">系统维护</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main style="width:100%; flex:1">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    //退出登录
    exit() {
      this.$http({
        url:"/api/exit",
      }).then((res)=>{
        console.log(res,"退出成功")
      }).catch((err)=>{
        console.log(err,"退出失败")
      })
      this.$router.push("/login")
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {}
};
</script>
<style lang="" scoped>
.class {
  position: relative;
}
.el-header {
  background-color: #27292d;
  color: #fff;
  line-height: 60px;
  white-space: nowrap;
}
.el-header .title {
  font-size: 14px;
  position: absolute;
}
.el-header .right {
  display: flex;
  height: 60px;
  margin-right: 10px;
  justify-content: flex-end;
  align-items: center;
}
.el-header .right .head {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: url(../assets/item.jpg) no-repeat;
  background-size: 40px 40px;
  margin: 10px;
}
.el-header .right span {
  margin-left: 10px;
  line-height: 60px;
}
</style>