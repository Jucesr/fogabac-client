import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'informed';
import { Button, Tab } from 'semantic-ui-react'
import Field from "components/Field";

const RPForm = (props) => {

  return (
    <Form initialValues={props.item ? props.item : {
      
    }} onSubmit={({
      proveedores,
      acreedores,
      impuestos_por_pagar,
      creditos_bancarios_corto,
      corto_plazo,
      creditos_bancarios,
      otras_obligaciones,
      rentas_cobradas
    }) => props.onSubmit({
      pasivo_circulante: {
        proveedores,
        acreedores,
        impuestos_por_pagar,
        creditos_bancarios_corto,
        corto_plazo
      },
      pasivo_largo_plazo: {
        creditos_bancarios,
        otras_obligaciones,
        rentas_cobradas
      }
    })}>
      {({ formState }) => (
        <React.Fragment>
          <Tab menu={{ secondary: true, pointing: true }} panes={[{
            menuItem: 'Pasivo Circulante', render: () => (
              <div className="Form">
                <Field keepState label="Proveedores" field="proveedores" kind="currency"/>
                <Field keepState label="Acreedores diversos" field="acreedores" kind="currency"/>
                <Field keepState label="Impuestos por pagar" field="impuestos_por_pagar" kind="currency"/>
                <Field keepState label="Creditos bancaros a corto plazo" field="creditos_bancarios_corto" kind="currency"/>
                <Field keepState label="Otros pasivos a corto plazo" field="corto_plazo" kind="currency"/>
              </div>
            )
          },{
            menuItem: 'Pasivo a largo plazo', render: () => (
              <div className="Form">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <Field keepState label="Creditos bancarios" field="creditos_bancarios" kind="currency"/>
                <Field keepState label="Otras obligaciones a largo plazo" field="otras_obligaciones" kind="currency"/>
                <Field keepState label="Rentas cobradas por anticipado" field="rentas_cobradas" kind="currency"/>
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