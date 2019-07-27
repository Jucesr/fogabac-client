import { convertToArrayObject } from "utils/index";

export default (state = {}, action) => {
  const {type, response, payload} = action;
  switch (type) {
    
    case 'LOAD_CREDITOS': {
      return convertToArrayObject(response)
    }

    case 'ADD_CREDITO':{
      return {
        ...state,
        [response._id]: response
      }
    }

    case 'UPDATE_CREDITO':{
      return {
        ...state,
        [response._id]: response
      }
    }

    //*************************
    //  REFERENCIAS PERSONALES
    //*************************

    case 'LOAD_REFERENCIAS_PERSONALES': {
      return{
        ...state,
        [payload]: {
          ...state[payload],
          referencias_personales: response
        }
      }
    }

      

    case 'ADD_REFERENCIA_PERSONAL': {
      const credito_id = response.credito;
      return{
        ...state,
        [credito_id]: {
          ...state[credito_id],
          referencias_personales: [
            ...state[credito_id].referencias_personales,
            response
          ]
        }
      }
    }

      

    case 'DELETE_REFERENCIA_PERSONAL': {
      const credito_id = response.credito;
      const rps = state[credito_id].referencias_personales.filter(rp => rp._id !== response._id);

      return{
        ...state,
        [credito_id]: {
          ...state[credito_id],
          referencias_personales: rps
        }
      }
    }

    case 'UPDATE_REFERENCIA_PERSONAL': {
      const credito_id = response.credito;
      const items = state[credito_id].referencias_personales
      
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
        [credito_id]: {
          ...state[credito_id],
          referencias_personales: rps
        }
      }
    }

    //*************************
    //  GARANTIA HIPOTECARIA
    //*************************

    case 'LOAD_GARANTIAS_HIPOTECARIAS': {
      return{
        ...state,
        [payload]: {
          ...state[payload],
          garantias_hipotecarias: response
        }
      }
    }

      

    case 'ADD_GARANTIA_HIPOTECARIA': {
      const credito_id = response.credito;
      return{
        ...state,
        [credito_id]: {
          ...state[credito_id],
          garantias_hipotecarias: [
            ...state[credito_id].garantias_hipotecarias,
            response
          ]
        }
      }
    }

    case 'DELETE_GARANTIA_HIPOTECARIA': {
      const credito_id = response.credito;
      const rps = state[credito_id].garantias_hipotecarias.filter(rp => rp._id !== response._id);

      return{
        ...state,
        [credito_id]: {
          ...state[credito_id],
          garantias_hipotecarias: rps
        }
      }
    }

    case 'UPDATE_GARANTIA_HIPOTECARIA': {
      const credito_id = response.credito;
      const items = state[credito_id].garantias_hipotecarias
      
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
        [credito_id]: {
          ...state[credito_id],
          garantias_hipotecarias: rps
        }
      }
    }

    //*************************
    //  PAGARES
    //*************************

    // case 'LOAD_PAGARES': {
    //   return{
    //     ...state,
    //     [payload]: {
    //       ...state[payload],
    //       pagares: response
    //     }
    //   }
    // }

    
  
    default:
      let newState = generateHandlers(state, action, 'pagare', 'pagares', {
        onAdd: (response, credito) => {
          const {importe_ejercido = 0} = credito
          return {
            importe_ejercido: importe_ejercido + response.monto
          }},
        onUpdate: (response, credito) => {
          const {importe_ejercido = 0} = credito
          return {
            importe_ejercido: importe_ejercido + response.monto
          }},
        onDelete: (response, credito) => {
          const {importe_ejercido = 0} = credito
          return {
            importe_ejercido: importe_ejercido - response.monto
          }}
      });


      newState = generateHandlers(newState, action, 'recuperacion', 'recuperaciones', {
        onAdd: (response, credito) => {
          const {importe_recuperado = 0} = credito
          return {
            importe_recuperado: importe_recuperado + response.pagares.reduce((acum, p ) => acum + p.monto_capital, 0)
          }},
        onUpdate: (response, credito) => {
          const {importe_recuperado = 0} = credito
          return {
            importe_recuperado: importe_recuperado - response.pagares.reduce((acum, p ) => acum + p.monto_capital, 0)
          }},
        onDelete: (response, credito) => {
          const {importe_recuperado = 0} = credito
          return {
            importe_recuperado: importe_recuperado - response.pagares.reduce((acum, p ) => acum + p.monto_capital, 0)
          }}
      });

      return newState
  }
}

const generateHandlers = (state, action, entity, entityPlural, callbacks = {
  onAdd: () => {},
  onUpdate: () => {},
  onDelete: () => {},
  onLoad: () => {}
}) => {
  const {type, response, payload} = action;

  switch (type) {
    case `LOAD_${entityPlural.toUpperCase()}`: {
      return{
        ...state,
        [payload]: {
          ...state[payload],
          [entityPlural]: response
        }
      }
    }

      

    case `ADD_${entity.toUpperCase()}`: {
      const credito_id = response.credito;
      return{
        ...state,
        [credito_id]: {
          ...state[credito_id],
          [entityPlural]: [
            ...state[credito_id][entityPlural],
            response
          ],
          ...callbacks.onAdd(response, state[credito_id])
        }
      }
    }

    case `DELETE_${entity.toUpperCase()}`: {
      const credito_id = response.credito;
      const rps = state[credito_id][entityPlural].filter(rp => rp._id !== response._id);

      return{
        ...state,
        [credito_id]: {
          ...state[credito_id],
          [entityPlural]: rps,
          ...callbacks.onDelete(response, state[credito_id])
        }
      }
    }

    case `UPDATE_${entity.toUpperCase()}`: {
      const credito_id = response.credito;
      const items = state[credito_id][entityPlural]
      
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
        [credito_id]: {
          ...state[credito_id],
          [entityPlural]: rps,
          ...callbacks.onUpdate(response, state[credito_id])
        }
      }
    }
  
    default:
      return state

  }
    

}