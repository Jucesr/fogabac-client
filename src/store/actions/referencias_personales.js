export const loadReferenciasPersonales = (solicitante_id) => {
  return async (dispatch, getState) => {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/solicitante/${solicitante_id}/referencias_personales`)
    const data = await res.json()

    dispatch({
      type: 'LOAD_REFERENCIAS_PERSONALES',
      response: data,
      payload: solicitante_id
    })
  }
}

export const addReferenciaPersonal = item => {
  return async (dispatch, getState) => {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/referencia_personal`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
    const result_item = await res.json()

    dispatch({
      type: 'ADD_REFERENCIA_PERSONAL',
      response: result_item
    })
  }
}