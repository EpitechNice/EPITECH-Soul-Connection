<template>
  <div class="login-page">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      // Remplacez cette condition par votre logique de vérification
      if (this.username === 'Arthur' && this.password === 'Guyetand') {
        this.$router.push('/');
      } else {
        alert('Nom d\'utilisateur ou mot de passe incorrect');
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  max-width: 300px;
  margin: auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 1em;
}
</style>