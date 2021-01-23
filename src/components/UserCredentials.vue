<template>
  <q-form
    @submit="onSubmit"
    class="q-gutter-md"
  >
    <q-input
      outlined
      v-model.trim="email"
      type="email"
      label="Email"
      bottom-slots
      :error-message="emailMessage[emailErrorType[0]] || ''"
      :error="$v.email.$error"
    />

    <q-input
      outlined
      v-model.trim="password"
      :type="isPwd ? 'password' : 'text'"
      label="Password"
      bottom-slots
      :error-message="passwordMessage[passwordErrorType[0]] || ''"
      :error="$v.password.$error"
      >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>

    <div class="row justify-end">
      <q-btn v-bind="button" />
    </div>
  </q-form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import MESSAGES from '../js/messages'

export default {
  name: 'UserCredentials',
  props: {
    button: {
      type: Object,
      default () {
        return {
          class: 'full-width',
          label: 'Submit',
          type: 'submit',
          color: 'primary'
        }
      }
    }
  },
  data () {
    return {
      email: null,
      password: null,
      isPwd: 'password',
      emailMessage: MESSAGES.email,
      passwordMessage: MESSAGES.password
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  computed: {
    emailErrorType () {
      const validations = {
        format: !this.$v.email.email,
        required: !this.$v.email.required
      }
      return Object.keys(validations).filter(type => validations[type])
    },
    passwordErrorType () {
      const validations = {
        required: !this.$v.password.required
      }
      return Object.keys(validations).filter(type => validations[type])
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (!this.$v.$error) {
        this.$emit('success', {
          email: this.email,
          password: this.password
        })
      }
    }
  }
}
</script>
