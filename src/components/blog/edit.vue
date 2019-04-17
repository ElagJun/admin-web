<template>
  <div>
    <el-form label-width="50px" :inline="true" style="text-align: left; padding: 10px">
      <el-form-item>
        <el-input v-model="addParam.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="addParam.lableId" placeholder="标签" style="width:100%">
          <el-option v-for="item in lable" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col>
        <mavon-editor v-model="mdValue" ref="md" @imgAdd="imgAdd" @imgDel="imgDel" @save="addBlog"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        //添加文章的数据
        addParam: {
          title: '',
          lableId: null,
          content: '',
        },
        //md格式的数据
        mdValue: '',
        //标签
        lable: [],
      }
    },
    created() {
      this.loadLable();
    },
    methods: {
      /**
       * 加载标题
       */
      loadLable() {
        this.$axios.get(this.GLOBAL.baseurl + '/blog/lable/list', {
          withCredentials: true,
        }).then(res => {
          this.lable = res.data.data;
        }).catch(e => {
          this.$message.error('加载数据出错');
        });
      },
      /**
       * 添加文章
       * @param value
       * @param render
       */
      addBlog(value, render) {
        if (!this.addParam.title) {
          this.$message.error('标题不能为空');
          return;
        }
        if (!this.addParam.lableId) {
          this.$message.error('标签不能为空');
          return;
        }
        if (!render) {
          this.$message.error('内容不能为空');
          return;
        }
        this.addParam.content = render;
        this.$axios.post(this.GLOBAL.baseurl + "/blog/article/add", this.addParam, {
          withCredentials: true,
        }).then(res => {
          this.addParam.content = '';
          this.$message.success(res.data.msg);
        }).catch(e => {
          this.addParam.content = '';
          this.$message.error(e.response.data.msg);
        })
      },
      /**
       * 添加图片，将图片上传转换成url
       * @param filename
       * @param imgfile
       */
      imgAdd(filename, imgfile) {
        let md = this.$refs['md'];
        md.$img2Url(filename, 'https://p1.ssl.qhimgs1.com/sdr/200_200_/t01b8b209eca4706e9d.jpg')
      },
      /**
       * 删除图片
       * @param filename
       */
      imgDel(filename) {
        console.log(filename[1])
      }
    }
  }
</script>

<style>
</style>
