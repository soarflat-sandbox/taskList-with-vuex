<template>
  <div id="app">
    <h2>タスク一覧</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input
          type="checkbox"
          :checked="task.done"
          @change="toggleTaskStatus(task)"
        />
        {{ task.name }}
        -
        <span v-for="id in task.labelIds" :key="id">
          {{ getLabelText(id) }}
        </span>
      </li>
    </ul>

    <form @submit.prevent="addTask">
      <input type="text" v-model="newTaskName" placeholder="新しいタスク" />
    </form>

    <h2>ラベル一覧</h2>
    <ul>
      <li v-for="label in labels" :key="label.id">
        <input type="checkbox" :value="label.id" v-model="newTaskLabelIds" />
        {{ label.text }}
      </li>
    </ul>

    <form @submit.prevent="addLabel">
      <input type="text" v-model="newLabelText" placeholder="新しいラベル" />
    </form>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      // 入力中の新しいタスク名を一時的に保持する
      newTaskName: "",

      // 新しいタスクに紐づくラベル一覧を一時的に保持する
      newTaskLabelIds: [],

      // 入力中の新しいラベル名を一時的に保持する
      newLabelText: ""
    };
  },
  computed: {
    tasks() {
      // Vuex Storeのstateを利用してcomputedを定義している
      // gettersを定義するのではなく、コンポーネント内で定義するのが一般的？
      return this.$store.state.tasks;
    },
    labels() {
      return this.$store.state.labels;
    }
  },
  methods: {
    // タスクを追加する
    addTask() {
      this.$store.commit("addTask", {
        name: this.newTaskName,
        labelIds: this.newTaskLabelIds
      });
      this.newTaskName = "";
      this.newTaskLabelIds = [];
    },

    // タスクの完了状態を更新する
    toggleTaskStatus(task) {
      this.$store.commit("toggleTaskStatus", { id: task.id });
    },

    // ラベルを追加する
    addLabel() {
      this.$store.commit("addLabel", {
        text: this.newLabelText
      });
      this.newLabelText = "";
    },

    // ラベルのIDから、そのラベルのテキストを返す
    // labelsはVuex Storeに保持されているため、
    // getLabelTextはVuex Storeに定義することも可能だが、
    // サンプルではコンポーネント内で定義している。このコンポーネントでしか利用しないから？
    getLabelText(id) {
      const label = this.labels.filter(label => label.id === id)[0];
      return label ? label.text : "";
    }
  }
};
</script>
