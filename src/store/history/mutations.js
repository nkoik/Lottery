export function SET_SELECTED_DRAW (state, payload) {
  state.selectedDraw = payload
}

export function SET_DRAWS (state, payload) {
  state.draws = payload
}

export function RESET_SELECTED_DRAW (state) {
  state.selectedDraw = null
}

export function RESET_DRAWS (state) {
  state.draws = []
}
