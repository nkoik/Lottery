export function SET_AUTH (state, data) {
  state.isAuthenticated = data.isAuthenticated
  state.isReady = data.isReady
}
