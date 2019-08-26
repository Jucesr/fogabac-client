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

    case 'UPDATE_SOLICITANTE':
      
      return {
        ...state,
        [response._id]: {
          ...state[response._id],
          ...response
        }
      }
    //*************************
    //  CREDITOS
    //*************************
    case 'LOAD_CREDITOS': 

      return{
        ...state,
        [payload]: {
          ...state[payload],
          creditos: response.map(credito => credito._id)
        }
      }

    case 'ADD_CREDITO': 

      return{
        ...state,
        [response.solicitante]: {
          ...state[response.solicitante],
          creditos: [
            ...state[response.solicitante].creditos,
            response._id
          ]
        }
      }

    default:
      return state
  }
}