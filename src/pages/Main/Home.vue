<template>
  <q-page class="home-container full-width flex flex-center bg-blue-2">
    <lottery-ball-table
      class="lottery-table"
      v-model="selectedNumbers"
    />
  </q-page>
</template>

<script>
export default {
  name: 'HomePage',
  components: {
    'lottery-ball-table': () => import(/* webpackPrefetch: true */ '../../components/BallTable.vue')
  },
  data () {
    return {
      selectedNumbers: []
    }
  }
}
</script>
