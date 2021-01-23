import firebaseService from '../services/firebase'
import { firebaseConfig } from '../js/firebaseConfig'

export default ({ router, store, Vue }) => {
  firebaseService.initFireBase(firebaseConfig)

  // Tell the application what to do when the
  // authentication state has changed
  firebaseService.auth().onAuthStateChanged((user) => {
    firebaseService.handleOnAuthStateChanged(store, user)
  }, (error) => {
    console.error(error)
  })

  Vue.prototype.$fb = firebaseService
  store.$fb = firebaseService
}
