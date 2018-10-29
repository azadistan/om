<template>
  <div style="width:21rem;background:#1A263D;overflow:auto">
    <v-layout>
      <v-flex>
        <v-card>
          <v-list subheader dark style="background:#1A263D">
            <v-list-group
              v-for="item in items"
              v-model="item.active"
              :key="item.title"
              :prepend-icon="item.action"
              no-action
            >
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile
                v-for="subItem in item.items"
                :key="subItem.title"
                @click=""
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-icon>{{ subItem.action }}</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-group>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>

  </div>



</template>

<script>

  export default {
    name: 'om-device-list',
    data () {
      return {
        items: [
          {
            action: 'computer',
            title: '设备管理',
            active: true,
            items: [
              { title: ' 设备列表' },
              { title: ' 网络拓扑' }
            ]
          },
          {
            action: 'person',
            title: '用户管理',
            items: [
              { title: '用户列表' },
              { title: '权限管理' }
            ]
          },
          {
            action: 'assignment',
            title: '服务管理',
            items: [
              { title: '数据库管理' }
            ]
          },
          {
            action: 'healing',
            title: '环境监控',
            items: [
              { title: 'Sushi111' }
            ]
          },
        ]
      }
    }
  }
</script>

<style scoped>

</style>
