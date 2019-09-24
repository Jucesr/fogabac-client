import { callApi } from "utils/api";

export const setApoyo = (item) => ({
  type: 'SET_APOYO',
  payload: item
})

export const setSolicitante = (item) => ({
  type: 'SET_SOLICITANTE',
  payload: item
})

export const setCredito = (item) => ({
  type: 'SET_CREDITO',
  payload: item
})

export const setDirector = (directores) => {
  return async (dispatch, getState) => {
    const res = await callApi(`/utils/set_settings`,{
      method: 'POST',
      body: JSON.stringify(directores)
    })
    
    dispatch({
      type: `SET_DIRECTOR`,
      payload: directores
    })
  }
}

export const getDirector = () => {
  return async (dispatch, getState) => {

    dispatch({
      type: 'SET_FETCHING'
    })

    const res = await callApi(`/utils/get_settings?keys=director_agricultura,director_ganaderia,director_pesca,director_general`)
    
    dispatch({
      type: `SET_DIRECTOR`,
      payload: res.body
    })
  }
}

export const getScoringMax = () => {
  return async (dispatch, getState) => {

    dispatch({
      type: 'SET_FETCHING'
    })

    const res = await callApi(`/utils/get_settings?keys=scoring_fogabac,scoring_gobbc,scoring_solvencia_moral,scoring_proyecto_estatal`)
    
    dispatch({
      type: `SET_SCORING`,
      payload: res.body
    })
  }
}

