export default (state = {}, action) => {
  const {type, response} = action;
  switch (type) {
  
    case 'ADD_CREDITO':
      
      return {
        ...state,
        [response.id]: response
      }

      case 'EDIT_CREDITO':
      
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