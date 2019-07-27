import { callApi } from "utils/api";

// export const loadCreditos = (solicitante_id) => {
//   return async (dispatch, getState) => {
//     const res = await callApi(`/solicitante/${solicitante_id}/creditos`)

//     dispatch({
//       type: 'LOAD_CREDITOS',
//       response: res.body,
//       payload: solicitante_id
//     })
//   }
// }

// export const addCredito = item => {
//   return async (dispatch, getState) => {
//     const res = await callApi(`/credito`,
//       {
//         method: 'POST',
//         body: JSON.stringify(item)
//       })

//     if(res.status !== 200){
//       dispatch({
//         type: 'OPEN_NOTIFICATION',
//         payload: {
//           type: 'ERROR',
//           message: res.body.error
//         }
//       })
//       return 0;
//     }

//     dispatch({
//       type: 'ADD_CREDITO',
//       response: res.body
//     })
//   }
// }

// export const editCredito = item => {
//   return {
//     type: 'EDIT_CREDITO',
//     payload: item.id,
//     response: item
//   }
// }

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

import crud from "./_crud";

export default {
  ...crud('credito', 'creditos', 'solicitante'),
  generateSolicitud
}