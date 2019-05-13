export default (state = {}, action) => {
  const {type, response} = action;
  switch (type) {
    
    case 'LOAD_SOLICITANTES': 

      return response.reduce((acum, item, index) => {
        return {
          ...acum,
          [index] : {
            ...item,
            id: index
          }
        }
      }, {}) 

    case 'ADD_SOLICITANTE':
      
      return {
        ...state,
        [response.id]: response
      }

      case 'EDIT_SOLICITANTE':
      
      return {
        ...state,
        [response.id]: {
          ...state[response.id],
          ...response
        }
      }
  
    default:
      return state
  }
}