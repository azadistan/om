<template>
  <div style="width:30.25rem;margin:0px 0 2px 0px;float:bottom; border-top:#e0e0e0 solid 1px;">
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      :pagination.sync="pagination"
      select-all
      item-key="name"
      class="elevation-1"
      hide-actions
    >
      <template slot="headers" slot-scope="props">
        <tr>
          <th>
            <v-checkbox
              :input-value="props.all"
              :indeterminate="props.indeterminate"
              primary
              hide-details
              @click.native="toggleAll"
            ></v-checkbox>
          </th>
          <th
            v-for="header in props.headers"
            :key="header.text"
          >
            {{ header.text }}
          </th>
          <v-btn small color="primary" dark style="margin:1rem 2rem 0 2rem">批量下载</v-btn>
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <tr :active="props.selected" @click="props.selected = !props.selected">
          <td>
            <v-checkbox
              :input-value="props.selected"
              primary
              hide-details
            ></v-checkbox>
          </td>
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.calories }}</td>
          <div style="float: left;margin:0.95rem 0 0 0;color: #1978CB">详情</div>
          <div style="float: left;margin:0.95rem 0 0 0;color: #1978CB">下载</div>
        </tr>
      </template>
    </v-data-table>

  </div>
</template>

<script>
  export default {
    name: 'pm-spe-search-result',
    data(){
      return{
        selected: [],
        headers: [
          {
            text: '专题名称 ',
            align: 'left',
            value: 'name'
          },
          { text: 'Calories', value: 'calories' },
        ],
        desserts: [
          {
            value: false,
            name: '111',
            calories: 159,
          },{
            value: false,
            name: '111',
            calories: 111,
          },]
      }
    },
    methods: {
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.desserts.slice()
      },
    }
  }
</script>

<style scoped>

</style>
