import firebase from 'firebase/app'
import 'firebase/auth'

export const auth = () => firebase.auth()

export const ensureAuthIsInitialized = async (store) => {
  if (store.state.authorization.isReady) return true
  // Create the observer only once on init
  return new Promise((resolve, reject) => {
    // Use a promise to make sure that the router will eventually show the route after the auth is initialized.
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      resolve()
      unsubscribe()
    }, () => {
      reject()
    })
  })
}

export const initFireBase = (config) => {
  return firebase.initializeApp(config)
}

export const handleOnAuthStateChanged = async (store, user) => {
  store.commit('authorization/SET_USER', user !== null ? { email: user.email } : null)

  store.commit('authorization/SET_AUTH', {
    isAuthenticated: user !== null,
    isReady: true
  })

  if (!user && isAuthenticated(store)) {
    store.dispatch('authorization/routeUserToAuth')
  }
}

export const isAuthenticated = (store) => {
  return store.state.authorization.isAuthenticated
}

/**
 * remove firebase auth token
 */
export const logoutUser = () => {
  return firebase.auth().signOut()
}
