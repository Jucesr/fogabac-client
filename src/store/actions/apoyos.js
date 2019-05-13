export const loadApoyos = () => {
  return async (dispatch, getState) => {
    const res = await fetch('http://localhost:3000/APOYOS')
    const data = await res.json()

    dispatch({
      type: 'LOAD_APOYOS',
      response: data
    })
  }
}

