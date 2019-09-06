const initialState = {
  page_title: undefined,
  modal: {},
  modal_id: undefined,
  modal_title: undefined,
  apoyo_active: undefined,
  solicitante_active: undefined,
  credito_active: undefined,
  directores: {},
  fetching: false
}


export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {

    case 'SET_FETCHING': 

      return {
        ...state,
        fetching: true
      }
    
    case 'CHANGE_PAGE': 

      return {
        ...state,
        page_title: payload
      }

    case 'OPEN_NOTIFICATION': {
      return {
        ...state,
        modal: {
          type: payload.type,
          message: payload.message
        }
      }
    }

    case 'CLOSE_NOTIFICATION': {
      return {
        ...state,
        modal: {}
      }
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

    case 'SET_CREDITO':

      return {
        ...state,
        credito_active: payload
      }

    case 'SET_DIRECTOR':

      return {
        ...state,
        directores: {
          ...state.directores,
          ...payload
        },
        fetching: false
      }
  
    default:
      return state
  }
}