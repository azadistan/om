<template>
  <div style="width:30.25rem;margin:0px 0 20rem 0px;float:bottom; border-top:#e0e0e0 solid 1px;">
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
          style="padding: 0 2.5rem 0 1rem"
        >
          {{ header.text }}
        </th>
        <v-btn small color="primary" dark style="margin:1rem 1rem 0 2rem">批量下载</v-btn>
      </tr>
    </template>
    <template slot="items" slot-scope="props">
      <tr :active="props.selected" @click="props.selected = !props.selected">
        <td>
          <v-checkbox
            :input-value="props.selected"
            primary
            hide-details
            style="margin: 2px 0rem 0 0rem;"
          ></v-checkbox>
        </td>
      </tr>
      <td :title=props.item.name style="padding: 0 1.2rem 0 0rem;">{{omitName(props.item.name)}}</td>
      <td :title=props.item.calories style="padding: 0 0rem 0 1rem">{{ omitName(props.item.calories) }}</td>
      <div style="float: left;margin:0 -0.2rem 0.2rem 2.5rem;color: #1978CB;">详情</div>
      <div style="float: left;margin:0.3rem 0 0 0;width:1rem;height:1rem;border-right:#e0e0e0 solid 1px;"></div>
      <div style="float: left;margin:0 0 0 0.5rem;color: #1978CB">下载</div>
    </template>
  </v-data-table>
  </div>
</template>

<script>
  export default {
    name: 'pm-spe-search-result',
    data(){
     return{
       seen:false,
       pagination: {
         sortBy: 'name'
       },
       selected: [],
       headers: [
         {
           text: '专题名称',
           align: 'left',
           value: 'name'
         },
         { text: '所属行业', value: 'calories' }
       ],
       desserts: [
         {
           value: false,
           name: '长春热岛效应',
           calories: "农业 林业 畜牧业"
         },
         {
           value: false,
           name: '吉林热岛效应',
           calories: "农业 林业 畜牧业"
         },
         {
           value: false,
           name: '北京热岛效应111',
           calories: "农业 林业 畜牧业"
         },
         {
           value: false,
           name: 'Ice111111111',
           calories: "1111111"
         },
       ]
     }
    },
    mounted(){
    },
    methods: {
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.desserts.slice()
      },
      omitName(str){
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
          charCode = str.charCodeAt(i);
          if (charCode >= 0 && charCode <= 128) realLength += 1;
          else realLength += 2;
        }
        if(realLength>12){
           return str.substring(0, 5)+"..."
          return str
        }
        else
          return str
      },

    }
  }
</script>

<style scoped>

</style>
