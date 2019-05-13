export const loadSolicitantes = () => {
  return async (dispatch, getState) => {
    const res = await fetch('http://localhost:3000/solicitantes')
    const data = await res.json()

    dispatch({
      type: 'LOAD_SOLICITANTES',
      response: data
    })
  }
}

export const addSolicitante = item => {
  return {
    type: 'ADD_SOLICITANTE',
    response: item
  }
}

export const editSolicitante = item => {
  return {
    type: 'EDIT_SOLICITANTE',
    payload: item.id,
    response: item
  }
}