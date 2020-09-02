<template lang="pug">
#app
  h1.text-center {{ items.length === 0 ? '目前沒有事項' : breakTime ? '休息一下' : itemIndex === 0 && status === 'pause' && completedSteps === 0 ? '準備開始' : items[itemIndex].item }}
  #timer
    radial-progress-bar(
      :diameter="500",
      :completed-steps="completedSteps",
      :total-steps="totalSteps",
      startColor="black",
      stopColor="gold",
      innerStrokeColor="black",
      :strokeWidth="10",
      :innerStrokeWidth="10",
      :animateSpeed="1000"
    )
      b-img(v-if="items.length === 0", src="@/assets/nothing.gif")
      b-img(v-else-if="breakTime", src="@/assets/rest.gif")
      b-img(
        v-else-if="itemIndex === 0 && status === 'pause' && completedSteps === 0",
        src="@/assets/ready.gif"
      )
      b-img(v-else, src="@/assets/work.gif")
      font-awesome-icon#play.icon(
        size="3x",
        icon="play",
        @click="start",
        :class="{ active: items.length === 0 || status === 'running' }"
      )
      font-awesome-icon#pause.icon(size="3x", icon="pause", @click="pause")
      font-awesome-icon#forward.icon(
        size="3x",
        icon="fast-forward",
        @click="skip(true)",
        :class="{ active: items.length === 0 || status === 'pause' }"
      )
      font-awesome-icon#backward.icon(
        size="3x",
        icon="fast-backward",
        @click="skip(false)",
        :class="{ active: items.length === 0 || status === 'pause' }"
      )
</template>

<script>
import { mapMutations } from 'vuex'
import RadialProgressBar from 'vue-radial-progress'
export default {
  components: {
    RadialProgressBar
  },
  data () {
    return {
      timer: 0,
      status: 'pause'
    }
  },
  computed: {
    alarm () {
      return this.$store.getters.getAlarm
    },
    items () {
      return this.$store.getters.getItems
    },
    totalSteps () {
      return this.$store.getters.totalSteps
    },
    completedSteps () {
      return this.$store.getters.completedSteps
    },
    itemIndex () {
      return this.$store.getters.itemIndex
    },
    breakTime () {
      return this.$store.getters.breakTime
    }
  },
  methods: {
    start () {
      if (this.items.length === 0 || this.status === 'running') {
        return
      }
      this.status = 'running'
      this.timer = setInterval(() => {
        if (this.completedSteps < this.totalSteps) {
          this.$store.commit('countdown')
        } else {
          if (this.itemIndex + 1 === this.items.length) {
            this.pause()
            setTimeout(() => {
              alert('事項已結束')
            }, 1000)
            this.clearAll()
          }
          this.audioPlay()
          this.$store.commit('breakTime')
        }
      }, 1000)
    },
    audioPlay () {
      const audio = new Audio()
      audio.src = require('~/static/alarms/' + this.alarm + '.mp3')
      audio.play()
    },
    pause () {
      clearInterval(this.timer)
      this.status = 'pause'
    },
    skip (boo) {
      if (this.items.length === 0 || status === 'pause') {
        return
      }
      if (boo) {
        if (this.itemIndex + 1 === this.items.length) {
          this.pause()
          setTimeout(() => {
            alert('事項已結束')
          }, 1000)
          this.clearAll()
          this.audioPlay()
          this.$store.commit('breakTime')
        } else {
          this.$store.commit('skip', boo)
          if (this.status === 'pause') {
            this.start()
          }
        }
      } else {
        this.$store.commit('skip', boo)
        if (this.status === 'pause') {
          this.start()
        }
      }
    },
    ...mapMutations({ clearAll: 'items/clearAll' })
  }
}
</script>

<style lang="scss" scoped>
@mixin sm {
  @media (min-width: 576px) {
    @content;
  }
}
@mixin md {
  @media (min-width: 768px) {
    @content;
  }
}
@mixin lg {
  @media (min-width: 992px) {
    @content;
  }
}
#app {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

#timer {
  border-radius: 50%;
  background: linear-gradient(#e5e4e4, #c6c6c6);
  box-shadow: 1px 1px 5px black;
  position: relative;
  transform: scale(0.7);
  @include sm {
    transform: scale(0.9);
  }
  @include md{
    transform: scale(1);
  }
}

.radial-progress-inner {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    object-fit: cover;
    max-width: 50%;
  }
  .icon {
    position: absolute;
    cursor: pointer;
    color: white;
    filter: drop-shadow(1px 1px 1px black);
    &:hover {
      transition: 0.3s;
      filter: drop-shadow(5px 5px 5px black);
    }
    &:active {
      transition: 0.3s;
      filter: none;
      color: black;
    }
  }
  #play {
    top: 10%;
  }
  #pause {
    bottom: 10%;
  }
  #forward {
    right: 10%;
  }
  #backward {
    left: 10%;
  }
  .active {
    color: rgba(0, 0, 0, 0.3) !important;
    filter: none;
    &:hover {
      filter: none;
    }
  }
}

h1 {
  color: white;
  font-weight: bolder;
  filter: drop-shadow(0 0 5px black);
}
</style>
