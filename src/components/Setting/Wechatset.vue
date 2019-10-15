<template>
 <el-row class="warp" style="padding:20px 0 0 20px;">
  <el-col :span="24" class="warp-breadcrum">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>微信设置</el-breadcrumb-item>
    </el-breadcrumb>
  </el-col>


  <el-col :span="24" class="warp-main">
    <el-row>

      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="微信参数配置" name="list">

          <el-form ref="wechatset" :model="wechatset" label-width="120px" class="form" status-icon size="small" :rules="rules1" style="width:600px;">

            <el-form-item label="公众号AppId：" prop="app_id">
              <el-input v-model="wechatset.app_id" placeholder="请输入公众号AppId" v-show="show"></el-input>
              <label v-show="set">{{wxset.app_id}}</label>
            </el-form-item>

            <el-form-item label="AppSecret：" prop="app_secret">
              <el-input v-model="wechatset.app_secret" placeholder="请输入AppSecret" v-show="show"></el-input>
              <label v-show="set">{{wxset.app_secret}}</label>
            </el-form-item>

            <el-form-item label="微信商户号：" prop="mch_id">
              <el-input v-model="wechatset.mch_id" placeholder="请输入微信商户号" v-show="show"></el-input>
              <label v-show="set">{{wxset.mch_id}}</label>
            </el-form-item>

            <el-form-item label="商户Api密钥：" prop="api_key">
              <el-input v-model="wechatset.api_key" placeholder="请输入AppKey" v-show="show"></el-input>
              <label v-show="set">{{wxset.api_key}}</label>
            </el-form-item>

            <el-form-item>
              <el-button v-if="set && checkper1" size="small" type="primary" style="margin-left:0px;margin-top:20px;" @click="changebase">编辑</el-button>
              <el-button v-if="show" size="small" type="primary" style="margin-left:0px;margin-top:20px;" @click="confirm">提交</el-button>
              <el-button v-if="show" size="small" @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>

        </el-tab-pane>

<!--         <el-tab-pane label="模板消息" name="config">

          <el-form ref="modeldata" :model="modeldata" label-width="170px" class="form" status-icon size="small" :rules="rules2" style="width:750px;">

            <el-form-item label="拼团成功：" prop="collage_notify">
              <el-input v-model="modeldata.collage_notify" placeholder="请输入模板消息ID" v-show="modelshow"></el-input>
              <label class="grey" v-show="modelshow">选择关键词：订单号、商家名称、开团时间、成团时间、商品名称、参团人数、订单金额</label>
              <label v-show="modelset">{{modeldata.collage_notify}}</label>
            </el-form-item>

            <el-form-item>
              <el-button v-if="modelset" size="small" type="primary" style="margin-top:20px;" @click="changemodel">编辑</el-button>
              <el-button v-if="modelshow" size="small" type="primary" style="margin-top:20px;" @click="postmodel">提交</el-button>
              <el-button v-if="modelshow" size="small" @click="cancelmodel">取消</el-button>     
            </el-form-item>
          </el-form>

        </el-tab-pane> -->

      </el-tabs>

    </el-row>
  </el-col>


</el-row>
</template>



<script>


  import qiniu from '../../api/qiniu';

  import hosturl from '../../api/api';

  import { wxconfigPost } from '../../api/api';
  import { wxconfigGet } from '../../api/api';
  // import { wxmodelPost } from '../../api/api';
  // import { wxmodelGet } from '../../api/api';

  import { Message } from 'element-ui';


  export default {
    data() {
      return {
        base:hosturl+'v1'+'/upload',
        activeName:'list',

        show:false,
        set:true,
        checkper1:false,



        wechatset:{
          app_id:'',
          app_secret:'',
          mch_id:'',
          api_key:'',
          File:[],

        },

        wxset:{  

        },

        rules1:{
          app_id: [
          {required: true, message: '请输入AppId', trigger: 'blur'},
          ],
          app_secret: [
          {required: true, message: '请输入AppSecret', trigger: 'blur'},
          ],
          mch_id: [
          {required: true, message: '请输入商户号', trigger: 'blur'},
          ],
          api_key: [
          {required: true, message: '请输入AppKey', trigger: 'blur'},
          ],

        },


        modelshow:false,
        modelset:true,
        modeldata:{
          collage_notify:'',

        },

        rules2:{
          collage_notify: [
          {required: true, message: '请输入模板消息ID', trigger: 'blur'},
          ],
        }


      };
    },

    methods:{
      checkPer(){
        var per = sessionStorage.getItem('permissions');
        if(per.indexOf('txConfig')>-1){
          this.checkper1=true;
        }
      },

      getconfig(){
        var allParams = '';
        wxconfigGet(allParams).then((res) => {
          if(res.data==null){
            this.show=true
            this.set=false
          }else{
            this.wxset=res.data
          }
        });
      },

      getmodel(){
        var allParams = '';
        wxmodelGet(allParams).then((res) => {
          // console.log(res.data=='')
          if(res.data==''){
            this.modelshow=true
            this.modelset=false
          }else{
            this.modeldata=res.data
          }
        });
      },
      
      changebase(){
        this.show=true
        this.set=false
      },

      confirm(){
        this.$refs.wechatset.validate((valid) => {
          if (valid) {
            var allParams={
              app_id:this.wechatset.app_id,
              app_secret:this.wechatset.app_secret,
              mch_id:this.wechatset.mch_id,
              api_key:this.wechatset.api_key,
            }
            console.log(allParams)
            wxconfigPost(allParams).then((res) => {
              console.log(res)
              if (res.msg === "ok") {
               this.$message({
                message: '提交成功',
                type: 'success'
              });
               this.getconfig()
               this.show=false
               this.set=true
             } else {
               this.$message({
                message: res.msg,
                type: 'error'
              });
             }
           });


          }else{
            return false;
          }
        })
      },

      cancel(){
        this.show=false
        this.set=true
      },

      changemodel(){
        this.modelshow=true
        this.modelset=false
      },

      postmodel(){

        this.$refs.modeldata.validate((valid) => {
          if (valid) {

            var allParams=this.modeldata
            console.log(allParams)
            wxmodelPost(allParams).then((res) => {
              console.log(res)
              if (res.msg === "ok") {
               this.$message({
                message: '提交成功',
                type: 'success'
              });
               this.modelshow=false
               this.modelset=true
               this.getmodel()
             } else {
               this.$message({
                message: res.msg,
                type: 'error'
              });
             }
           });

          }else{
            return false;
          }
        })

      },


      cancelmodel(){
        this.modelshow=false
        this.modelset=true
      },
    },

    mounted: function(){
      this.getconfig();
      // this.getmodel();
      // this.checkPer();
    }
  }
</script>

<style scoped>
.grey{
  color: #aaa;
  float: left;
}
</style>