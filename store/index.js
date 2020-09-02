export const state = () => ({
  completedSteps: 0,
  itemIndex: 0,
  breakTime: false
})

export const mutations = {
  countdown (state) {
    state.completedSteps++
  },
  breakTime (state) {
    if (state.items.items.length === 0) {
      state.itemIndex = 0
    } else {
      if (state.breakTime) {
        state.itemIndex++
      }
      state.breakTime = !state.breakTime
    }
    state.completedSteps = 0
  },
  skip (state, data) {
    state.completedSteps = 0
    if (state.breakTime) {
      if (data) {
        state.itemIndex++
        state.breakTime = false
      } else {
        state.breakTime = false
      }
    } else if (!state.breakTime) {
      if (data) {
        state.itemIndex++
      } else if (state.itemIndex !== 0) {
        state.itemIndex--
      }
    }
  }
}

export const getters = {
  getItems (state) {
    return state.items.items
  },
  totalSteps (state) {
    if (state.breakTime) {
      return (state.items.items.length === 0) ? 0 : state.items.items[state.itemIndex].breakTimeM * 60 + state.items.items[state.itemIndex].breakTimeS
    } else {
      return (state.items.items.length === 0) ? 0 : state.items.items[state.itemIndex].minute * 60 + state.items.items[state.itemIndex].second
    }
  },
  completedSteps (state) {
    return state.completedSteps
  },
  itemIndex (state) {
    return state.itemIndex
  },
  breakTime (state) {
    return state.breakTime
  },
  getAlarm (state) {
    return state.alarms.alarm
  }
}
