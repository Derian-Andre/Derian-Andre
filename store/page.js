const state = () => ({
  title: 	false,
  subtitle: false,
})

const mutations = {
  setTitle(state, title) {
    state.title = title
  },
  setSubtitle(state, subtitle) {
    state.subtitle = subtitle
  }
}

const getters = {
  getTitle: (state) => state.title,
  getSubtitle: (state) => state.subtitle
}

export default {
  state,
  mutations,
  getters
}
