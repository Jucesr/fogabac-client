export const loadTipoCreditos = () => {
  return async (dispatch, getState) => {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/tipo_credito`)
    const data = await res.json()

    dispatch({
      type: 'LOAD_TIPO_CREDITOS',
      response: data
    })
  }
}

