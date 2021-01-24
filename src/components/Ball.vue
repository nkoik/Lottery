<template>
  <q-btn
    v-bind="dynamicProps"
    @click="$emit(isClearHovered ? 'delete' : 'select', label)"
  >
    <q-tooltip
      v-if="clearable"
      @before-show="handleDelete"
      @before-hide="handleDelete"
      anchor="top middle"
      :offset="[30, 30]"
    >
      Delete
    </q-tooltip>
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
      default: '0',
      required: true
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isClearHovered: false
    }
  },
  computed: {
    dynamicProps () {
      const props = {
        outline: !this.selected && !this.highlighted,
        color: this.highlighted ? 'dark' : 'indigo',
        round: true,
        disable: this.disabled,
        label: this.label
      }
      const { label, color, outline, ...restProps } = props
      return this.isClearHovered
        ? { icon: 'clear', color: 'red', outline: false, ...restProps }
        : props
    }
  },
  methods: {
    handleDelete () {
      if (this.clearable) {
        this.isClearHovered = !this.isClearHovered
      }
    }
  }
}
</script>
