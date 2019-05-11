import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [
      { id: 1, name: "牛乳を買う", labelIds: [1, 2], done: false },
      { id: 2, name: "みかんを買う", labelIds: [1, 2], done: false },
      { id: 3, name: "本を買う", labelIds: [1, 3], done: true }
    ],
    labels: [
      {
        id: 1,
        text: "買い物"
      },
      {
        id: 2,
        text: "食料"
      },
      {
        id: 3,
        text: "本"
      }
    ],
    // 次に追加するタスクのID（今回は決め打ち）
    nextTaskId: 4,
    // 次に追加するラベルのID（今回は決め打ち）
    nextLabelId: 4
  },
  mutations: {
    // タスクを追加する
    addTask(state, { name, labelIds }) {
      // NOTE: プッシュで問題ないのか？
      state.tasks.push({
        id: state.nextTaskId,
        name,
        labelIds,
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
    },

    // ラベルを追加する
    addLabel(state, { text }) {
      state.labels.push({
        id: state.nextLabelId,
        text
      });
      // 次に追加されるラベルに付与するIDを更新する
      state.nextLabelId++;
    }
  },
  actions: {}
});
