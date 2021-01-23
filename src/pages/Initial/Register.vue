<template>
  <div class="register q-pa-md">
    <div class="register__text q-py-lg">
      <div>This is the first step to become the next millionaire</div>
      <div>All you need is your email</div>
    </div>
    <user-credentials @success="onSubmit" :button="buttonStyle" register />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RegisterInitialPage',
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
        label: 'Register',
        type: 'submit',
        color: 'dark',
        loading: false
      }
    }
  },
  methods: {
    ...mapActions({
      registerUser: 'authorization/registerUser'
    }),
    onSubmit (user) {
      this.loading = true
      this.registerUser(user)
        .then(data => {
          this.loading = false
          this.$router.replace({ name: 'Login', params: { success: 'succeed' } })
        })
        // eslint-disable-next-line
        .catch(err => {
          console.log(err)
          this.loading = false
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'error',
            message: 'There was an error registering your email. Try again'
          })
        })
    }
  }
}
</script>
