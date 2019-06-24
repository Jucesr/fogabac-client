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

export const addReferenciaPersonal = ({documento, ...item}) => {
  return async (dispatch, getState) => {
    let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/referencia_personal`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })

    if(res.status != 200){
      //  TODO: Throw error here!
    }
    let res_obj = await res.json()

    //  Upload the file
    let body = new FormData();
    body.append('file', documento.file)
    //body.append('name', documento.name)
    res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/referencia_personal/${res_obj._id}/uploadFile`,
      {
        method: 'PUT',
        body 
      })

    const result_item = await res.json()

    dispatch({
      type: 'ADD_REFERENCIA_PERSONAL',
      response: result_item
    })
  }
}

export const deleteReferenciaPersonal = item => {
  return async (dispatch, getState) => {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/referencia_personal/${item._id}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    const result_item = await res.json()

    dispatch({
      type: 'DELETE_REFERENCIA_PERSONAL',
      response: result_item
    })
  }
}

export const updateReferenciaPersonal = item => {
  return async (dispatch, getState) => {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/referencia_personal/${item._id}`,
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
      type: 'UPDATE_REFERENCIA_PERSONAL',
      response: result_item
    })
  }
}