import { callApi } from "utils/api";
import creditoActions from "./creditos";
import pagareActions from "./pagares";
import crud from "./_crud";

const loadSolicitantes = () => {
  return async (dispatch, getState) => {
    const res = await callApi(`/solicitante`)
    //  Filter solicitantes
    const solicitantes = res.body.filter(sol => sol.is_imported_excel || sol.is_coming_from_heroku)
    dispatch({
      type: 'LOAD_SOLICITANTES',
      response: solicitantes
    })
  }
}

const loadSolicitantesFullData = () => {
  return async (dispatch, getState) => {
    const res = await callApi(`/solicitante`)

    //  Filter solicitantes
    const solicitantes = res.body.filter(sol => sol.is_imported_excel)

    dispatch({
      type: 'LOAD_SOLICITANTES',
      response: solicitantes
    })

    //  Load creditos
    const proms = solicitantes.map(async solicitante => {
      const creditos = await dispatch(creditoActions.load(solicitante._id))
      
      //  Load pagares
      const proms2 = creditos.map(credito => dispatch(pagareActions.load(credito._id)))

      return Promise.all(proms2)
    });

    return Promise.all(proms);
  }
}

export default {
  ...crud('solicitante', 'solicitantes'),
  loadSolicitantes,
  loadSolicitantesFullData
}