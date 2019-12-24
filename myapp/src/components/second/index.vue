<template>
  <div>
    <div class="top">
      <el-button type="primary" @click="create">新建</el-button>
      <div>
        <input type="text" v-model="value" @input="dimFind(value)" />
        <el-button type="primary" @click="dimFind">查询</el-button>
      </div>
    </div>
    <div class="block">
      <el-table :data="messageList">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="number" label="图书编号"></el-table-column>
        <el-table-column prop="name" label="书名"></el-table-column>
        <el-table-column prop="writer" label="作者"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="classify" label="分类"></el-table-column>
        <el-table-column prop="time" label="上架时间"></el-table-column>
        <el-table-column prop label="操作" width="200px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      messageList: [],
      currentPage4: 1,
      fileList: "",
      value: "",
      page: 5,
      count: 0
    };
  },
  mounted() {
    this.$http({
      url: "/api/findDevice"
    })
      .then(res => {
        // console.log(res, "查询图书成功2222");
        this.messageList = [];
        res.data.data.map((item, index) => {
          if (index >= 0 && index < 5) {
            //得到数据库里的数据
            this.messageList.push(item);
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
          this.messageList = [];
          res.data.data.map((item, index) => {
            if (item.name.indexOf(this.value) != -1||item.writer.indexOf(this.value) != -1) {
              this.messageList.push(item);
            }
          });
          // this.value = "";
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
          this.messageList = [];
          res.data.data.map((item, index) => {
            if (index >= 0 + 5 * (val - 1) && index < 5 + 5 * (val - 1)) {
              //得到数据库里的数据
              this.messageList.push(item);
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
      this.$router.push("/create");
      sessionStorage.setItem("isShow", false);
    },
    //跳转到编辑页面，实现编辑功能
    handleEdit(index, row) {
      console.log(index, row);
      this.fileList = JSON.stringify(row);
      console.log(this.fileList, "111");
      this.$router.push("/create");
      sessionStorage.setItem("isShow", true);
      sessionStorage.setItem("filelist", this.fileList);
    },
    //删除
    handleDelete(index, row) {
      this.$http({
        url: "/api/delDevice",
        params: {
          number: this.messageList[index].number
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
        url: "/api/findDevice"
      })
        .then(res => {
          console.log(res, "查询图书成功");
          this.messageList = res.data.data;
          this.count = this.messageList.length;
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
