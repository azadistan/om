<template>
  <div style="width:26.25rem;margin:0rem 0 1rem 0px;float: bottom;border-top:#e0e0e0 solid 1px;">
    <input id="files" style="display: none" type="file" ref="clearFile" @change="importFile()" />
    <div  class="dropbox p-3" id="dragBox" @click="changeFn()" style="height:7rem;width:18rem;background:#EDEDED;margin:auto;margin-top:1rem;text-align:center;border:1px dashed rgba(0,0,0,0.15)" >
      <img src="../assets/upload.png" style="width:2rem;margin-top:1rem" />
      <h1 class=" font-weight-light" style="font-size:1rem;font-family:'微软雅黑'">
        点击或将文件拖拽到这里上传
      </h1>
      <h1 class=" font-weight-light" style="font-size:0.5rem;font-family:'微软雅黑'">
        支持扩展名.zip .kml
      </h1>
    </div>
    <div id="uploadedBox" style="display:none;height:7rem;width:18rem;margin:auto;margin-top:1rem;text-align:center;" >
      <div style="height:4rem;width:18rem;background:#EDEDED;border:1px dashed rgba(0,0,0,0.15);font-size:1rem;font-family:'微软雅黑'">
        <div style="float: left">
          <v-icon medium color="primary" style="margin: 0.8rem 0 0 2.2rem;">folder_open</v-icon>
        </div>
        <div class=" font-weight-light" style="float: left;margin: 1.1rem 0 0 0.5rem;font-size:1rem;font-family:'微软雅黑'">
          <span>    </span><span id="fileName"></span>
        </div>
      </div>

      <div style="float: left;margin-top: 1rem">
        <v-btn
          flat color="primary"
          @click="fileRun()"
          style="font-size:0.75rem;margin-top:0rem;margin-left:2rem;height: 2rem;"
        >
          确定
        </v-btn>
        <v-btn
          flat color="primary"
          @click="fileClear()"
          style="font-size:0.75rem;margin-top:0rem;margin-left:0rem;height: 2rem;"
        >
          重置
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import * as omnivore from '@mapbox/leaflet-omnivore/index'
  import * as JSZip from 'jszip'
  import '../leaflet.shpfile.js'
  import '../shp.js'
  var mapItems = new L.FeatureGroup();
  var filename="";
  var geoJSON=new Array();
  var geoString = ""

  export default {
    name: 'pm-upload-files',
    data(){
      return{
        geoJSON1:[],
        geoString1:this.changeGeoString(),
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
        items: [],
      }
    },
    mounted: function () {
      var dropbox = document.querySelector('.dropbox');
      dropbox.addEventListener('dragenter', this.onDrag, false);
      dropbox.addEventListener('dragover', this.onDrag, false);
      dropbox.addEventListener('drop', this.onDrop, false);
    },
    methods: {
      changeFn: function () {
        document.getElementById("files").click();
      },
      importFile:function () {
        var selectedFile = document.getElementById("files").files[0];//获取读取的File对象
        filename = this.omitName(selectedFile.name);
        this.fileReader(selectedFile);
      },
      clearFile() {
        this.$refs.clearFile.value = ''; // 清空file文件
      },
      fileReader:function (file){
        console.log(file);
        geoJSON = undefined;
        geoString = "";
        if(file.name.slice(-3) === "kml") {
          document.getElementById('uploadedBox').style.display=''
          document.getElementById('dragBox').style.display='none'
          document.getElementById('fileName').innerText = filename
          var reader = new FileReader();
          console.log(file.size);
          reader.onload = function () {
            console.log("loadright");
            // uploaded();
            if(reader.readyState != 2 || reader.error){
              console.log("readererr");
              return;
            }
            else{
              var customLayer=L.geoJSON(null,{fill:false});
              console.log(reader.result);
              var kmlLayer = omnivore.kml(reader.result,null,customLayer)
                .on('ready',function(e){
                  console.log("kmlright");
                  var tempGeoJSON = e.target.toGeoJSON();
                  console.log(tempGeoJSON);
                  if (tempGeoJSON.features.length === 1 && tempGeoJSON.features[0].geometry.type=="Polygon") { //1个feature
                    geoString = JSON.stringify(tempGeoJSON.features[0].geometry)
                    geoJSON = tempGeoJSON.features[0].geometry
                    this.changeGeoString()
                  }
                  else {
                    var j = 0;
                    var  myGeoJSON = new Object();
                    myGeoJSON.type = "Polygon";
                    myGeoJSON.coordinates = new Array();
                    for (var i = 0; i < tempGeoJSON.features.length; i++)
                    {
                      if (tempGeoJSON.features[i].geometry.type === "Polygon" || tempGeoJSON.features[i].geometry.type === "MultiPolygon"){
                        geoString=JSON.stringify(tempGeoJSON.features[i].geometry);
                        if(typeof(tempGeoJSON.features[0].geometry.coordinates[0]) === "object") {
                          myGeoJSON.coordinates.push(tempGeoJSON.features[i].geometry.coordinates);
                        }
                        else {
                          myGeoJSON.coordinates.push(tempGeoJSON.features[i].geometry.coordinates[0]);
                        }
                        j++;
                        if(j >1){
                          myGeoJSON.type = "MultiPolygon";
                        }
                      }
                    }
                    geoJSON=myGeoJSON;
                    console.log(geoJSON);
                  }
                })
              }

            }


          reader.readAsDataURL(file);//将file文件编码成DATAUrl
        }
        else if(file.name.slice(-3) === "zip"){
          var reader = new FileReader();
          console.log(file.size);
          var a = 0,b = 0,c = 0, d = 0;
          reader.onload = function() {
            document.getElementById('uploadedBox').style.display=''
            document.getElementById('dragBox').style.display='none'
            document.getElementById('fileName').innerText = filename
            console.log("loaded");
            if (reader.readyState != 2 || reader.error) {
              console.log("error");
              return;
            }
            else {
              JSZip.loadAsync(reader.result)
                .then(function (zip) {
                  var files = zip.file(/.+/);
                  files.forEach(function (x) {
                    if (x.name.slice(-3).toLowerCase() === 'dbf') {
                      a = 1;
                    }
                    if (x.name.slice(-3).toLowerCase() === 'shx') {
                      b = 1;
                    }
                    if (x.name.slice(-3).toLowerCase() === 'shp') {
                      c = 1;
                    }
                    if (x.name.slice(-3).toLowerCase() === 'prj') {
                      d = 1;
                    }
                  });
                  return a*b*c*d;
                })
                .then(function success(bool){
                  if(bool){
                    var shpfile = new L.Shapefile(reader.result,{fill:false}, {
                      onEachFeature: function (feature, layer) {
                        var holder = [];
                      },
                      style: function (feature) {
                        return {color: "blue"}
                      }
                    });
                    shpfile.addTo(mapItems);
                    shpfile.once("data:loaded",function(e){
                      var tempGeoJSON = e.target.toGeoJSON();
                      console.log(tempGeoJSON);
                      if (tempGeoJSON.features.length === 1 ) {
                        if( tempGeoJSON.features[0].geometry.type=="Polygon"){
                          geoString = JSON.stringify(tempGeoJSON.features[0].geometry)
                          geoJSON = tempGeoJSON.features[0].geometry;
                        }
                        else if(tempGeoJSON.features[0].geometry.type=="MultiPolygon"){
                          var  myGeoJSON = new Object();
                          myGeoJSON.type = "Polygon";
                          myGeoJSON.coordinates = new Array();
                          for(var m=0;m<tempGeoJSON.features[0].geometry.coordinates.length;m++){
                            myGeoJSON.coordinates.push(tempGeoJSON.features[0].geometry.coordinates[i]);
                          }
                          geoJSON=myGeoJSON;
                        }
                      }
                      else if(tempGeoJSON.features.length > 1){
                        console.log(tempGeoJSON);
                        var j = 0;
                        var  myGeoJSON = new Object();
                        myGeoJSON.type = "Polygon";
                        myGeoJSON.coordinates = new Array();
                        for (var i = 0; i < tempGeoJSON.features.length; i++)
                        {
                          if (tempGeoJSON.features[i].geometry.type === "Polygon" || tempGeoJSON.features[i].geometry.type === "MultiPolygon"){
                            geoString=JSON.stringify(tempGeoJSON.features[i].geometry)
                            if(typeof(tempGeoJSON.features[0].geometry.coordinates[0]) === "object") {
                              myGeoJSON.coordinates.push(tempGeoJSON.features[i].geometry.coordinates);
                            }
                            else {
                              myGeoJSON.coordinates.push(tempGeoJSON.features[i].geometry.coordinates[0]);
                            }
                            j++;
                            if(j >1){
                              myGeoJSON.type = "MultiPolygon";
                            }
                          }
                        }
                        geoJSON=myGeoJSON;
                        console.log(geoJSON);
                      }
                      else{
                      }
                    });
                  }else{
                    alert('该zip文件不符合文件格式要求，请点击重置清空文件缓存')
                  }
                });
            }
          }
          reader.readAsArrayBuffer(file);
        }
        else{console.log(file.name.slice(-3))}
      },
      fileClear:function (){
        this.geoString1=""
        geoJSON=""
        geoString=[]
        this.$store.commit('geoJsonChange','')
        this.$store.commit('mapResetChange',1)
        document.getElementById('uploadedBox').style.display='none'
        document.getElementById('dragBox').style.display=''
        filename = ""
        this.clearFile()
      },
      changeGeoString:function () {
        return geoString
      },
      fileRun:function () {
        if(this.geoString1 === geoString){this.$store.commit('dialogChange',[true,'文件上传缓存未清除，请点击重置按钮'])}
        else{
          this.geoString1 =geoString
        }

      },
      onDrag: function (e) {
        e.stopPropagation();
        e.preventDefault();
      },
      onDrop: function (e) {
        e.stopPropagation();
        e.preventDefault();
        e.stopPropagation();
        e.preventDefault();
        var selectedFile = e.dataTransfer.files[0]
        filename =selectedFile.name;
        console.log(filename);
        this.fileReader(selectedFile);

      },
      omitName (str) {
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
          charCode = str.charCodeAt(i);
          if (charCode >= 0 && charCode <= 128) realLength += 1;
          else realLength += 2;
        }
        if (realLength > 12) {
          return str.substring(0, 10) + "...zip"
          return str
        }
        else
          return str
      },
    },
    watch: {
      geoString1:{
        handler:function(val){
          this.$store.commit('geoJsonChange',val)
          this.$store.commit('mapResetChange',0)
        }
      },
    },
    computed: {
    }
  }
</script>

<style scoped>

</style>
