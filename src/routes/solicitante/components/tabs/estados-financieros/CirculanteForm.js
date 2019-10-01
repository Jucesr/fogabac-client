import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'informed';
import { Button, Tab } from 'semantic-ui-react'
import Field from "components/Field";

const RPForm = (props) => {

  return (
    <Form initialValues={props.item ? props.item : {
      
    }} onSubmit={({
      ventas_contado,
      ventas_credito,
      sueldos,
      comision,
      luz_telefono_agua,
      renta_local,
      papeleria,
      publicidad,
      primas_seguro,
      gasolina,
      otros,
      costo_ventas,
      impuestos,
    }) => props.onSubmit({
      circulante_ingresos: {
        ventas_contado,
        ventas_credito
      },
      circulante_gastos: {
        sueldos,
        comision,
        luz_telefono_agua,
        renta_local,
        papeleria,
        publicidad,
        primas_seguro,
        gasolina,
        otros
      },
      circulante_otros: {
        costo_ventas,
        impuestos
      }
    })}>
      {({ formState }) => (
        <React.Fragment>
          <Tab menu={{ secondary: true, pointing: true }} panes={[{
            menuItem: 'Ingresos', render: () => (
              <div className="Form">
                <Field keepState label="Ventas de contado" field="ventas_contado" kind="currency"/>
                <Field keepState label="Ventas de credito" field="ventas_credito" kind="currency"/>
              </div>
            )
          },{
            menuItem: 'Gastos de operación', render: () => (
              <div className="Form">
                <span></span>
                <span></span>
                <Field keepState label="Sueldos" field="sueldos" kind="currency"/>
                <Field keepState label="Comisión por ventas" field="comision" kind="currency"/>
                <Field keepState label="Luz, teléfono, agua" field="luz_telefono_agua" kind="currency"/>
                <Field keepState label="Renta de local" field="renta_local" kind="currency"/>
                <Field keepState label="Papelería y útiles de ofina" field="publicidad" kind="currency"/>
                <Field keepState label="Publicidad" field="papeleria" kind="currency"/>
                <Field keepState label="Primas de seguro" field="primas_seguro" kind="currency"/>
                <Field keepState label="Gasolina" field="gasolina" kind="currency"/>
                <Field keepState label="Otros" field="otros" kind="currency"/>
              </div>
            )
          },{
            menuItem: 'Otros', render: () => (
              <div className="Form">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <Field keepState label="Costo de ventas" field="costo_ventas" kind="currency"/>
                <Field keepState label="Impuestos" field="impuestos" kind="currency"/>
              </div>
            )
          }]}/>
          <div className="Form">
            <Button className="Form_button" color="blue" type="submit">Guardar</Button>
          </div>
        </React.Fragment>
        
        
      )}
    </Form>
  )
}

RPForm.propTypes = {
  item: PropTypes.object,
  onSubmit: PropTypes.func
}

export default RPForm