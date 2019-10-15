<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>购物订单</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">

      <el-form :inline="true">

        <el-form-item>
          <div class="block">
            <span class="demonstration">请选择下单时间：</span>
            <el-date-picker v-model="filter1.date" type="daterange" range-separator="/" @change="getSTime" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="getlist">搜索</el-button>
          <el-button size="small" @click="clear">清空</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="list" border stripe size="small" id="out-table" style="width:95%;">
        <el-table-column prop="id" label="ID" width="100" align="center">
        </el-table-column>
        <el-table-column prop="number" label="订单号" min-width="100" align="center">
        </el-table-column>

        <el-table-column prop="user" label="头像" min-width="100" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.user.avatarUrl" v-if="scope.row.user" style="width:40px;height:40px;border-radius:50%;margin:5px 0 -5px 0;" />
          </template>
        </el-table-column>

        <el-table-column prop="user.nickname" label="用户" min-width="100" align="center">
        </el-table-column>

        <el-table-column prop="price" label="金额" min-width="150" align="center">
        </el-table-column>

        <el-table-column prop="created_at" label="充值时间" min-width="200" align="center">
        </el-table-column>

      </el-table>

      <el-pagination style="float:left;margin:20px 0 200px 0px;" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50,100,200]" :page-size="limit" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页">
      </el-pagination>


    </el-col>





  </el-row>
</template>

<script>

  import { allorderGet } from '../../api/api';


  import { Message } from 'element-ui';


  export default {
    data() {
      return {
        list:[],
        currentPage: 1,
        count:0,
        limit:10,


        filter:{
          start:'',
          end:''
        },

        filter1:{
          date:''
        },

        checkper1:false,

      };
    },

    methods:{
      checkPer(){
        var per = sessionStorage.getItem('permissions');
        if(per.indexOf('orderListDo')>-1){
          this.checkper1=true;
        }
      },

      getlist(){
        var allParams = '?page='+ this.currentPage + '&limit=' + this.limit+'&start=' + this.filter.start+'&end=' + this.filter.end;
        allorderGet(allParams).then((res) => {
          this.list=res.data.data;
          this.count=res.data.count
        });
      },

      getSTime(val){
        this.filter.start=val[0];
        this.filter.end=val[1];
      },

      clear(){
        this.filter={
          start:'',
          end:'',
        }
        this.filter1={
          date:''
        }
        this.getlist();
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