<template>
  <div style="width:26.25rem;margin:0px 0 0rem 0px;float: bottom;border-top:#e0e0e0 solid 1px;">
    <div style="width:22rem;height:3rem;float:bottom;margin:1.3rem 0 0 2rem;border:1px solid #d8d8d8;padding-left: 0.5rem">
      <div @click="pmDrawRectangle()" @mouseenter="pmDrawRectangleMouseEnter()" @mouseleave="pmDrawRectangleMouseLeave()" style="float:left;width:5rem;height:3rem;margin:0rem 0 0 0rem;cursor: pointer;">
        <img id="greyRectangle" style="float:left;margin: 0.5rem 0 0 0;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAmElEQVRIS+2WQQrCQAxF/z+JvUE9mi4yW3U72Xi0HsGeJCVCC7ZuKumAkNknj/8I/CEaPTbioD2o1vok2QcnHETk6juXRKpqAEYze0XASHYATiLyZqxBDxG5R4BU1ffcErTbZqrbrWweSHWpbjGQx/Dnx+ClRzKk+Mys8/Lb9JFXOYDzz66+Dw6llMtHwwYDNuva/4KOTjQBIguvG1mye24AAAAASUVORK5CYII=">
        <img id="blueRectangle" style="float:left;;margin: 0.5rem 0 0 0;display: none" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAo0lEQVRIS+2WsQ3CQBAEd1v4BviAj6EuO4EKsDsgMXU5N4Fp4FtYBAhLFk6MjpeQ7vO70Y5O2icKPRbioDwodNezqJ1lQgJ9rtLxsXNKFC6DJNxAjCYwIZLY5Co9GTMQhDbXqbEAhW5oQJwctNqmq1ut7D3g6lzdZMCP4c+PQdAI0Kb4oEgwfvbRq8r3X7taGKTY53p7mDWsJWBpV/lf0K8T3QEoJsEbiLaGwwAAAABJRU5ErkJggg==">
        <div id="fontRectangle" style="float:left;margin: 0.65rem 0 0 0.3rem;font-family: 微软雅黑;color:#8b8b8b;font-size: 15px;">矩形</div>
      </div>
      <div style="float:left;font-size: 16px;margin: 0.5rem"> | </div>
      <div @click="pmDrawCircle()"  @mouseenter="pmDrawCircleMouseEnter()" @mouseleave="pmDrawCircleMouseLeave()" style="float:left;width:5rem;height:3rem;margin:0rem 0 0 0rem;cursor: pointer;">
        <img id="greyCircle" style="float:left;margin-top: 0.3rem" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB/ElEQVRYR+1Wy21bMRDcJaizlA6UDpIKInegVBC5glgHUsfYR5EH2RXEqSDqIEoFSQdxCc5ZAidYgS8glMePDAOKAfH0AIJvZ2dnd4fpxIdPHJ/OAF4mA977CRG9S/UDYGOt/X6sppoZWK1Wo91u95GIroholAn0SES3Wuu7+Xwu39XTBGC5XE6VUp8lMIDfzLyWjJn5QSIAGDPzBMCUmYdE9BhCuFwsFusagioA59yMmSW4nBut9W0uu8iSMPQpAru01t6XQBQBxMy/StZENLHW/qxlJPfOuTdEJAwNQwjvS0xkAcRsfkXa37YG7wAKCGb+IeXQWr/OsZYF4L2/jlTeGGPk++jT8o8sAOfcXsWDwWDcquhDhMLidrt9YGYYY171ZdALIPb5NyL6YoyZHZ168sB7LyL8AKC3jDkAe/oBVFVcA5d0UW8piwCI6MIYs6kFKd0nbL5AAKcsgSybZxVhrpzFNpT2KQ2Rmja6YQaArbW9C+z/HUTJEBnmerjEQDeKZY+UhlnTMpJ5DuCidR/E4KKh0ZOXUbJU0nV8XTIbiWnZ746WLqr6AfmRrGVmvu/MBoC1UmoTQtgbEqXUOIQwYeZpZ1oAzJ7FkHRMdGYDwFUE8o8EolsSS5Y1LYePmhg4fBTHq8yKv0dYadVI+u5JAGr9f8z9GcCZgT9UJTsw8VSlPAAAAABJRU5ErkJggg==">
        <img id="blueCircle" style="float:left;margin-top: 0.3rem;display: none" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACEUlEQVRYR+2WQU4iQRiF318h6s7WE2Bis9YTiDfQE4hLYSGeQDyBzAJcypxguIF4Al2DiZ5A250aUs9UQSNhuqtKZiaOCSzprq7vf/XX/57gi3/yxftjAfA9FYguBmUF7Ez3jyZ6STW+/mxPBSsQnd9HamV4TI26CKKsjUgkotDUL4UfyclGEgITBBC17/aEvDQbE3gWsGsqhpIHu4lmUQnKhOwJsGpAKHKYVDe7PggvQNTqV5TIpf0QcabfCs286qxKS8M6BKcjLh4mtVLHBeEEMJUr8JepmmQ5qZVufRWZ51GrvyUiPaOGhuy7lMgFMNXI0vDeyK7J7dDNU0ADoURu7HG8FTbyVMsFWG8NGlZK4uyxFjdCKp99J+QbuQBr7YHtYr4WiqEdPQtgVVwePoDgUy1eyyoiE8Dec+IK4M/HaqkyT/XpmvV2vwPIQd4xZgKk0oV0sQ9ucotyjtININhNjuKebxPX84ma3xMgYJD41JnrCP5JE+Ycp/saEnQNEW/142EGgTxV40wD+38HUTpE7Dz/k1FsfMQxzMLMyMxzcDfUD6wZQa6sj8xrRlOm8mHHgoYrbKShBYT1jpBB5s0D1l5NIAE7adiwgURUD+AokECKinoUSMahhZDKXwkkEyXGYYOCugHJjGQmLRFNV2iZXRekwG8uZ8xKozz9vwa7oT0yvW4uAN/9/8zzBcBCgXfoPEYwl/gtoAAAAABJRU5ErkJggg==">
        <div id="fontCircle" style="float:left;margin-top:0.65rem;font-family: 微软雅黑;color:#8b8b8b;font-size: 15px;">圆形</div>
      </div>
      <div style="float:left;font-size: 16px;margin: 0.5rem"> | </div>
      <div @click="pmDrawPolygon()"  @mouseenter="pmDrawPolygonMouseEnter()" @mouseleave="pmDrawPolygonMouseLeave()" style="float:left;width:8rem;height:3rem;margin:0rem 0 0 0.3rem;cursor: pointer;">
        <img id="greyPolygon" style="float:left;margin-top: 0.5rem" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABxUlEQVRIS72WwVECMRSG/wfZs3QgdAAVKBWoFagdyOGF4aSeGJIDWoFagVqBWAF2IFagnsnynDAss66LJsKQ0x7y8uUlf/5/CVsatIrT7/fr1Wp1N2YfaZq+9Xq9SVnNSpC11hdEgURkorVuBIOstWcAhgAeAbwEdtUEcACgw8xXxZofHQ2Hw5pz7hXAp1Kq2el0PkJAvm46nU6ISJRSjWLdD5C19hbAsYicaq39d/AwxpwQ0Q2AO2Y+yRd+AxljmkQ0FpFnrfV+MCE30RgzIqI9EWlprZfHXgTNJwFoM/PoPyBrrd/gE4ARM7ezNZagwWBwWKlU7svajgVmxz+bzY663e6Dr1+CvJxFpJamaXPVWwgFLt6gP7b3TO5zkLX2AsA5gEtm9t9rj+Ka5OlKqbGXMzPX1ybkFlg8+h3nXIvKznNTsPy9bw9UdnGb6igvsO2JIdt9/uI2Ie+iwLb/YH1nmU9twoKKfllqqkWfihFHkKkuXGLtmBCRa621D8/lKA0+H2Dep5IkacUEnw9MEaEkSep/Bt+iq3mUi8gDEQVFuYj4LDsMjvKC3KN+TgC8rfLLX3+3lFJRJuucm0T/bsUoLWTuF53mIhZ+8aBeAAAAAElFTkSuQmCC">
        <img id="bluePolygon" style="float:left;margin-top: 0.5rem;display: none" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAByUlEQVRIS72WQU6DQBSG/0dQl469gG0iXdMTaE+gnkBdChs9gXqC6qJ1aT2BegLrCXRdTIoXKOOyhvQZSCBAoc4YQre8N1/fzD//P4SGflTFEfezNjjc1fofZH7J845f1lMJ2hl6PhG0QAz2A6fbUQaJkXdhAANmvBDwoTIVAzYRDpfApXSs22LPykRiMBO0Gc4AfPOPacvLjlQBxX1boQ8G84/ZKfatgFqj6RigkyXzmXS7YxVIUiOG01OD6AHgx7nTPc325kBiOLUNoncG3gLHOtCBJLU7I29CwP6SuSfdbrrtOVBaROjLc2vyH5C49w4MxisDk8Cx+skaKUiMPo8M8FPZ2LrAdPtBx9LZe476U1AkZxAEk2lX3QVVYHQHicMPgINE7jGoNfSuQbgC42buWteqC66rK65JMX0ZvkdyDlyrXQckFUa0S8A2G2aPyvazLlj23JsDlR1cXRNlBdacGMoOrhZ5FwTW/IWNJqvZgnJ+WWWqOZ/SEYeSqcYuUUdMMN3N3b2LypiIPqQBBg54sdHTCr4oMAnEC7P9Z/DFsCTKgWcixShn2AQcKUd5Vu7ajxPGV5Vfrn9uIdQ0WdPXfm7pKE2l9hdhHyG6SLIWYgAAAABJRU5ErkJggg==">
        <div id="fontPolygon" style="float:left;margin:0.65rem 0 0 0.3rem;font-family: 微软雅黑;color:#8b8b8b;font-size: 15px;">绘制多边形</div>
      </div>
    </div>
    <div style="width:25.5rem;float: bottom;">
      <v-btn  @click="pmDrawReset()" flat color="primary" style="margin-left: 10rem;" >重置</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pm-draw-area',
    data () {
      return {
        drawAreaId:0,
        drawCannotStop:0
      }
    },
    methods:{
      pmDrawRectangle:function () {
        if(this.drawCannotStop === 0){
          this.pmDrawRectangleMouseEnter()
          this.pmDrawCircleMouseLeave()
          this.pmDrawPolygonMouseLeave()
          this.$store.commit('drawAreaChange',1)
          this.$store.commit('mapResetChange',0)
          this.drawAreaId = 1
          this.drawCannotStop = 1
        }
        else{
          this.$store.commit('dialogChange',[true,'绘制区域动作未重置，请点击重置'])
        }
      },
      pmDrawCircle:function () {
        if(this.drawCannotStop === 0){
          this.pmDrawRectangleMouseLeave()
          this.pmDrawCircleMouseEnter()
          this.pmDrawPolygonMouseLeave()
          this.$store.commit('drawAreaChange',2)
          this.$store.commit('mapResetChange',0)
          this.drawAreaId = 2
          this.drawCannotStop = 2
        }
        else{
          this.$store.commit('dialogChange',[true,'绘制区域动作未重置，请点击重置'])
        }
      },
      pmDrawPolygon:function () {
        if(this.drawCannotStop === 0){
          this.pmDrawRectangleMouseLeave()
          this.pmDrawCircleMouseLeave()
          this.pmDrawPolygonMouseEnter()
          this.$store.commit('drawAreaChange',3)
          this.$store.commit('mapResetChange',0)
          this.drawAreaId = 3
          this.drawCannotStop = 3
        }
        else{
          this.$store.commit('dialogChange',[true,'绘制区域动作未重置，请点击重置'])
        }
      },
      pmDrawReset:function () {
        document.getElementById('greyRectangle').style.display=''
        document.getElementById('blueRectangle').style.display='none'
        document.getElementById('fontRectangle').style.color = '#8b8b8b'
        document.getElementById('greyCircle').style.display=''
        document.getElementById('blueCircle').style.display='none'
        document.getElementById('fontCircle').style.color = '#8b8b8b'
        document.getElementById('greyPolygon').style.display = ''
        document.getElementById('bluePolygon').style.display = 'none'
        document.getElementById('fontPolygon').style.color = '#8b8b8b'
        this.$store.commit('mapResetChange',1)
        this.$store.commit('drawAreaChange',0)
        this.drawCannotStop = 0
        this.drawAreaId = 0
      },
      pmDrawRectangleMouseEnter:function () {
        document.getElementById('greyRectangle').style.display='none'
        document.getElementById('blueRectangle').style.display=''
        document.getElementById('fontRectangle').style.color = '#1296db'
      },
      pmDrawRectangleMouseLeave:function () {
        if(this.drawAreaId === 1){}
        else{
          document.getElementById('greyRectangle').style.display=''
          document.getElementById('blueRectangle').style.display='none'
          document.getElementById('fontRectangle').style.color = '#8b8b8b'
        }
      },
      pmDrawCircleMouseEnter:function () {
        document.getElementById('greyCircle').style.display='none'
        document.getElementById('blueCircle').style.display=''
        document.getElementById('fontCircle').style.color = '#1296db'
      },
      pmDrawCircleMouseLeave:function () {
        if(this.drawAreaId === 2){}
        else{
          document.getElementById('greyCircle').style.display=''
          document.getElementById('blueCircle').style.display='none'
          document.getElementById('fontCircle').style.color = '#8b8b8b'
        }
      },
      pmDrawPolygonMouseEnter:function () {
        document.getElementById('greyPolygon').style.display='none'
        document.getElementById('bluePolygon').style.display=''
        document.getElementById('fontPolygon').style.color = '#1296db'
      },
      pmDrawPolygonMouseLeave:function () {
        if(this.drawAreaId === 3){}
        else {
          document.getElementById('greyPolygon').style.display = ''
          document.getElementById('bluePolygon').style.display = 'none'
          document.getElementById('fontPolygon').style.color = '#8b8b8b'
        }
      },
    },
    watch:{

    },

  }
</script>

<style scoped>

</style>
