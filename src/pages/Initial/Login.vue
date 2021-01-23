<template>
  <div class="q-pa-md">
    <h4>Sign In.</h4>
    <user-credentials @success="onSubmit" :button="buttonStyle"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginInitialPage',
  components: {
    'user-credentials': () => import(/* webpackPrefetch: true */ '../../components/UserCredentials.vue')
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    buttonStyle () {
      return {
        class: 'full-width',
        label: 'Sign in',
        type: 'submit',
        color: 'secondary',
        loading: this.loading
      }
    }
  },
  methods: {
    ...mapActions({
      loginUser: 'authorization/loginUser',
      logoutUser: 'authorization/logoutUser'
    }),
    onSubmit (user) {
      this.loading = true
      this.loginUser(user)
        .then(data => {
          this.$router.replace({ name: 'Home' })
          this.loading = false
        })
        // eslint-disable-next-line
        .catch(err => {
          this.loading = false
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'error',
            message: 'Invalid email/password'
          })
        })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'Register' && to.params.success === 'succeed') {
        vm.logoutUser()
        vm.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'how_to_reg',
          message: 'Successful registration. Please sign.'
        })
      }
    })
  }
}
</script>
