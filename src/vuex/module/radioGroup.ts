
export interface State {
  radioGroupValue: string
}

export default {
  state: {
    radioGroupValue: ''
  },
  mutations: {
    refreshRadioGroupValue(state: State, value: string) {
      state.radioGroupValue = value;
    }
  },
  getters: {
    getRadioGroupValue(state: State) {
      return state.radioGroupValue;
    }
  }
}
  