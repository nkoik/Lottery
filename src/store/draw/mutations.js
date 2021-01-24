export function SET_DRAW_RUN (state, payload) {
  state.isDrawOpen = payload
}

export function SET_SUBMITTED_NUMBERS (state, payload) {
  state.submittedNumbers = payload
}

export function CLEAR_DRAW_STATE (state, payload) {
  state.isDrawOpen = false
  state.maxAllowedNumbers = 5
  state.submittedNumbers = []
}
