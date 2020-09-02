<template lang="pug">
#ringtone
  b-container.p-0.py-5
    b-table(
      :items="items",
      :fields="fields",
      thead-tr-class="text-center",
      selected-variant="white",
      selectable,
      select-mode="single",
      @row-clicked="selectAudio($event.name)"
    )
      template(v-slot:cell(preview)="row")
        vue-plyr.player
          audio
            source(
              :src="require('~/static/alarms/' + row.item.name + '.mp3')",
              type="audio/mp3"
            )
      template(v-slot:cell(select)="row")
        font-awesome-icon(v-if="row.item.name === getAlarm", icon="check")
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      items: [{ name: 'alarm1' }, { name: 'ama' }, { name: 'nofeel' }],
      fields: [
        {
          key: 'name',
          label: '名稱',
          class: 'text-center align-middle text-style'
        },
        {
          key: 'preview',
          label: '預覽',
          class: 'text-center align-middle text-style'
        },
        {
          key: 'select',
          label: '選擇',
          class: 'text-center align-middle text-style'
        }
      ]
    }
  },
  computed: {
    getAlarm () {
      return this.$store.getters.getAlarm
    }
  },
  methods: {
    ...mapMutations({ selectAudio: 'alarms/changAlarm' })
  },
  head () {
    return {
      title: 'ringtone'
    }
  }
}
</script>

<style lang="scss">
.text-style {
  font-weight: bolder;
  filter: drop-shadow(0px 0px 1px antiquewhite);
  color: white;
}

.plyr__controls {
  border-radius: 10rem !important;
  background: linear-gradient(white, gray 50%, gray) !important;
  button {
    &:first-child {
      border-radius: 50%;
    }
  }
  input {
    color: darkgrey !important;
  }
}
</style>
