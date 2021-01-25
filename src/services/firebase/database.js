import firebase from 'firebase/app'
import 'firebase/firestore'

export const openDB = () => {
  return firebase.firestore()
}

export const deleteField = () => {
  return firebase.firestore.FieldValue.delete()
}
