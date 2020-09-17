<template>
  <div class="auth-page">
    <div class="container page">
      <div v-if="isLogin" class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <nuxt-link to="/register">Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages,field) in errors">
              <li v-for="(message,index) in messages" :key="index">{{field +" "+ message}}</li>
            </template>
          </ul>
          <form @submit.prevent="onLogin">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">Sign in</button>
          </form>
        </div>
      </div>
      <div v-else class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <nuxt-link to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <li>That email is already taken</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Your Name" />
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Email" />
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="password" placeholder="Password" />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/user";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errors: {
        // email: ["a", "b"],
      },
    };
  },
  computed: {
    isLogin() {
      // return this.$route.path.indexOf("/login") > -1;
      return this.$route.name === "login";
    },
  },
  methods: {
    async onLogin() {
      try {
        const data = await login({
          user: this.user,
        });
        //保存token
        this.$router.push("/");
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
  },
};
</script>