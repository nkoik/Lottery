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
          :value="submittedNumbers"
          :highlighted-numbers="randomDrawNumbers"
        />
        <div class="flex justify-center">
          <div
          class="text-h6">
            Total winning amount: {{ priceWon + '€'}}
          </div>
        </div>
      </q-card>
    </div>
     <q-dialog v-model="isModalOpen" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="verified" color="green-4" text-color="white" />
          <div class="text-h6 q-ml-sm">
            Total winning amount: {{ priceWon + '€'}}
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Go back" color="primary" @click="handleGoToHome" />
          <q-btn label="Save coupon" color="primary" @click="handleSave" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      isDrawRunning: false,
      isModalOpen: false
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
      resetDrawNumbers: 'draw/RESET_DRAW_NUMBERS',
      clearDrawState: 'draw/CLEAR_DRAW_STATE'
    }),
    handleGoToHome () {
      this.clearDrawState()
      this.$router.replace({ name: 'Home' })
    },
    handleSave () {},
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
  },
  watch: {
    randomDrawNumbers (numbers) {
      if (numbers.length >= this.maxAllowedNumbers) {
        this.resetRepeatRandomNumberBet()
        this.isDrawRunning = false
        this.isModalOpen = true
        this.setDrawNumbers(numbers)
      }
    }
  }
}
</script>
