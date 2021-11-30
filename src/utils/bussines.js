import moment from 'moment';
import { Decimal } from "decimal.js";

export const calculateInterest = (items, tio, tiv, tim, comision, startFrom) => {
  let totales = {
    capital: 0,
    io: 0,
    iv: 0,
    im: 0,
    liquidacion: 0,
    recuperado: new Decimal(0),
    
  }

  items = items.map(item => {

    if (item.is_liquidado) {
      return {
        ...item,
        dias_ordinario: 0,
        dias_vencidos: 0,
        capital: 0,
        interes_ordinario: 0,
        interes_vencido: 0,
        interes_moratorio: 0,
        liquidacion: 0
      }
    }

    let vencimiento = moment(item.fecha_vencimiento);
    let subscipcion = moment(item.fecha_suscripcion);

    let dias_hasta_vencimiento = vencimiento.diff(subscipcion, 'days');

    let today = startFrom ? moment(startFrom) : moment();

    let dias_ordinario = today.diff(subscipcion, 'days');
    let dias_vencidos = today.diff(vencimiento, 'days');

    //  Valida que los dias ordinarios no sean mayor a la fecha de vencimiento
    dias_ordinario = dias_ordinario >= dias_hasta_vencimiento ? dias_hasta_vencimiento : dias_ordinario;
    dias_vencidos = dias_vencidos < 0 ? 0 : dias_vencidos;
    let interes_ordinario = (item.monto * (tio / 100) / 360 * dias_ordinario) - item.monto_recuperado_interes;
    let interes_vencido = (item.monto * (tiv / 100) / 360 * dias_vencidos) - item.monto_recuperado_vencido;
    let interes_moratorio = (item.monto * (tim / 100) / 360 * dias_vencidos) - item.monto_recuperado_moratorio;
    let capital = (item.monto + (item.monto * (comision / 100))) - item.monto_recuperado_capital;

    totales = {
      capital: totales.capital + capital,
      io: totales.io + interes_ordinario,
      iv: totales.iv + interes_vencido,
      im: totales.im + interes_moratorio,
      liquidacion: totales.liquidacion + capital + interes_ordinario + interes_vencido + interes_moratorio,
      recuperado: totales.recuperado.plus(item.monto_recuperado_capital)
      // recuperado: totales.recuperado.plus(item.monto_recuperado_capital).plus(item.monto_recuperado_moratorio).plus(item.monto_recuperado_vencido).plus(item.monto_recuperado_interes)
    }

    return {
      ...item,
      dias_ordinario,
      dias_vencidos,
      capital,
      interes_ordinario,
      interes_vencido,
      interes_moratorio,
      liquidacion: capital + interes_ordinario + interes_vencido + interes_moratorio
    }
  })

  return {
    totales,
    items
  }
}

/** Calculate the total of an array of items using an especific property
 * @param {Array<Object>} flatListItems The flat list of items that would be groupped by the property
 * @param {String} property The property that will be used to group items
 * @return {Object} Key-value pairs with items groupped where key will be the property value
 */
export const calculateSimpleTotal = (flatListItems, property) => {
  return flatListItems.reduce((acum, item) => {
    const value = item[property] ? item[property] : 0
    return acum.plus(value)
  }, new Decimal(0))
}