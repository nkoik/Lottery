<template>
  <div class="q-pa-md">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        outlined
        v-model="email"
        type="email"
        label="Email"
        lazy-rules
        :rules="[
          val => $v.password.required || 'Required',
          val => $v.password.email || 'Invalid email'
        ]"
      />

      <q-input
        outlined
        v-model="password"
        :type="isPwd ? 'password' : 'text'"
        label="Password">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
export default {
  name: 'RegisterInitialPage',
  data () {
    return {
      email: null,
      password: null,
      isPwd: 'password'
    }
  },

  methods: {
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },

    onReset () {
      this.email = null
      this.password = null
    }
  }
}
</script>
