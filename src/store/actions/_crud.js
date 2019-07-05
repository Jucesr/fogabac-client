import { callApi } from "utils/api";

export default (
  entity,
  entityPlural
) => {

  const load = (credito_id) => {
    return async (dispatch, getState) => {
      const res = await callApi(`/credito/${credito_id}/${entityPlural}`)
      
      dispatch({
        type: `LOAD_${entityPlural.toUpperCase()}`,
        response: res.body,
        payload: credito_id
      })
    }
  }

  const add = ({documento, ...item}) => {
    return async (dispatch, getState) => {
      //  It first add the Item
  
      let res = await callApi(`/${entity}`, {
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
        res = await callApi(`/${entity}/${stored_item._id}/uploadFile`,
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
            type: `ADD_${entity.toUpperCase()}`,
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
            type: `ADD_${entity.toUpperCase()}`,
            response: res.body
          })
        }
      }else{
        //  No document was provided
  
        dispatch({
          type: `ADD_${entity.toUpperCase()}`,
          response: stored_item
        })
      }    
    }
  }
  
  const remove = item => {
    return async (dispatch, getState) => {
      const res = await callApi(`/${entity}/${item._id}`,
        {
          method: 'DELETE'
        })
      
      dispatch({
        type: `DELETE_${entity.toUpperCase()}`,
        response: res.body
      })
    }
  }

  const update = ({documento, ...item}) => {
    return async (dispatch, getState) => {
  
      let res = await callApi(`/${entity}/${item._id}`, {
        method: 'PATCH',
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
        res = await callApi(`/${entity}/${stored_item._id}/uploadFile`,
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
            type: `UPDATE_${entity.toUpperCase()}`,
            response: stored_item
          })
  
        }else{
  
          dispatch({
            type: `UPDATE_${entity.toUpperCase()}`,
            response: res.body
          })
  
        }
      }else{
        //  No document was provided
  
        dispatch({
          type: `UPDATE_${entity.toUpperCase()}`,
          response: stored_item
        })
      }   
  
      
    }
  }

  return {
    load,
    add,
    remove,
    update
  }
}