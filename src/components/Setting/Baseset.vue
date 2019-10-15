<template>
 <el-row class="warp" style="padding:20px 0 0 20px;">
  <el-col :span="24" class="warp-breadcrum">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>基本设置</el-breadcrumb-item>
    </el-breadcrumb>
  </el-col>


  <el-col :span="24" class="warp-main">
    <el-row>

      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="活动时间" name="time">

          <el-radio-group @change="timekg" v-model="timeradio">
            <el-radio-button label=0>关</el-radio-button>
            <el-radio-button label=1>开</el-radio-button>
          </el-radio-group>

          <div v-if="timeradio==1">
            <span class="demonstration">请选择活动结束时间：</span>
            <el-date-picker v-model="datetime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
            <el-button type="primary" class="postbtn" size="small" @click="savetime()">提交</el-button>
          </div>
        </el-tab-pane>


        <el-tab-pane label="群二维码" name="groupcode">
          <el-upload class="upload-demo" :action="upurl" :data="uptoken" :on-success="qrSuccess" :show-file-list="false" accept="image/*">
            <img :src="qrimg" class="pre-img" style="width:146px;height:146px;border:1px dashed #ccc;border-radius:6px;display: block;margin-top: 1px;">
          </el-upload>
          <el-button type="primary" class="postbtn" size="small" @click="saveqr()">提交</el-button>
        </el-tab-pane>

        <el-tab-pane label="首页背景图" name="bgpic">
         <el-upload class="upload-demo" :action="upurl" :data="uptoken" :on-success="bgSuccess" :show-file-list="false" accept="image/*">
          <img :src="bgimg" class="pre-img" style="width:225px;height:400px;border:1px dashed #ccc;border-radius:6px;display: block;margin-top: 1px;">
        </el-upload>
        <el-button type="primary" class="postbtn" size="small" @click="savebg()">提交</el-button>
      </el-tab-pane>

      <el-tab-pane label="海报背景图" name="sharepic">
       <el-upload class="upload-demo" :action="upurl" :data="uptoken" :on-success="shareSuccess" :show-file-list="false" accept="image/*">
        <img :src="shareimg" class="pre-img" style="width:225px;height:400px;border:1px dashed #ccc;border-radius:6px;display: block;margin-top: 1px;">
      </el-upload>
      <el-button type="primary" class="postbtn" size="small" @click="saveshare()">提交</el-button>
    </el-tab-pane>

    <el-tab-pane label="分享链接" name="linkpic">
     <el-upload class="upload-demo" :action="upurl" :data="uptoken" :on-success="linkSuccess" :show-file-list="false" accept="image/*">
      <img :src="linkimg" class="pre-img" style="width:225px;height:225px;border:1px dashed #ccc;border-radius:6px;display: block;margin-top: 1px;">
    </el-upload>

    <el-input v-model="sharetitle" placeholder="请输入分享标题" style="margin-top:10px;width: 300px;display: block;"></el-input>
    <el-input v-model="sharedetail" placeholder="请输入分享描述" style="margin-top:10px;width: 300px;display: block;"></el-input>

    <el-button type="primary" class="postbtn" size="small" @click="savelink()">提交</el-button>
  </el-tab-pane>

  <el-tab-pane label="背景音乐" name="bgmic">
    <el-upload class="upload-demo" :action="upurl" :data="uptoken" :on-success="bgmSuccess" :file-list="fileList" accept="*" :limit="1" style="width: 200px;display: block;">
     <el-button size="small" type="primary">上传背景音乐</el-button>
   </el-upload>
   <el-button type="primary" class="postbtn" size="small" @click="savebgm()">提交</el-button>
 </el-tab-pane>

 <el-tab-pane label="充值金额" name="price">
  <el-input v-model="price" placeholder="请输入充值金额" style="width: 200px;display: block;"></el-input>
  <el-button type="primary" class="postbtn" size="small" @click="saveprice()">提交</el-button>
</el-tab-pane>

<el-tab-pane label="客服电话" name="phone">
  <el-input v-model="phone" placeholder="请输入客服电话" style="width: 200px;display: block;"></el-input>
  <el-button type="primary" class="postbtn" size="small" @click="savephone()">提交</el-button>
</el-tab-pane>

<el-tab-pane label="活动规则" name="rule">
  <div class="edit_container"> 
    <quill-editor v-model="rule" :options="editorOption" ref="myQuillEditor" class="editer"></quill-editor>
  </div>
  <el-button type="primary" class="postbtn" size="small" @click="saverule()">提交</el-button>
</el-tab-pane>

</el-tabs>

</el-row>
</el-col>


</el-row>
</template>



<script>


  import qiniu from '../../api/qiniu';
  import { baseset } from '../../api/api';
  import { baseget } from '../../api/api';

  import { Message } from 'element-ui';

  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';

  import { quillEditor } from 'vue-quill-editor' //调用编辑器

  export default {
    data() {

      return {
        activeName:'time',

        uptoken:{
          token:qiniu.token,
        },
        upurl:qiniu.upurl,

        timeradio:0,
        datetime:'',

        price:200,

        phone:'',

        qrimg:'../static/images/default1.png',

        bgimg:'../static/images/default2.png',

        shareimg:"../static/images/default2.png",

        linkimg:"../static/images/default1.png",

        sharetitle:'',
        sharedetail:'',

        bgmic:'',

        fileList:[{
         name:'背景音乐',
         url:''
       }],

       rule:'',

       editorOption:{
        placeholder: '请输入商家规则',
        theme: 'snow',
        modules: {
          toolbar: {
           container: [
           ['bold', 'italic', 'underline', 'strike'],
           ['blockquote', 'code-block'],
           [{ 'direction': 'rtl' }],
           [{ 'size': ['small', false, 'large', 'huge'] }],
           [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
           [{ 'color': [] }, { 'background': [] }],
           [{ 'font': [] }],
           [{ 'align': [] }],
           ['clean']
           ],
         }
       }
     },

   };
 },


 components: {
  quillEditor
},

methods:{

  timekg(val){
    console.log(val)
    if(val==0){
      var allParams={ flash:0 }
      console.log(allParams)
      baseset(allParams).then((res) => {
        this.getconfig()
      });
    }
  },



  savetime(){
    if(this.datetime==''){
      this.$message({
        message: '请选择结束时间',
        type: 'error'
      });
    }else{
      var allParams={
        flash:1,
        flashtime:this.datetime
      }
      baseset(allParams).then((res) => {
        if (res.msg === "ok") {
          this.getconfig()
          this.$message({
            message: '提交成功',
            type: 'success'
          });
        } else {
         this.$message({
          message: res.msg,
          type: 'error'
        });
       }
     });
    }
  },

  qrSuccess(res, file){
    this.qrimg = qiniu.showurl+ res.key
  },

  saveqr(){

    var allParams={
      qrcode:this.qrimg
    }
    baseset(allParams).then((res) => {
      if (res.msg === "ok") {
        this.getconfig()
        this.$message({
          message: '提交成功',
          type: 'success'
        });
      } else {
       this.$message({
        message: res.msg,
        type: 'error'
      });
     }
   });
  },

  bgSuccess(res, file){
    this.bgimg = qiniu.showurl+ res.key
  },

  savebg(){
    var allParams={
      bgpic:this.bgimg
    }
    baseset(allParams).then((res) => {
      if (res.msg === "ok") {
       this.getconfig()
       this.$message({
        message: '提交成功',
        type: 'success'
      });
     } else {
       this.$message({
        message: res.msg,
        type: 'error'
      });
     }
   });
  },

  shareSuccess(res, file){
    this.shareimg = qiniu.showurl+ res.key
  },

  saveshare(){
    var allParams={
      sharepic:this.shareimg
    }
    baseset(allParams).then((res) => {
      if (res.msg === "ok") {
       this.getconfig()
       this.$message({
        message: '提交成功',
        type: 'success'
      });
     } else {
       this.$message({
        message: res.msg,
        type: 'error'
      });
     }
   });
  },

  linkSuccess(res, file){
    this.linkimg = qiniu.showurl+ res.key
  },

  savelink(){

    if(this.sharetitle==''){
      this.$message({
        message: '请输入分享标题',
        type: 'error'
      });
      return
    }else if(this.sharedetail==''){
      this.$message({
        message: '请输入分享描述',
        type: 'error'
      });
      return
    }


    var allParams={
      sharebg:this.linkimg,
      sharetitle:this.sharetitle,
      sharedetail:this.sharedetail,
    }
    baseset(allParams).then((res) => {
      if (res.msg === "ok") {
       this.getconfig()
       this.$message({
        message: '提交成功',
        type: 'success'
      });
     } else {
       this.$message({
        message: res.msg,
        type: 'error'
      });
     }
   });
  },

  bgmSuccess(file, fileList) {
    this.fileList[0].url=qiniu.showurl+ file.key
  },

  savebgm(){
      // console.log(this.fileList)
      var allParams={
        bgmusic:this.fileList[0].url
      }
      baseset(allParams).then((res) => {
        if (res.msg === "ok") { 
          this.getconfig()
          this.$message({
            message: '提交成功',
            type: 'success'
          });
        } else {
         this.$message({
          message: res.msg,
          type: 'error'
        });
       }
     });
    },

    saveprice(){
      var allParams={
        price:this.price
      }
      baseset(allParams).then((res) => {
        if (res.msg === "ok") {
          this.getconfig()
          this.$message({
            message: '提交成功',
            type: 'success'
          });
        } else {
         this.$message({
          message: res.msg,
          type: 'error'
        });
       }
     });
    },

    savephone(){
      var allParams={
        phone:this.phone
      }
      baseset(allParams).then((res) => {
        if (res.msg === "ok") {
          this.getconfig()
          this.$message({
            message: '提交成功',
            type: 'success'
          });
        } else {
         this.$message({
          message: res.msg,
          type: 'error'
        });
       }
     });
    },

    saverule(){
      var allParams={
        rule:this.rule
      }
      baseset(allParams).then((res) => {
        if (res.msg === "ok") {
          this.getconfig()
          this.$message({
            message: '提交成功',
            type: 'success'
          });
        } else {
         this.$message({
          message: res.msg,
          type: 'error'
        });
       }
     });
    },

    getconfig(){
      var allParams=''
      baseget(allParams).then((res) => {
        if (res.msg === "ok") {
          this.fileList[0]={
            name:'背景音乐',
            url:res.data.bgmusic
          }


          this.timeradio=res.data.flash
          // var date=1548864000
          var date = new Date(res.data.flashtime * 1000);
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          var D = date.getDate() + ' ';
          var h = date.getHours() + ':';
          if(date.getHours() < 10){h ='0'+h}
            var m = date.getMinutes() + ':';
          if(date.getMinutes() < 10){m ='0'+m}
            var s = date.getSeconds();
          if(date.getSeconds() < 10){s ='0'+s}
            this.datetime=Y+M+D+h+m+s


          this.linkimg=res.data.sharebg
          this.sharetitle=res.data.sharetitle
          this.sharedetail=res.data.sharedetail


          this.bgimg=res.data.bgpic
          this.qrimg=res.data.qrcode
          this.price=res.data.price
          this.phone=res.data.phone
          this.rule=res.data.rule
          this.shareimg=res.data.sharepic
        } else {
         this.$message({
          message: res.msg,
          type: 'error'
        });
       }
     });
    },


  },

  mounted: function(){
    this.getconfig()
  }
}
</script>

<style scoped>
.qrimg{
  width: 200px;
  height: 200px;
  border:1px dashed #ccc;
  border-radius:6px;
  display: block;
  margin-top: 1px;
}

.bgimg{
  width: 180px;
  height: 320px;
  border:1px dashed #ccc;
  border-radius:6px;
  display: block;
  margin-top: 1px;
}

.postbtn{
  margin-top: 10px;
}
.editer{
  height: 350px;
  width: 1000px;
  margin-bottom: 90px;
}
.demonstration{
  font-size: 15px;
}
</style>