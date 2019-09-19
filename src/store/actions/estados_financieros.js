import { callApi } from "utils/api";
import crud from "./_crud";

const deleteIngreso = (id, item_id) => {
  return async (dispatch, getState) => {
    const res = await callApi(`/estado_financiero/${id}/ingresos/${item_id}`,{
      method: 'DELETE'
    })
    dispatch({
      type: 'UPDATE_ESTADO_FINANCIERO',
      response: res.body
    })
  }
}

const deleteEgreso = (id, item_id) => {
  return async (dispatch, getState) => {
    const res = await callApi(`/estado_financiero/${id}/egresos/${item_id}`,{
      method: 'DELETE'
    })
    dispatch({
      type: 'UPDATE_ESTADO_FINANCIERO',
      response: res.body
    })
  }
}

export default {
  ...crud('estado_financiero', 'estados_financieros'),
  deleteIngreso,
  deleteEgreso
}
