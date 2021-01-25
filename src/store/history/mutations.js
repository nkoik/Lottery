export function SET_SELECTED_DRAW (state, payload) {
  state.selectedDraw = payload
}

export function SET_DRAWS (state, payload) {
  state.oldDraws = payload
}

export const DELETE_DRAW = function (state, payload) {
  const findIndex = state.oldDraws.findIndex(draw => draw.id === payload)
  if (findIndex !== undefined) {
    state.oldDraws.splice(findIndex, 1)
  }
}

export function RESET_SELECTED_DRAW (state) {
  state.selectedDraw = null
}

export function RESET_DRAWS (state) {
  state.oldDraws = []
}
