<template>
  <q-layout view="hHh LpR fFf">

    <q-header class="bg-primary text-white row no-wrap" height-hint="98">
      <q-toolbar class="col-8">
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Lottery
        </q-toolbar-title>
        <q-tabs align="left">
          <q-route-tab :to="{ name: 'Home' }" label="Home" :disable="isDrawOpen" />
          <q-route-tab :to="{ name: 'Draw' }" label="Live Draw" :disable="!isDrawOpen" />
          <q-route-tab :to="{ name: 'HistoryDrawList' }" label="History" :disable="isDrawOpen" />
        </q-tabs>
        <!-- <q-space /> -->
      </q-toolbar>
      <q-toolbar class="col-4">
        <q-toolbar-title align="right">
          <q-btn @click="handleLogoutUser">
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
            </q-avatar>
            Logout
          </q-btn>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="full-width row wrap justify-center items-center content-center">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  component: 'MainLayout',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      isDrawOpen: state => state.draw.isDrawOpen
    })
  },
  methods: {
    ...mapMutations({
      clearDrawState: 'draw/CLEAR_DRAW_STATE',
      clearDrawHistory: 'history/RESET_DRAWS'
    }),
    ...mapActions({
      logoutUser: 'authorization/logoutUser'
    }),
    handleLogoutUser () {
      this.logoutUser()
        .then(() => {
          this.$router.replace({ name: 'Login' })
          this.clearDrawState()
          this.clearDrawHistory()
        })
    }
  }
}
</script>
