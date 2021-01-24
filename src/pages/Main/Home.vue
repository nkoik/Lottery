<template>
  <q-page class="home-container full-width flex row flex-center bg-blue-2">
    <div class="flex justify-between col-6">
      <lottery-ball-table
        class="lottery-table self-start"
        v-model="selectedNumbers"
      />
      <q-card class="flex column justify-between">
        <lottery-ball-tank
          class="lottery-tank self-start"
          v-model="selectedNumbers"
        />
        <span
          class="text-center"
          v-show="isEmptySelectedNumbers"
        >
          No numbers
        </span>
        <q-btn
        :disable="isDisabledSubmitButton"
        color="primary"
        label="Submit Bet"
        @click="handleSubmitBet"
       />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'HomePage',
  components: {
    'lottery-ball-table': () => import(/* webpackPrefetch: true */ '../../components/BallTable.vue'),
    'lottery-ball-tank': () => import(/* webpackPrefetch: true */ '../../components/BallTank.vue')
  },
  data () {
    return {
      selectedNumbers: []
    }
  },
  computed: {
    ...mapState('draw', ['maxAllowedNumbers']),
    isEmptySelectedNumbers () {
      return this.selectedNumbers.length === 0
    },
    isDisabledSubmitButton () {
      return this.selectedNumbers.length < this.maxAllowedNumbers
    }
  },
  methods: {
    ...mapMutations({
      submitNumbers: 'draw/SET_SUBMITTED_NUMBERS',
      isDrawOpen: 'draw/SET_DRAW_RUN'
    }),
    handleSubmitBet () {
      this.submitNumbers(this.selectedNumbers)
      this.isDrawOpen(true)
      this.$router.push({ name: 'Draw' })
    }
  }
}
</script>
