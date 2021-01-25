<template>
  <q-page class="home-container full-width flex row flex-center bg-blue-2">
    <div class="flex justify-between col-sm-10 col-md-8 col-lg-6">
      <lottery-ball-table
        class="lottery-table self-start"
        v-model="selectedNumbers"
      />
      <q-card class="flex column justify-between">
        <lottery-ball-tank
          title="My BET"
          class="lottery-tank self-start"
          v-model="selectedNumbers"
          clearable
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
      setDrawOpen: 'draw/SET_DRAW_RUN'
    }),
    handleSubmitBet () {
      this.setDrawOpen(true)
      this.submitNumbers(this.selectedNumbers)
      this.$router.replace({ name: 'Draw' })
    }
  }
}
</script>
