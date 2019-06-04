export const loadCreditos = () => {
  return async (dispatch, getState) => {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/solicitantes`)
    const data = await res.json()

    dispatch({
      type: 'LOAD_CREDITOS',
      response: data
    })
  }
}

export const addCredito = item => {
  return {
    type: 'ADD_CREDITO',
    response: item
  }
}

export const editCredito = item => {
  return {
    type: 'EDIT_CREDITO',
    payload: item.id,
    response: item
  }
}