import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    purchaseOrder: {
      items: [],
      distance: 0
    }
  },
  mutations: {
    changePurchaseOrder: (state, data) => {
      state.purchaseOrder = data;
    }
  },
  getters: {
    getPurchaseOrder: state => {
      return state.purchaseOrder;
    },
  },
  actions: {
    changePurchaseOrder: ({commit}, value) => {
      commit('changePurchaseOrder', value);
    },
  },
});
