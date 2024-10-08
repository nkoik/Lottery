<template>
  <q-page class="home-container full-width flex row flex-center bg-blue-2">
    <div class="flex justify-between col-sm-10 col-md-8 col-lg-6">
      <q-card class="flex column justify-between">
        <lottery-ball-tank
          :title="`Draw ${ drawTimeStamp ? `#${drawUID}` : ''}`"
          class="lottery-tank self-start"
          :value="randomDrawNumbers"
          selectable
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
          <q-avatar
            :icon="priceWon > 0 ? 'verified' : 'clear'"
            :color="priceWon > 0 ? 'green-4' : 'red-4'"
            text-color="white"
          />
          <div class="text-h6 q-ml-sm">
            Total winning amount: {{ priceWon + '€'}}
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <template v-if="!loading">
            <q-btn flat label="Go back" color="primary" @click="handleGoToHome" />
            <q-btn label="Save coupon" color="primary" @click="handleSave" />
          </template>
          <q-spinner
            v-else
            color="primary"
            size="md"
          />
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
      drawTimeStamp: null,
      timeOutBeginLottery: null,
      intervalRepeatRandom: null,
      isDrawRunning: false,
      isModalOpen: false,
      loading: false
    }
  },
  computed: {
    ...mapState('draw', ['maxAllowedNumbers', 'submittedNumbers', 'drawNumbers', 'numbersRange']),
    ...mapState('authorization', ['user']),
    isEmptyDrawNumbers () {
      return this.randomDrawNumbers.length === 0
    },
    priceWon () {
      const numbersMatch = this.submittedNumbers.filter((number) => this.randomDrawNumbers.includes(number)).length
      return PRICES[numbersMatch] || 0
    },
    drawUID () {
      return `D-${this.drawTimeStamp}`
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
    handleSave () {
      this.loading = true
      const usersRef = this.$fb.db.collection('users').doc(this.user.email)
      const drawsRef = this.$fb.db.collection('draws').doc(this.drawUID)
      drawsRef.set({
        numbers: this.randomDrawNumbers,
        timestamp: this.drawTimeStamp
      })
        .then(() => {
          return usersRef.set({
            [this.drawUID]: {
              numbers: this.submittedNumbers,
              prize: this.priceWon,
              timestamp: this.drawTimeStamp
            }
          }, { merge: true })
        })
        .then(() => {
          this.loading = false
          this.handleGoToHome()
        })
        // eslint-disable-next-line
        .catch((error) => {
          this.loading = false
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'error',
            message: 'There was an error saving your bet. Try again'
          })
        })
    },
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
      this.drawTimeStamp = +new Date()
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
