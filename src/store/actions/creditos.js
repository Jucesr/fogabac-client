import { callApi } from "utils/api";

const generateSolicitud = credito_id => {
  return async (dispatch, getState) => {

    dispatch({
      type: 'OPEN_NOTIFICATION',
      payload: {
        type: 'INFO',
        message: "Generando Solicitud"
      }
    })

    let res = await callApi(`/credito/${credito_id}/generate_solicitud`)

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

    dispatch({
      type: 'CLOSE_NOTIFICATION',
    })

  }
}

const generateTarjetaEjecutiva = credito_id => {
  return async (dispatch, getState) => {

    dispatch({
      type: 'OPEN_NOTIFICATION',
      payload: {
        type: 'INFO',
        message: "Generando Tarjeta Ejecutiva"
      }
    })

    let res = await callApi(`/credito/${credito_id}/generate_tarjeta_ejecutiva`)

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

    dispatch({
      type: 'CLOSE_NOTIFICATION',
    })

  }
}

import crud from "./_crud";

export default {
  ...crud('credito', 'creditos', 'solicitante'),
  generateSolicitud,
  generateTarjetaEjecutiva
}