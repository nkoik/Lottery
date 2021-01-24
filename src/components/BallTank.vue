<template>
    <q-card class="card-tank">
      <div class="card-tank__title text-h6 bg-grey-4 q-pa-md">{{ title }}</div>
      <q-space/>
      <q-separator />
      <div class="row wrap items-center q-py-md text-center">
        <lottery-ball
          class="q-ma-sm"
          @delete="handleDelete"
          v-for="number in value"
          :selected="value.includes(number)"
          :highlighted="highlightedNumbers.includes(number)"
          :key="number"
          :label="number"
          :clearable="clearable"
        />
      </div>
    </q-card>
</template>

<script>
export default {
  name: 'LotteryBallTank',
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: [Array],
      default: () => []
    },
    highlightedNumbers: {
      type: [Array],
      default: () => []
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleDelete (number) {
      this.$emit('input', this.value.filter(n => n !== number))
    }
  }
}
</script>
