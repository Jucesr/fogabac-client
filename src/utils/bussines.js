export const calculateInterest = (items, tiee, tiv, tim, comision) => {
  let totales = {
    capital: 0,
    io: 0,
    iv: 0,
    im: 0,
    liquidacion: 0
  }

  items = items.map(item => {

    if(item.is_liquidado){
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

    let vencimiento = new Date(item.fecha_vencimiento);
    let subscipcion  = new Date(item.fecha_suscripcion);

    let dias_hasta_vencimiento = (vencimiento - subscipcion) / 86400000;

    let today = Date.now();
    let dias_ordinario = Math.floor(( today - subscipcion) / 86400000)
    let dias_vencidos = Math.floor(( Date.now()  - vencimiento) / 86400000)
    
    //  Valida que los dias ordinarios no sean mayor a la fecha de vencimiento
    dias_ordinario = dias_ordinario >= dias_hasta_vencimiento ? dias_hasta_vencimiento : dias_ordinario;
    dias_vencidos = dias_vencidos < 0 ? 0 : dias_vencidos;
    let interes_ordinario = (item.monto * (tiee/100) / 360 * dias_ordinario) - item.monto_recuperado_interes; 
    let interes_vencido = (item.monto * (tiv/100) / 360 * dias_vencidos) - item.monto_recuperado_vencido; 
    let interes_moratorio = (item.monto * (tim/100) / 360 * dias_vencidos) - item.monto_recuperado_moratorio; 
    let capital = (item.monto + (item.monto * (comision / 100))) - item.monto_recuperado_capital;

    totales = {
      capital: totales.capital + capital,
      io: totales.io + interes_ordinario,
      iv: totales.iv + interes_vencido,
      im: totales.im + interes_moratorio,
      liquidacion: totales.liquidacion + capital + interes_ordinario + interes_vencido + interes_moratorio
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

  return{
    totales,
    items
  }
}