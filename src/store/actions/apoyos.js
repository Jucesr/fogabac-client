export const loadApoyos = () => {
  return async (dispatch, getState) => {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/apoyo`)
    const data = await res.json()

    dispatch({
      type: 'LOAD_APOYOS',
      response: data
    })
  }
}

