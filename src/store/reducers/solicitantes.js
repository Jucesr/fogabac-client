import { convertToArrayObject } from "utils/index";

export default (state = {}, action) => {
  const {type, response, payload} = action;
  switch (type) {
    
    case 'LOAD_SOLICITANTES': 

      return convertToArrayObject(response)

    case 'ADD_SOLICITANTE':
      
      return {
        ...state,
        [response._id]: response
      }

    case 'EDIT_SOLICITANTE':
      
      return {
        ...state,
        [response._id]: {
          ...state[response._id],
          ...response
        }
      }

    case 'LOAD_CREDITOS': 

      return{
        ...state,
        [payload]: {
          ...state[payload],
          creditos: response
        }
      }

    case 'ADD_CREDITO': 

      return{
        ...state,
        [response.solicitante]: {
          ...state[response.solicitante],
          creditos: [
            ...state[response.solicitante].creditos,
            response
          ]
        }
      }

    //*************************
    //  REFERENCIAS PERSONALES
    //*************************
    case 'LOAD_REFERENCIAS_PERSONALES': 

      return{
        ...state,
        [payload]: {
          ...state[payload],
          referencias_personales: response
        }
      }

    case 'ADD_REFERENCIA_PERSONAL': 

      return{
        ...state,
        [response.solicitante]: {
          ...state[response.solicitante],
          referencias_personales: [
            ...state[response.solicitante].referencias_personales,
            response
          ]
        }
      }

    case 'DELETE_REFERENCIA_PERSONAL': {
      const rps = state[response.solicitante].referencias_personales.filter(rp => rp._id !== response._id);

      return{
        ...state,
        [response.solicitante]: {
          ...state[response.solicitante],
          referencias_personales: rps
        }
      }
    }

    case 'UPDATE_REFERENCIA_PERSONAL': {
      const items = state[response.solicitante].referencias_personales
      
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
        [response.solicitante]: {
          ...state[response.solicitante],
          referencias_personales: rps
        }
      }
    }

      
  
    default:
      return state
  }
}