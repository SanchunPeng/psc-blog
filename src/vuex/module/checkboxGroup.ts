export interface State {
  checkboxGroupList: string[]
}

export default {
  state: {
    checkboxGroupList: []
  },
  mutations: {
    refreshCheckboxGroupValue(state: State, value: string[]) {
      state.checkboxGroupList = value;
    }
  },
  getters: {
    getCheckboxGroupList(state: State) {
      return state.checkboxGroupList;
    }
  }
}
