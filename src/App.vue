<template>
  <div class="container">
    <nav class="navbar">
      <div class="container">
        <ul class="navbar-list">
          <li class="navbar-item"><a class="navbar-link" href="#"><strong>Speech Synopsis</strong></a></li>
          <li v-if="canLogout" class="navbar-item nav-bar-right"><a class="navbar-link" @click="logout">Logout</a></li>
        </ul>
      </div>
    </nav>
    <main>
      <RouterView />
    </main>
    <vue3-confirm-dialog></vue3-confirm-dialog>
  </div>
</template>
<script>

export default {
  data() {
    return {
      canLogout: false
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    }
  },
  async mounted() {
    // const isAuthenticated = await this.$auth.isAuthenticated();
    // if(isAuthenticated) {
    //     this.canLogout = true;
    // }
  }
}
</script>
<style scoped>
.nav-bar-right {
  float: right;
}

.nav-bar-right a {
  margin-right: 0;
  cursor: pointer;
}
</style>