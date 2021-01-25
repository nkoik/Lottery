<template>
  <q-page class="history-container full-width flex row flex-center bg-blue-2">
    <q-list bordered class="history-list rounded-borders col-8 bg-white flex column flex-center" >
      <q-item-label v-if="loadingData || paginatedDrawsList.length !== 0" header>All bets sorted by Date</q-item-label>
      <template v-if="!loadingData && paginatedDrawsList.length !== 0">
        <div class="full-width" v-for="draw in paginatedDrawsList" :key="draw.id">
          <list-item
            :ticket="{
              id: draw.id,
              prize: draw.prize,
              won: draw.prize > 0
            }"
            @delete="handleDeleteRow(draw.id)"
          >
            <lottery-ball
              class="q-mx-xs"
              v-for="ball in draw.numbers"
              :label="ball"
              size="sm"
              :key="ball"
              disabled
              selected
            />
          </list-item>
          <q-separator />
        </div>
      </template>
      <div class="q-pa-lg" v-else-if="!loadingData">No bets</div>
      <q-spinner size="lg" color="primary" v-else />
      <q-pagination
        v-model="currentPage"
        class="q-my-md"
        color="primary"
        :max="maxButtonsShown"
        :max-pages="maxPerPage"
        :boundary-numbers="true"
      />
    </q-list>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'HistoryPage',
  components: {
    'list-item': () => import(/* webpackPrefetch: true */ '../../components/HistoryListItem.vue'),
    'lottery-ball': () => import(/* webpackPrefetch: true */ '../../components/Ball.vue')
  },
  data () {
    return {
      loadingData: false,
      currentPage: 1
    }
  },
  computed: {
    ...mapState('history', ['oldDraws', 'maxPerPage']),
    paginatedDrawsList () {
      const lastIndex = this.currentPage * this.maxPerPage
      const firstIndex = lastIndex - this.maxPerPage
      return this.oldDraws.slice(firstIndex, lastIndex)
    },
    maxButtonsShown () {
      return Math.ceil(this.oldDraws.length / this.maxPerPage)
    }
  },
  methods: {
    ...mapActions({
      getDraws: 'history/getDraws'
    }),
    handleDeleteRow (id) {}
  },
  mounted () {
    this.getDraws()
    const f = this.paginatedDrawsList
    if (f) {
      this.loadingData = false
    }
  }
}
</script>
