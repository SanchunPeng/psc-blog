export interface State {
    cascaderFocus: boolean;
    cascaderValue: string;
    cascaderLabel: string;
    cascaderSeconeLabel: string
    cascadeThreeLabel: string
}

export default {
    state: {
      cascaderFocus: false,
      cascaderValue: '',
      cascaderLabel: '',
      cascaderSeconeLabel: '',
      cascadeThreeLabel: '',
    },
    mutations: {
      refreshCascaderFocus(state: State, value: boolean) {
          state.cascaderFocus = value;
      },
      refreshCascaderValue(state: State, value: string) {
        state.cascaderValue = value;
      },
      refreshCascaderLabel(state: State, value: string) {
        state.cascaderLabel = value;
      },
      refreshCascaderSecondLabel(state: State, value: string) {
        state.cascaderSeconeLabel = value;
      },
      refreshCascaderThreeLabel(state: State, value: string) {
        state.cascadeThreeLabel = value;
      }
    },
    getters: {
      getCascaderFocus(state: State) {
        return state.cascaderFocus;
      },
      getCascaderValue(state: State) {
        return state.cascaderValue;
      },
      getCascaderLabel(state: State) {
        return state.cascaderLabel;
      },
      getCascaderSecondLabel(state: State) {
        return state.cascaderSeconeLabel;
      },
      getCascaderThreeLabel(state: State) {
        return state.cascadeThreeLabel;
      }
    }
  }