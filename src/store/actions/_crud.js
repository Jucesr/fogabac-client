export default ({
  entity,
}) => {
  const load = (item_id) => {
    return async (dispatch, getState) => {
      const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/${entity}/${item_id}`)
      const data = await res.json()
  
      dispatch({
        type: `LOAD_${entity.toUpperCase()}`,
        response: data,
        payload: solicitante_id
      })
    }
  }
  
  const add = item => {
    return async (dispatch, getState) => {
      const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/${entity}`,
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
        type: `ADD_${entity.toUpperCase()}`,
        response: result_item
      })
    }
  }
  
  const remove = item => {
    return async (dispatch, getState) => {
      const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/${entity}/${item._id}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
      const result_item = await res.json()
  
      dispatch({
        type: `DELETE_${entity.toUpperCase()}`,
        response: result_item
      })
    }
  }
  
  const update = item => {
    return async (dispatch, getState) => {
      const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/${entity}/${item._id}`,
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
        type: `UPDATE_${entity.toUpperCase()}`,
        response: result_item
      })
    }
  }


  return {
    load,
    add,
    remove,
    update
  }
}