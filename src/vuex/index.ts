import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export interface State {
  currentLabel: string;
}

const store = new Vuex.Store({
  state: {
    currentLabel: '',
  },
  mutations: {
    refreshCurrentLabel(state: State, value: string) {
      state.currentLabel = value;
    }
  },
  getters: {
    getCurrentLabel(state: State) {
      return state.currentLabel;
    }
  }
});

export default store;
