<template>
  <div>
    <div class="top">
      <el-button type="primary" @click="create">新建</el-button>
      <div>
        <input type="text" @change="dimFind"/>
        <el-button type="primary">查询</el-button>
      </div>
    </div>
    <div class="block">
      <el-table :data="userList">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="tel" label="电话"></el-table-column>
        <el-table-column prop="email" label="email"></el-table-column>
        <el-table-column prop="idx" label="身份证号"></el-table-column>
        <el-table-column prop="time" label="创建时间"></el-table-column>
        <el-table-column prop label="操作" width="200px">
          <template slot-scope="scope">
            <el-button size="mini" @click="updateUser(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="delUser(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-size="5"
        layout="total, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [],
      currentPage4: 1,
      fileList: "",
      value: "",
      page: 5,
      count: 0
    };
  },
  mounted() {
    this.$http({
      url: "/api/findUser"
    })
      .then(res => {
        console.log(res, "查询用户成功");
        this.userList = [];
        res.data.data.map((item, index) => {
          if (index >= 0 && index < 5) {
            //得到数据库里的数据
            this.userList.push(item);
          }
        });
        //总条数
        this.count = res.data.data.length;
      })
      .catch(err => {
        console.log(err, "查询图书失败2222");
      });
  },
  methods: {
    //模糊查询
    dimFind() {
      this.$http({
        url: "/api/findDevice"
      })
        .then(res => {
          console.log(res, "查询图书成功");
          this.userList = [];
          res.data.data.map((item, index) => {
            if (item.name.indexOf(this.value) != -1||item.writer.indexOf(this.value) != -1) {
              this.userList.push(item);
            }
          });
          this.value = "";
        })
        .catch(err => {
          console.log(err, "查询图书失败");
        });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //根据页数判断数据
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$http({
        url: "/api/findDevice"
      })
        .then(res => {
          // console.log(res, "查询图书成功2222");
          this.userList = [];
          res.data.data.map((item, index) => {
            if (index >= 0 + 5 * (val - 1) && index < 5 + 5 * (val - 1)) {
              //得到数据库里的数据
              this.userList.push(item);
            }
          });
          //总条数
          this.count = res.data.data.length;
        })
        .catch(err => {
          console.log(err, "查询图书失败2222");
        });
    },
    //跳转到创建页面，实现创建功能
    create() {
      this.$router.push("/createUser");
      sessionStorage.setItem("userShow", false);
    },
    //跳转到编辑页面，实现编辑功能
    updateUser(index, row) {
      console.log(index, row);
      this.userList = JSON.stringify(row);
      console.log(this.userList, "111");
      this.$router.push("/createUser");
      sessionStorage.setItem("userShow", true);
      sessionStorage.setItem("userList", this.userList);
    },
    //删除
    delUser(index, row) {
      console.log(this.userList,index,row)
      this.$http({
        url: "/api/delUser",
        params: {
          id: this.userList[index].id
        }
      })
        .then(res => {
          console.log(res, "删除成功");
          this.find();
        })
        .catch(err => {
          console.log(err, "删除失败");
        });
    },
    //查找
    find() {
      this.$http({
        url: "/api/findUser"
      })
        .then(res => {
          console.log(res, "查询图书成功");
          this.userList = res.data.data;
          this.count = this.userList.length;
        })
        .catch(err => {
          console.log(err, "查询图书失败");
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-pagination {
  margin-top: 30px;
  text-align: center;
}
.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.top input {
  height: 28px;
}
</style>
