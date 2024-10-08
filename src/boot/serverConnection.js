import firebaseService from '../services/firebase'
import { firebaseConfig } from '../js/firebaseConfig'

export default ({ router, store, Vue }) => {
  firebaseService.initFireBase(firebaseConfig)
  firebaseService.db = firebaseService.openDB()
  // firebaseService.deleteField = firebaseService.deleteFieldValue()

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
