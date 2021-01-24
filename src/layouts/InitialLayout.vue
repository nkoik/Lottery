<template>
  <q-layout view="hHh LpR fFf">
    <q-page-container class="container container--lottery full-width window-height row justify-center items-center">
      <q-card class="container__card">
        <q-tabs align="center">
          <q-route-tab :to="{ name: 'Login' }" label="Login" />
          <q-route-tab :to="{ name: 'Register' }" label="Register" />
        </q-tabs>
        <router-view :key="$route.name"/>
      </q-card>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  component: 'InitialLayout'
}
</script>
