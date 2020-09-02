export const state = () => ({
  items: []
})

export const mutations = {
  addItem (state, data) {
    state.items.push(data)
  },
  deleteItem (state, data) {
    state.items.splice(data, 1)
  },
  changeTime (state, data) {
    state.items[data.index].minute = data.minute
    state.items[data.index].second = data.second
  },
  changeBreakTime (state, data) {
    state.items[data.index].breakTimeM = data.breakTimeM
    state.items[data.index].breakTimeS = data.breakTimeS
  },
  changeItem (state, data) {
    state.items[data.index].item = data.item
  },
  clearAll (state) {
    state.items = []
  }
}
