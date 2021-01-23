<template>
  <q-layout view="hHh LpR fFf">

    <q-header class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/page1" label="Home" />
        <q-route-tab to="/page2" label="Live Draw" />
        <q-route-tab to="/page3" label="History" />
      </q-tabs>
    </q-header>

    <q-page-container class="full-width row wrap justify-center items-center content-center">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  component: 'MainLayout',
  data () {
    return {
    }
  }
}
</script>
