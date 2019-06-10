export const loadCreditos = (solicitante_id) => {
  return async (dispatch, getState) => {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/solicitante/${solicitante_id}/creditos`)
    const data = await res.json()

    dispatch({
      type: 'LOAD_CREDITOS',
      response: data,
      payload: solicitante_id
    })
  }
}

export const addCredito = item => {
  return async (dispatch, getState) => {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/credito`,
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
      type: 'ADD_CREDITO',
      response: result_item
    })
  }
}

export const editCredito = item => {
  return {
    type: 'EDIT_CREDITO',
    payload: item.id,
    response: item
  }
}