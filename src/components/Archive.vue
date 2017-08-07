<template>
  <div id="archive">
    <div class="group">
      <h2><slot></slot></h2>
      <a class="button is-danger" @click="clearStorage">Reset</a>
    </div>
    <div class="toast" v-if="toast.isVisible" :class="toast.class">
      <p>{{ toast.message }}</p>
      <a class="button" @click="hideToast">X</a>
    </div>
    <table class="table is-bordered is-striped is-fullwidth">
      <thead>
        <tr>
          <th>Position</th>
          <th>Date</th>
          <th>From</th>
          <th>To</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(t, index) in transactions">
          <th>{{ index + 1 }}</th>
          <td>{{ t.date }}</td>
          <td>{{ t.from }}</td>
          <td>{{ t.to }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'archive',
  computed: {
    transactions() {
      return this.$store.getters.transactions;
    },
    toast() {
      return this.$store.getters.toast;
    }
  },
  methods: {
    clearStorage() {
      this.$store.commit('clearStorage');
    },
    hideToast() {
      this.$store.commit('hideToast');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#archive {
  background-color: transparent;
  padding: 30px;
}

#archive > h2 {
  font-size: 16px;
  margin-bottom: 2em;
  text-align: left;
}

#archive .group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}

#archive .group .button {
  width: 125px;
}

.toast {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 10px 0;
}

.toast p {
  padding: 10px 15px;
}

.toast .button {
  background-color: transparent;
  border: none;
}

.toast .button:active,
.toast .button:focus {
  -webkit-box-shadow: none;
  box-shadow: none;
}

.toast.info {
  background-color: rgba(255,192,99,0.5);
  border: 1px solid rgb(255,192,99);
}

.toast.warning {
  background-color: rgba(255,34,34,0.5);
  border: 1px solid rgb(255,34,34);
}

</style>
