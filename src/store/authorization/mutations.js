export function SET_AUTH (state, payload) {
  state.isAuthenticated = payload.isAuthenticated
  state.isReady = payload.isReady
}

export function SET_USER (state, payload) {
  state.user = payload
}
