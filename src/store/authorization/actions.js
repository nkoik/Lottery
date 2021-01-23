// Remember, we have access to our Vue instance not using
// an arrow function in our actions file. This allows us
// to create a scoped reference to our firebaseService - $fb
// That was assigned to the Vue instance earlier in our serviceConnection
// boot file.

export const registerUser = async function ($root, { email, password }) {
  const firebase = this.$fb
  return firebase.registerUserWithEmail(email, password)
}

export const loginUser = async function ($root, { email, password }) {
  const firebase = this.$fb
  return firebase.loginWithEmail(email, password)
}

export const logoutUser = async function ($root, payload) {
  const firebase = this.$fb
  await firebase.logoutUser()
}

export function routeUserToAuth () {
  this.$router.push({
    name: 'Login'
  })
}
