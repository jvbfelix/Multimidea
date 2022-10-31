import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    current_point: [0, 0],
    points_list: [],
  },
  mutations: {
    set_current_point: (state, point) => {
      state.current_point = point;
    },
    add_points_list: (state, points) => {
      state.points_list.push(points);
    },
  },
  getters: {
    current_point: (state) => state.current_point,
    points_list: (state) => state.points_list,
  },
  actions: {},
  modules: {},
});
