export const loadSolicitantes = () => {
  return async (dispatch, getState) => {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/solicitante`)
    const data = await res.json()

    dispatch({
      type: 'LOAD_SOLICITANTES',
      response: data
    })
  }
}

export const addSolicitante = item => {
  return async (dispatch, getState) => {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/solicitante`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...item,
          tipo_persona: 'Fisica',
          usuario_id: 1,
          vigente: 0,
          vencido: 0
        })
      })
    const result_item = await res.json()

    dispatch({
      type: 'ADD_SOLICITANTE',
      response: result_item
    })
  }
}

export const editSolicitante = item => {
  return async (dispatch, getState) => {
    console.log(item)
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/solicitante/${item._id}`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })

    const result_item = await res.json()

    dispatch({
      type: 'EDIT_SOLICITANTE',
      payload: item._id,
      response: result_item
    })
  }
}