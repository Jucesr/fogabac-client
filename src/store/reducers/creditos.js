import { convertToArrayObject } from "utils/index";

export default (state = {}, action) => {
  const {type, response, payload} = action;
  switch (type) {
    
    case 'LOAD_CREDITOS': {
      return convertToArrayObject(response)
    }

    case 'ADD_CREDITO':{
      return {
        ...state,
        [response._id]: response
      }
    }

    //*************************
    //  REFERENCIAS PERSONALES
    //*************************

    case 'LOAD_REFERENCIAS_PERSONALES': {
      return{
        ...state,
        [payload]: {
          ...state[payload],
          referencias_personales: response
        }
      }
    }

      

    case 'ADD_REFERENCIA_PERSONAL': {
      const credito_id = response.credito;
      return{
        ...state,
        [credito_id]: {
          ...state[credito_id],
          referencias_personales: [
            ...state[credito_id].referencias_personales,
            response
          ]
        }
      }
    }

      

    case 'DELETE_REFERENCIA_PERSONAL': {
      const credito_id = response.credito;
      const rps = state[credito_id].referencias_personales.filter(rp => rp._id !== response._id);

      return{
        ...state,
        [credito_id]: {
          ...state[credito_id],
          referencias_personales: rps
        }
      }
    }

    case 'UPDATE_REFERENCIA_PERSONAL': {
      const credito_id = response.credito;
      const items = state[credito_id].referencias_personales
      
      const rps = items.map(rp => {
       
        if(rp._id === response._id){
          rp = {
            ...rp,
            ...response
          }
        }

        return rp;
      });

      return{
        ...state,
        [credito_id]: {
          ...state[credito_id],
          referencias_personales: rps
        }
      }
    }

    //*************************
    //  GARANTIA HIPOTECARIA
    //*************************

    case 'LOAD_GARANTIAS_HIPOTECARIAS': {
      return{
        ...state,
        [payload]: {
          ...state[payload],
          garantias_hipotecarias: response
        }
      }
    }

      

    case 'ADD_GARANTIA_HIPOTECARIA': {
      const credito_id = response.credito;
      return{
        ...state,
        [credito_id]: {
          ...state[credito_id],
          garantias_hipotecarias: [
            ...state[credito_id].garantias_hipotecarias,
            response
          ]
        }
      }
    }

    case 'DELETE_GARANTIA_HIPOTECARIA': {
      const credito_id = response.credito;
      const rps = state[credito_id].garantias_hipotecarias.filter(rp => rp._id !== response._id);

      return{
        ...state,
        [credito_id]: {
          ...state[credito_id],
          garantias_hipotecarias: rps
        }
      }
    }

    case 'UPDATE_GARANTIA_HIPOTECARIA': {
      const credito_id = response.credito;
      const items = state[credito_id].garantias_hipotecarias
      
      const rps = items.map(rp => {
       
        if(rp._id === response._id){
          rp = {
            ...rp,
            ...response
          }
        }

        return rp;
      });

      return{
        ...state,
        [credito_id]: {
          ...state[credito_id],
          garantias_hipotecarias: rps
        }
      }
    }

      
  
    default:
      return state
  }
}