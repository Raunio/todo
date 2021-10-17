<script>
import { ref } from 'vue'
import router from '../router/router';
import { mapGetters } from 'vuex';
import TaskList from '../components/TaskList.vue';
export default {
  computed: {
    ...mapGetters(["isLoggedIn", "getUser"])
  },
  components: {
    TaskList
  }
};
//defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <div>
    Welcome
    <router-link v-if="!isLoggedIn" to="/login"><button>Login</button></router-link>
    <span v-if="isLoggedIn">{{ getUser }}</span>
    <TaskList v-if="isLoggedIn"></TaskList>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
