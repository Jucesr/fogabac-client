export default (state = {}, action) => {
  const {type, response} = action;
  switch (type) {
    
    case 'LOAD_APOYOS': 

      return response.reduce((acum, item, index) => {
        return {
          ...acum,
          [index] : {
            ...item,
            id: index
          }
        }
      }, {}) 

    case 'ADD_APOYO':
      
      return {
        ...state,
        [response.id]: response
      }
  
    default:
      return state
  }
}