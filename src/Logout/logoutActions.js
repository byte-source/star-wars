export const loggingOut = () => ({
  type: 'LOGGING_OUT'
})

export const logOut = () => {
  return (dispatch) => {
    dispatch(loggingOut())
  }
}

export const clearStateData = () => ({
  type: 'CLEAR_USER_DATA'
})


export const clearState = () => {
  return (dispatch) => {
    dispatch(clearStateData())
  }
}


