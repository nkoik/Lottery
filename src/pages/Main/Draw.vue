<template>
  <q-page class="home-container full-width flex row flex-center bg-blue-2">
    <div class="flex justify-between col-sm-10 col-md-8 col-lg-6">
      <q-card class="flex column justify-between">
        <lottery-ball-tank
          title="Draw Numbers"
          class="lottery-tank self-start"
          :value="randomDrawNumbers"
        />
        <div class="flex justify-center">
          <q-spinner-hourglass
            v-if="isDrawRunning"
            color="primary"
            size="md"
          />
          <div
            v-if="isEmptyDrawNumbers"
          >
            Draw starts in 3 seconds
          </div>
        </div>
      </q-card>
      <q-card class="flex column justify-between">
        <lottery-ball-tank
          title="My BET"
          class="lottery-tank self-start"
          :value="submittedNumbers.sort()"
          :highlighted-numbers="randomDrawNumbers"
        />
        <div class="flex justify-center">
          <q-badge
          class="text-h6"
          outline
          color="primary">
            Total: {{ priceWon + '€'}}
          </q-badge>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import PRICES from '../../js/prices'

export default {
  name: 'DrawPage',
  components: {
    'lottery-ball-tank': () => import(/* webpackPrefetch: true */ '../../components/BallTank.vue')
  },
  data () {
    return {
      randomDrawNumbers: [],
      timeOutBeginLottery: null,
      intervalRepeatRandom: null,
      isDrawRunning: false
    }
  },
  computed: {
    ...mapState('draw', ['maxAllowedNumbers', 'submittedNumbers', 'drawNumbers', 'numbersRange']),
    isEmptyDrawNumbers () {
      return this.randomDrawNumbers.length === 0
    },
    priceWon () {
      const numbersMatch = this.submittedNumbers.filter((number) => this.randomDrawNumbers.includes(number)).length
      return PRICES[numbersMatch] || 0
    }
  },
  methods: {
    ...mapMutations({
      setDrawNumbers: 'draw/SET_DRAW_NUMBERS',
      setDrawOpen: 'draw/SET_DRAW_RUN'
    }),
    generateRandomNumberBet () {
      const randomNumber = Math.floor(Math.random() * this.numbersRange) + 1
      if (this.randomDrawNumbers.includes(randomNumber)) {
        return this.generateRandomNumberBet()
      }
      this.randomDrawNumbers.push(randomNumber)
    },
    repeatRandomNumberBet () {
      this.isDrawRunning = true
      this.resetBeginLottery()
      this.generateRandomNumberBet()
      this.intervalRepeatRandom = setInterval(() => {
        if (this.randomDrawNumbers.length >= this.maxAllowedNumbers) {
          this.isDrawRunning = false
          this.resetRepeatRandomNumberBet()
          this.setDrawNumbers(this.randomDrawNumbers)
          return
        }
        this.generateRandomNumberBet()
      }, 4000)
    },
    beginLottery () {
      this.timeOutBeginLottery = setTimeout(() => {
        this.repeatRandomNumberBet()
      }, 3000)
    },
    resetBeginLottery () {
      clearTimeout(this.timeOutBeginLottery)
      this.timeOutBeginLottery = null
    },
    resetRepeatRandomNumberBet () {
      clearInterval(this.intervalRepeatRandom)
      this.intervalRepeatRandom = null
    }
  },
  mounted () {
    this.beginLottery()
  }
}
</script>
