<template>
  <div class="flex column col-8">
    <div v-if="!loading && paginatedDrawsList.length !== 0" class="flex row justify-around q-mb-md history-list">
      <q-card flat class="col-4 q-pa-md flex flex-center column">
        <q-item-label class="text-h5 text-grey-8">Total Amount Won</q-item-label>
        <q-card-section class="text-h6">{{ totalWon.sum + ' €' }}</q-card-section>
      </q-card>
      <q-card flat class="col-4 q-pa-md flex flex-center column">
        <q-item-label class="text-h5 text-grey-8">Success Rate</q-item-label>
        <q-card-section class="text-h6">{{ wonPercentage + '%' }}</q-card-section>
      </q-card>
    </div>
    <q-list bordered class="history-list rounded-borders full-width bg-white flex column flex-center" >
      <q-item-label v-if="loading || paginatedDrawsList.length !== 0" header>All bets sorted by Date</q-item-label>
      <q-spinner v-if="loading"  size="lg" color="primary"/>
      <template v-else-if="paginatedDrawsList.length !== 0">
        <div class="full-width" v-for="draw in paginatedDrawsList" :key="draw.id">
          <list-item
            :ticket="{
              id: draw.id,
              prize: draw.prize,
              won: draw.prize > 0
            }"
            @click.native="handleDrawDetails(draw.id)"
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
      <div class="q-pa-lg" v-else>No bets</div>
      <q-pagination
        v-if="!loading && paginatedDrawsList.length !== 0"
        v-model="currentPage"
        class="q-my-md"
        color="primary"
        :max="maxButtonsShown"
        :max-pages="maxPerPage"
        :boundary-numbers="true"
      />
    </q-list>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'HistoryDrawList',
  components: {
    'list-item': () => import(/* webpackPrefetch: true */ '../../components/HistoryListItem.vue'),
    'lottery-ball': () => import(/* webpackPrefetch: true */ '../../components/Ball.vue')
  },
  data () {
    return {
      loading: true,
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
    },
    totalWon () {
      return this.oldDraws.reduce((acc, val) => {
        return {
          sum: acc.sum + val.prize,
          successCount: val.prize > 0 ? ++acc.successCount : acc.successCount
        }
      }, { sum: 0, successCount: 0 })
    },
    wonPercentage () {
      return Math.round(this.totalWon.successCount / this.oldDraws.length * 100)
    }
  },
  methods: {
    ...mapActions({
      getDraws: 'history/getDraws',
      deleteDraw: 'history/deleteDraw'
    }),
    handleDrawDetails (id) {
      this.$router.push({ name: 'HistoryDrawDetails', params: { id } })
    },
    handleDeleteRow (id) {
      this.loading = true
      this.deleteDraw(id)
        .then(() => {
          this.loading = false
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'clear',
            message: 'Draw deleted from history board'
          })
        })
        // eslint-disable-next-line
        .catch((err) => {
          this.loading = false
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            message: 'Try again'
          })
        })
    }
  },
  mounted () {
    this.getDraws()
      .finally(() => {
        this.loading = false
      })
  }
}
</script>
