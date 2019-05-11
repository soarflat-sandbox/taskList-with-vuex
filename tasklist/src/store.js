import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [
      { id: 1, name: "牛乳を買う", done: false },
      { id: 2, name: "みかんを買う", done: false },
      { id: 3, name: "本を買う", done: true }
    ]
  },
  mutations: {},
  actions: {}
});
