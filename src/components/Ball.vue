<template functional>
  <q-btn
    :outline="!props.selected && !props.highlighted"
    :color="props.highlighted ? 'dark' : 'primary'"
    round
    :disable="props.disabled"
    class="q-ml-md"
    :label="props.label">
    <q-badge
      v-if="props.clearable"
      color="red"
      floating>X
    </q-badge>
  </q-btn>
</template>

<script>
export default {
  name: 'LotteryBall',
  props: {
    selected: {
      type: Boolean,
      default: false
    },
    highlighted: {
      type: Boolean,
      default: false
    },
    label: {
      type: [String, Number],
      default: '0'
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
