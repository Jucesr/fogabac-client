import { callApi } from "utils/api";

export const loadReferenciasPersonales = (solicitante_id) => {
  return async (dispatch, getState) => {
    const res = await callApi(`/solicitante/${solicitante_id}/referencias_personales`)
    
    dispatch({
      type: 'LOAD_REFERENCIAS_PERSONALES',
      response: res.body,
      payload: solicitante_id
    })
  }
}

export const addReferenciaPersonal = ({documento, ...item}) => {
  return async (dispatch, getState) => {
    //  It first add the Item

    let res = await callApi(`/referencia_personal`, {
      method: 'POST',
      body: JSON.stringify(item)
    })

    //  Check the item was added correctly
    if(res.status !== 200){
      dispatch({
        type: 'OPEN_NOTIFICATION',
        payload: {
          type: 'ERROR',
          message: res.body.error
        }
      })

      return 0;
    }

    let stored_item = res.body

    if(documento){
      //  A document was provided
      res = await callApi(`/referencia_personal/${stored_item._id}/uploadFile`,
      {
        method: 'PUT',
        json: false,
        body: documento 
      })

      //  Check the file was added correctly
      if(res.status !== 200){
        //  There was an error uploading the file
        //  It adds the item but throw an error letting know the user.
        dispatch({
          type: 'ADD_REFERENCIA_PERSONAL',
          response: stored_item
        })

        dispatch({
          type: 'OPEN_NOTIFICATION',
          payload: {
            type: 'ERROR',
            message: res.body.error
          }
        })

      }else{

        dispatch({
          type: 'ADD_REFERENCIA_PERSONAL',
          response: res.body
        })
      }
    }else{
      //  No document was provided

      dispatch({
        type: 'ADD_REFERENCIA_PERSONAL',
        response: stored_item
      })
    }    
  }
}

export const deleteReferenciaPersonal = item => {
  return async (dispatch, getState) => {
    const res = await callApi(`/referencia_personal/${item._id}`,
      {
        method: 'DELETE'
      })
    
    dispatch({
      type: 'DELETE_REFERENCIA_PERSONAL',
      response: res.body
    })
  }
}

export const updateReferenciaPersonal = ({documento, ...item}) => {
  return async (dispatch, getState) => {

    let res = await callApi(`/referencia_personal/${item._id}`, {
      method: 'PATCH',
      body: JSON.stringify(item)
    })

    //  Check the item was added correctly
    if(res.status !== 200){
      //  TODO: Throw error here!
      console.log(res.body)
      return 0;
    }

    let stored_item = res.body

    if(documento){
      //  A document was provided
      res = await callApi(`/referencia_personal/${stored_item._id}/uploadFile`,
      {
        method: 'PUT',
        json: false,
        body: documento 
      })

      //  Check the file was added correctly
      if(res.status !== 200){
        //  There was an error uploading the file
        //  It adds the item but throw an error letting know the user.
        dispatch({
          type: 'UPDATE_REFERENCIA_PERSONAL',
          response: stored_item
        })

      }else{

        dispatch({
          type: 'UPDATE_REFERENCIA_PERSONAL',
          response: res.body
        })

      }
    }else{
      //  No document was provided

      dispatch({
        type: 'UPDATE_REFERENCIA_PERSONAL',
        response: stored_item
      })
    }   

    
  }
}