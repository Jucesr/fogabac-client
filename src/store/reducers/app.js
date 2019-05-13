const initialState = {
  page_title: undefined,
  modal_id: undefined,
  modal_title: undefined,
  apoyo_active: undefined,
  solicitante_active: undefined
}


export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    
    case 'CHANGE_PAGE': 

      return {
        ...state,
        page_title: payload.page_title
      }

    case 'TOGGLE_MODAL': 

      return {
        ...state,
        modal_id: payload.id,
        modal_title: payload.title
      }

    case 'SET_APOYO':

      return {
        ...state,
        apoyo_active: payload
      }

    case 'SET_SOLICITANTE':

      return {
        ...state,
        solicitante_active: payload
      }
  
    default:
      return state
  }
}