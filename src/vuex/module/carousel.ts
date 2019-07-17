export interface State {
    activeIndex: number;
  }
  
  export default {
    state: {
        activeIndex: 0
    },
    mutations: {
      refreshActiveIndex(state: State, value: number) {
        state.activeIndex = value;
      }
    },
    getters: {
      getActiveIndex(state: State) {
        return state.activeIndex;
      }
    }
  }
  