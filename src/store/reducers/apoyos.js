import { convertToArrayObject } from "utils/index";

export default (state = {}, action) => {
  const {type, response} = action;
  switch (type) {
    
    case 'LOAD_APOYOS': 

      return convertToArrayObject(response)

    case 'ADD_APOYO':
      
      return {
        ...state,
        [response.id]: response
      }
  
    default:
      return state
  }
}