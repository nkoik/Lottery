<template>
  <q-page class="history-container full-width flex row flex-center bg-blue-2">
    <router-view :key="$route.name"/>
  </q-page>
</template>

<script>

export default {
  name: 'HistoryPage'
}
</script>
