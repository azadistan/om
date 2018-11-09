<template>
  <div style="width:26.25rem;margin:0rem 0 1rem 0px;float: bottom;border-top:#e0e0e0 solid 1px;">
    <div @click="changeFn()" style="height:6rem;width:15rem;background:#EDEDED;margin:auto;margin-top:0.5rem;text-align:center" >
      <input id="files" style="display: none" type="file" @change="importFile()" />
      <img src="../assets/upload.png" style="width:2rem;margin-top:0.5rem" />
      <h1 class=" font-weight-light" style="font-size:1rem;font-family:'微软雅黑'">
        点击或拖拽上传zip文件
      </h1>
      <h1 class=" font-weight-light" style="font-size:0.5rem;font-family:'微软雅黑'">
        支持扩展名.zip .kml
      </h1>
    </div>
    <div v-if="showPrise">
      <h1 class=" font-weight-light" style="font-size:0.5rem;margin-left: 1rem;margin-top: 1rem;">
        {{message}}
      </h1>
      <v-progress-linear v-model="valueDeterminate" style="width: 25rem;margin:0 auto"

      ></v-progress-linear>
    </div>
    <div style="width:25.5rem;float: bottom;margin-bottom: 1rem">
      <v-btn
        :loading="loading"
        :disabled="loading"
        flat color="primary"
        @click.native="loader = 'loading'"
        @click="upload()"
        style="margin-left: 9.45rem;"
      >
        上传
      </v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pm-upload-files',
    data(){
      return{
        valueDeterminate: 0,
        showPrise: false,
        showAll: true,
        file: document.getElementById("file"),
        message: "",
        loader: null,
        suss: 0,
        open: ['public'],
        files: {
          html: 'mdi-language-html5',
          js: 'mdi-nodejs',
          json: 'mdi-json',
          md: 'mdi-markdown',
          pdf: '../assets/upload.png',
          png: 'mdi-file-image',
          txt: 'mdi-file-document-outline',
          xls: 'mdi-file-excel'
        },
        tree: [],
        items: []
      }
    },
    methods: {

      changeFn: function () {
        //alert("aa");
        // `this` 在方法里指向当前 Vue 实例
        files.click();
        //this.showPrise=true;
        // `event` 是原生 DOM 事件

      },
      upload:function () {
        var selectedFile = document.getElementById("files").files[0];//获取读取的File对象
        let param = new FormData()  // 创建form对象
        param.append('file', selectedFile, selectedFile.name)  // 通过append向form对象添加数据
        param.append('chunk', '0') // 添加form表单中其他数据
        var config1 = {
          onUploadProgress: progressEvent => {
            this.valueDeterminate = (progressEvent.loaded / progressEvent.total * 80)
            //this.progress = complete
          }
        }
        // 添加请求头
        axios.post('http://192.168.20.7:8078/uploadThemeticProduct', param,config1)
          .then(resp => {
            //alert(resp.data.message);
            this.suss=1;
            this.valueDeterminate=100;
            this.showAll=false;
            // this.$store.show = false;
            this.$store.commit('change',1);
            this.$store.commit('fileInfoChange',resp.data.data);
            for(var i=0;i<resp.data.data.directory.length;i++)
            {
              this.items.push({name:resp.data.data.directory[i].directoryName,children:[]});
              for(var j=0;j<resp.data.data.directory[i].fileListInDirectory.length;j++)
              {
                this.items[i].children.push({name:resp.data.data.directory[i].fileListInDirectory[j]})
              }
            }
            for(var i=0;i<resp.data.data.file.length;i++)
            {

              this.items.push({name:resp.data.data.file[i]});
            }
            //alert(this.items);

          }).catch(err => {             //
          alert('请求失败：'+err.status+','+err.statusText);
        });


      },
      importFile: function () {

        var selectedFile = document.getElementById("files").files[0];//获取读取的File对象
        var filename =selectedFile.name;
        //alert(filename);
        this.message=filename;
        //alert(this.message);
        //console.log(filename);
        //fileReader(selectedFile);
        // `this` 在方法里指向当前 Vue 实例
        //files.click();
        this.showPrise=true;
        // `event` 是原生 DOM 事件

      },
      aa: function (a) {
        // alert(this.items);
        //alert( this.items.indexOf(a,0));
        var index=this.items.indexOf(a,0);
        this.$store.commit('infoShowChange',index);
        //alert(a);
      }

    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        //setTimeout(() => (this[l] = false), 3000)

        // this.loader = null
      },
      suss:{
        handler(){
          //alert("aa");
          const l = this.loader
          this[l] = !this[l]
          this.loader = null

        }
      }
    },
    computed: {
      autoTop () {
        //alert(this.$store.state.scrollTop1);
        //if(this.$store.state.scrollTop1>100)
        // {
        // this.aaa=54;
        // return this.$store.state.scrollTop1 +140;
        // }
        // else {
        //this.aaa=48;
        return this.$store.state.scrollTop1 + 140
        //  }
      },
      autoWidth () {
        //this.aaa=(this.$store.state.clientWidth1-1519)/175*(-1)-3.2;
        //alert(this.$store.state.clientWidth1);
        return (this.$store.state.clientWidth1-1519)/1.06+683
      },
      autoHeight () {
        return this.$store.state.clientHeight1 -230;
      }
    }
  }
</script>

<style scoped>

</style>
