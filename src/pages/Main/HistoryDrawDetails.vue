<template>
  <q-card class="flex column">
    <q-btn label="Go back" color="primary" :to="{ name: 'HistoryDrawList' }" />
    <template v-if="!loading && drawDetails(id) !== null">
      <div class="flex flex-center">
        <q-icon
          :name="drawWon ? 'verified' : 'clear'"
          :color="drawWon ? 'green-4' : 'red-4'"
          size="34px"
        />
        <div class="text-h5 q-pa-sm">{{ drawWon ? 'Won' : 'Lost' }}</div>
      </div>
      <q-separator />
      <div class="text-h6 q-pa-sm">{{ drawDateTime }}</div>
      <lottery-ball-tank
        title="Draw"
        class="lottery-tank self-start"
        :value="drawDetails(id).numbers"
        selectable
      />
      <lottery-ball-tank
        title="My BET"
        class="lottery-tank self-start"
        :value="drawDetails(id).betNumbers"
        :highlighted-numbers="drawDetails(id).numbers"
      />
      <q-separator />
      <div class="text-h6 text-right q-pa-sm">Total: {{ drawWon ? drawDetails(id).prize : 0 }}€</div>
    </template>
    <q-spinner v-else-if="loading" size="lg" color="primary" />
    <div v-else>No info for draw {{ id }}</div>
  </q-card>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'HistoryDrawDetails',
  props: {
    id: {
      type: String
    }
  },
  components: {
    'lottery-ball': () => import(/* webpackPrefetch: true */ '../../components/Ball.vue'),
    'lottery-ball-tank': () => import(/* webpackPrefetch: true */ '../../components/BallTank.vue')
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState({
      oldDraws: state => state.history.oldDraws
    }),
    ...mapGetters('history', ['drawDetails']),
    drawDateTime () {
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      }
      return new Intl.DateTimeFormat('en-GB', options).format(new Date(this.drawDetails(this.id).timestamp))
    },
    drawWon () {
      return this.drawDetails(this.id).prize > 0
    }
  },
  methods: {
    ...mapMutations({
      clearDrawHistory: 'history/RESET_SELECTED_DRAW'
    }),
    ...mapActions({
      getDraw: 'history/getDraw'
    }),
    gotoHistory () {
      this.$router.replace({ name: 'HistoryDrawList' })
    }
  },
  mounted () {
    this.loading = true
    this.getDraw(this.id)
      .then(() => {
        this.loading = false
      })
      // eslint-disable-next-line
      .catch((err) => {
        this.loading = false
      })
  },
  destroyed () {
    this.clearDrawHistory()
  },
  created () {
    if (this.oldDraws.length === 0) {
      this.gotoHistory()
    }
  }
}
</script>
