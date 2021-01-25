export function drawDetails (state) {
  return (id) => {
    if (state.selectedDraw !== null) {
      const drawDetails = state.oldDraws.find(draw => draw.id === id)
      return {
        ...state.selectedDraw,
        betNumbers: drawDetails.numbers,
        prize: drawDetails.prize
      }
    }
    return null
  }
}
