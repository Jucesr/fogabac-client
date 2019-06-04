import { convertToArrayObject } from "utils/index";

export default (state = {}, action) => {
  const {type, response} = action;
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
  
    default:
      return state
  }
}