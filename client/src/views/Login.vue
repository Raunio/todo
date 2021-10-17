<template>
    <div>
        <h1>LOGIN</h1>
        <form @submit.prevent="login">
            <input v-model="username" placeholder="username" />
            <br />
            <br />
            <input v-model="password" placeholder="password" type="password" />
            <br />
            <br />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import LoginService from '../services/login.service';
import { defineComponent } from 'vue';

export default defineComponent ({
  name: 'login-component',
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapMutations(["setUser", "setToken"]),
    async login(e) {
        LoginService.login(this.username, this.password).catch(er => {
          this.$router.push('login');
        }).then(resp => {
            this.setUser(resp.data.user);
            this.setToken(resp.data.token);

            this.$router.push('/');
        });
    },
  }
});
</script>