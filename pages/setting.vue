<template lang="pug">
#setting
  b-container.p-0
    b-row.flex-nowrap.py-3.m-0
      b-input.mr-3(v-model="item")
      b-button(
        variant="dark",
        style="flex-basis:70px",
        @click="[addItem({ item: item, minute: 25,second:0, breakTimeM: 5,breakTimeS:0,itemModel:item }),clear()]"
      ) 新增
    b-table(:items="items" :fields="fields" thead-tr-class="text-center")
      template(v-slot:cell(time)="row")
        p.m-0(@click="[editTime(row.item),showModal(row.field.label+row.index)]" style="cursor:pointer") {{ ((row.item.minute.toString().length < 2) ? '0'+row.item.minute : row.item.minute) + ':' +  ((row.item.second.toString().length < 2) ? '0'+row.item.second : row.item.second) }}
        b-modal(:id="row.field.label+row.index" centered header-text-variant="white" header-bg-variant="dark" ok-variant="dark" ok-only @ok="changeTime({minute:minute,second:second,index:row.index})")
          template(v-slot:modal-title)
            | 更改時間
          b-container
            b-row
              b-col.d-flex.flex-column
                label.align-self-center(:for="row.field + 'minute'") 分鐘
                b-form-spinbutton(:max="59" :min="0" v-model="minute" inline :id="row.field + 'minute'")
              b-col.d-flex.flex-column
                label.align-self-center(:for="row.field + 'second'") 秒鐘
                b-form-spinbutton(:max="59" :min="0" v-model="second" inline :id="row.field + 'second'")
      template(v-slot:cell(breakTime)="row")
        p.m-0(@click="[editBreakTime(row.item),showModal(row.field.label+row.index)]" style="cursor:pointer") {{ ((row.item.breakTimeM.toString().length < 2) ? '0'+row.item.breakTimeM : row.item.breakTimeM) + ':' + ((row.item.breakTimeS.toString().length < 2) ? '0'+row.item.breakTimeS : row.item.breakTimeS) }}
        b-modal(:id="row.field.label+row.index" centered ok-only header-text-variant="white" header-bg-variant="dark" ok-variant="dark" @ok="changeBreakTime({breakTimeM:breakTimeM,breakTimeS:breakTimeS,index:row.index})")
          template(v-slot:modal-title)
            | 更改休息時間
          b-container
            b-row
              b-col.d-flex.flex-column
                label.align-self-center(:for="row.field + 'breakTimeM'") 分鐘
                b-form-spinbutton(:max="59" :min="0" v-model="breakTimeM" inline :id="row.field + 'breakTimeM'")
              b-col.d-flex.flex-column
                label.align-self-center(:for="row.field + 'breakTimeS'") 秒鐘
                b-form-spinbutton(:max="59" :min="0" v-model="breakTimeS" inline :id="row.field + 'breakTimeS'")
      template(v-slot:cell(action)="row")
        font-awesome-icon(icon="times" color="black" @click="deleteItem(row.index)" style="cursor:pointer")
      template(v-slot:cell(item)="row")
        p.m-0(@click="[editItem(row.item.item),showModal(row.field.label+row.index)]" style="cursor:pointer") {{ row.item.item }}
        b-modal(:id="row.field.label+row.index" header-text-variant="white" header-bg-variant="dark" ok-variant="dark" centered ok-only @ok="changeItem({item:itemName,index:row.index})")
          template(v-slot:modal-title)
            | 更改事項名稱
          b-input(v-model="itemName")
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      fields: [
        { key: 'item', label: '事項', class: 'text-center align-middle text-style' },
        { key: 'time', label: '時間', class: 'text-center align-middle text-style' },
        { key: 'breakTime', label: '休息時間', class: 'text-center align-middle text-style' },
        { key: 'action', label: '操作', class: 'text-center align-middle text-style' }
      ],
      item: '',
      minute: '',
      second: '',
      breakTimeM: '',
      breakTimeS: '',
      itemName: ''
    }
  },
  computed: {
    items () {
      return this.$store.getters.getItems
    }
  },
  methods: {
    clear () {
      this.item = ''
    },
    editTime (data) {
      this.minute = data.minute
      this.second = data.second
    },
    editBreakTime (data) {
      this.breakTimeM = data.breakTimeM
      this.breakTimeS = data.breakTimeS
    },
    editItem (data) {
      this.itemName = data
    },
    showModal (id) {
      this.$bvModal.show(id)
    },
    ...mapMutations({ addItem: 'items/addItem' }),
    ...mapMutations({ changeTime: 'items/changeTime' }),
    ...mapMutations({ changeBreakTime: 'items/changeBreakTime' }),
    ...mapMutations({ changeItem: 'items/changeItem' }),
    ...mapMutations({ deleteItem: 'items/deleteItem' })
  },
  head () {
    return {
      title: 'setting'
    }
  }
}
</script>

<style lang="scss">
.text-style{
  font-weight: bolder;
  filter: drop-shadow(0px 0px 1px antiquewhite);
  color: white;
}
</style>
