
export const ThemeChanger = (value) => async dispatch => {
  dispatch({
      type: "ThemeChanger",
      payload: value
  })
}

export const UserChanger = (value) => async dispatch => {
  dispatch({
      type: "UserChanger",
      payload: value
  })
}

export const RolesChanger = (value) => async dispatch => {
  dispatch({
      type: "RolesChanger",
      payload: value
  })
}

