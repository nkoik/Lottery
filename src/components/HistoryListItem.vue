<template>
   <q-item clickable v-ripple>
    <q-item-section avatar top>
      <q-icon :name="ticket.won ? 'verified' : 'clear'" :color="ticket.won ? 'green-4' : 'red-4'" size="34px" />
    </q-item-section>

    <q-item-section top class="col-sm-1">
      <q-item-label class="q-mt-sm">{{ ticket.won ? 'Won' : 'Lost' }}</q-item-label>
    </q-item-section>

    <q-item-section top>
      <q-item-label lines="1">
        <slot></slot>
      </q-item-label>
    </q-item-section>

    <q-item-section top>
      <q-item-label caption lines="1">
        <span class="text-grey-8"> Total winning amount: </span>
        <span class="text-h5 text-weight-large">{{ ticket.prize + '€' }}</span>
      </q-item-label>
    </q-item-section>

    <q-item-section top side>
      <div class="text-red-8">
        <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click.stop="$emit('delete', ticket.id)" />
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'HistoryListItem',
  props: {
    ticket: {
      type: Object,
      default: () => ({
        id: 0,
        prize: 0,
        won: false
      })
    }
  }
}
</script>
