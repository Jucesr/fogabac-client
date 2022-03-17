import moment from 'moment';
import { Decimal } from "decimal.js";

/** Calcula el monto de interes de cada pagaré, además de calcular el monto total de la liquidación.
 * @param {Array<Object>} pagares
 * @param {Number} tio Tasa de interes ordinario
 * @param {Number} tiv Tasa de interes vencido
 * @param {Number} tim Tasa de interes moratorio
 * @param {Number} comision Comisión por apertura de credito
 * @param {String} interestDate La fecha con la que se hará el cálculo de intereses
 * @return {Object.totales} El total de capital, intereses ordinarios, intereses vencidos y intereses moratorios
 * @return {Object.items} Los pagares procesados con los intereses calculados
 */
export const calculateInterest = (pagares, tio, tiv, tim, comision, interestDate) => {
  let totales = {
    capital: 0,
    io: 0,
    iv: 0,
    im: 0,
    liquidacion: 0,
    recuperado: new Decimal(0),

  }

  const process_pagares = pagares.map(pagare => {

    if (pagare.is_liquidado) {
      return {
        ...pagare,
        dias_ordinario: 0,
        dias_vencidos: 0,
        capital: 0,
        interes_ordinario: 0,
        interes_vencido: 0,
        interes_moratorio: 0,
        liquidacion: 0
      }
    }

    let vencimiento = moment(pagare.fecha_vencimiento);
    let subscipcion = moment(pagare.fecha_suscripcion);

    let dias_hasta_vencimiento = vencimiento.diff(subscipcion, 'days');

    let today = interestDate ? moment(interestDate) : moment();

    let dias_ordinario = today.diff(subscipcion, 'days');
    let dias_vencidos = today.diff(vencimiento, 'days');

    //  Valida que los dias ordinarios no sean mayor a la fecha de vencimiento
    dias_ordinario = dias_ordinario >= dias_hasta_vencimiento ? dias_hasta_vencimiento : dias_ordinario;
    dias_vencidos = dias_vencidos < 0 ? 0 : dias_vencidos;
    let interes_ordinario = (pagare.monto * (tio / 100) / 360 * dias_ordinario) - pagare.monto_recuperado_interes;
    let interes_vencido = (pagare.monto * (tiv / 100) / 360 * dias_vencidos) - pagare.monto_recuperado_vencido;
    let interes_moratorio = (pagare.monto * (tim / 100) / 360 * dias_vencidos) - pagare.monto_recuperado_moratorio;
    // let capital = (pagare.monto + (pagare.monto * (comision / 100))) - pagare.monto_recuperado_capital;
    // La comisión no forma parte del financiamiento;
    let capital = (pagare.monto) - pagare.monto_recuperado_capital;


    totales = {
      capital: totales.capital + capital,
      io: totales.io + interes_ordinario,
      iv: totales.iv + interes_vencido,
      im: totales.im + interes_moratorio,
      liquidacion: totales.liquidacion + capital + interes_ordinario + interes_vencido + interes_moratorio,
      recuperado: totales.recuperado.plus(pagare.monto_recuperado_capital)
    }

    return {
      ...pagare,
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
    items: process_pagares
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