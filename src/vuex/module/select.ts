
export interface State {
  selectValue: string,
  hoverVaue: string,
  selectLabel: string
}
  
export default {
  state: {
    selectValue: '',
    hoverVaue: '',
    selectLabel: ''
  },
  mutations: {
    refreshSelectValue(state: State, value: string) {
      state.selectValue = value;
    },
    refreshHoverValue(state: State, value: string) {
      state.hoverVaue = value;
    },
    refreshSelectLabel(state: State, value: string) {
      state.selectLabel = value;
    }
  },
  getters: {
    getSelectValue(state: State) {
      return state.selectValue;
    },
    getHoverValue(state: State) {
      return state.hoverVaue;
    },
    getSelectLabel(state: State) {
      return state.selectLabel;
    }
  }
}
    