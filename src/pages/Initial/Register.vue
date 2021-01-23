<template>
  <div class="register q-pa-md">
    <div class="register__text q-py-lg">
      <div>This is the first step to become the next millionaire</div>
      <div>All you need is your email</div>
    </div>
    <user-credentials @success="onSubmit" :button="buttonStyle"/>
  </div>
</template>

<script>
export default {
  name: 'RegisterInitialPage',
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
        label: 'Register',
        type: 'submit',
        color: 'dark'
      }
    }
  },
  methods: {
    onSubmit (user) {
      console.log(user)
    }
  }
}
</script>
