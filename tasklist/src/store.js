import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [
      { id: 1, name: "牛乳を買う", done: false },
      { id: 2, name: "みかんを買う", done: false },
      { id: 3, name: "本を買う", done: true }
    ],
    // 次に追加するタスクのID（今回は決め打ち）
    nextTaskId: 4
  },
  mutations: {
    // タスクを追加する
    addTask(state, { name }) {
      // NOTE: プッシュで問題ないのか？
      state.tasks.push({
        id: state.nextTaskId,
        name,
        done: false
      });
      // 次に追加されるタスクに付与するIDを更新する
      state.nextTaskId++;
    },

    // タスクの完了状態を更新する
    toggleTaskStatus(state, { id }) {
      const filtered = state.tasks.filter(task => {
        return task.id === id;
      });

      filtered.forEach(task => {
        task.done = !task.done;
      });
    }
  },
  actions: {}
});
