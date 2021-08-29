const state = () => ({
  name: ''
})

const mutations = {
  setName(state, name) {
    state.name = name
  }
}

const getters = {
  getName: (state) => state.name
}

export default {
  state,
  mutations,
  getters
}
