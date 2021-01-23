<template>
  <div class="q-pa-md">
    <h4>Sign In.</h4>
    <user-credentials @success="onSubmit" :button="buttonStyle"/>
  </div>
</template>

<script>
export default {
  name: 'LoginInitialPage',
  components: {
    'user-credentials': () => import(/* webpackPrefetch: true */ '../../components/UserCredentials.vue')
  },
  data () {
    return {}
  },
  computed: {
    buttonStyle () {
      return {
        class: 'full-width',
        label: 'Sign in',
        type: 'submit',
        color: 'secondary'
      }
    }
  },
  methods: {
    onSubmit (user) {
      console.log(user)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'Register' && to.params.success === 'succeed') {
        vm.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Successful registration. Please sign.'
        })
      }
    })
  }
}
</script>
