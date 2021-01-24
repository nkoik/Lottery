<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card">
      <div class="text-h6 bg-grey-4 q-pa-md">Select 5 numbers</div>
      <q-separator />
      <div class="row wrap items-center q-py-md">
        <lottery-ball
          class="q-ma-sm"
          @select="handleSelect"
          v-for="number in range"
          :selected="value.includes(number)"
          :key="number"
          :label="number"
        />
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'LotteryBallTable',
  props: {
    maxAllowed: {
      type: [String, Number],
      default: 5
    },
    value: {
      type: [Array],
      default: () => []
    },
    range: {
      type: Number,
      default: 30
    }
  },
  methods: {
    handleSelect (number) {
      if (!this.value.includes(number) &&
      this.value.length < this.maxAllowed) {
        this.$emit('input', [...this.value, number])
      }
    }
  }
}
</script>
