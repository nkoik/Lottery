export const getDraws = function ({ commit, rootState }) {
  const usersRef = this.$fb.db.collection('users').doc(rootState.authorization.user.email)
  return new Promise((resolve, reject) => {
    usersRef.get()
      .then(function (doc) {
        if (doc.exists) {
          const oldDraws = doc.data()
          const oldDrawsArray = Object.keys(oldDraws).map(id => ({ id, ...oldDraws[id] }))
          const oldDrawsSortedByDate = oldDrawsArray.sort((a, b) => b.timestamp - a.timestamp)
          commit('SET_DRAWS', oldDrawsSortedByDate)
          resolve(oldDrawsSortedByDate)
        } else {
          reject('No such document')
        }
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

export const deleteDraw = function ({ commit, rootState }, payload) {
  const usersRef = this.$fb.db.collection('users').doc(rootState.authorization.user.email)
  return new Promise((resolve, reject) => {
    usersRef.update({
      [payload]: this.$fb.deleteField()
    })
      .then(() => {
        commit('DELETE_DRAW', payload)
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}
