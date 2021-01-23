import firebase from 'firebase/app'
import 'firebase/auth'

export const registerUserWithEmail = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
}

export const loginWithEmail = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}
