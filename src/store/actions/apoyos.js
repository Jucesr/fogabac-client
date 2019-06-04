export const loadApoyos = () => {
  return async (dispatch, getState) => {
    const res = await fetch('http://localhost:3002/apoyo')
    const data = await res.json()

    dispatch({
      type: 'LOAD_APOYOS',
      response: data
    })
  }
}

