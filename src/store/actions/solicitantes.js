import { callApi } from "utils/api";

import crud from "./_crud";

const loadSolicitantes = () => {
  return async (dispatch, getState) => {
    const res = await callApi(`/solicitante`)
    dispatch({
      type: 'LOAD_SOLICITANTES',
      response: res.body
    })
  }
}

export default {
  ...crud('solicitante', 'solicitantes'),
  loadSolicitantes
}