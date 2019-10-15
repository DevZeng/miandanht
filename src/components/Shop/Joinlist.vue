<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>商家管理</el-breadcrumb-item>
        <el-breadcrumb-item>加盟申请</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">

      <el-table :data="list" border stripe size="small" style="width: 80%">
        <el-table-column prop="id" label="编号" width="100" align="center">
        </el-table-column>

        <el-table-column prop="name" label="店户名称" min-width="200" align="center">
        </el-table-column>

        <el-table-column prop="manager" label="联系人" min-width="200" align="center">
        </el-table-column>

        <el-table-column prop="phone" label="电话" min-width="200" align="center">
        </el-table-column>

        <el-table-column prop="address" label="地址" min-width="200" align="center">
        </el-table-column>

        <el-table-column prop="created_at" label="申请时间" width="200" align="center">
        </el-table-column>

        <el-table-column prop="state" label="状态" min-width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="info" v-if="scope.row.state==1" @click="check(scope.row)">未处理</el-button>
            <el-button size="mini" type="success" v-if="scope.row.state==2">已处理</el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-pagination style="float:left;margin-top:20px;" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页">
      </el-pagination>
    </el-col>


  </el-row>
</template>



<script>
  import { applyGet } from '../../api/api';
  import { applyCheck } from '../../api/api';


  export default {
    data() {
      return {
        list:[],
        currentPage: 1,
        count:0,
        limit:10,

      };
    },

    methods:{
      getlist(){
        var allParams = '?page='+ this.currentPage + '&limit=' + this.limit;
        applyGet(allParams).then((res) => {
          this.list=res.data.data;
          this.count=res.data.count;
        });
      },

      check(row){
        var allParams = '?id='+ row.id+'&state=2';
        applyCheck(allParams).then((res) => {
         this.getlist();
       });
      },

      handleCurrentChange(val) {
        this.currentPage = val;
        this.getlist();
      },

      handleSizeChange(val){
        this.limit = val;
        this.getlist();
      },
    },

    mounted: function () {
      this.getlist();
    }
  }
</script>


<style>

</style>
