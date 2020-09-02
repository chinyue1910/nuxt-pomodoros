export const state = () => ({
  alarm: 'alarm1'
})

export const mutations = {
  changAlarm (state, data) {
    state.alarm = data
  }
}
