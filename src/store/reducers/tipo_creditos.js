import { convertToArrayObject } from "utils/index";

export default (state = {}, action) => {
  const {type, response} = action;
  switch (type) {
    
    case 'LOAD_TIPO_CREDITOS': 

      return convertToArrayObject(response)
        
    default:
      return state
  }
}