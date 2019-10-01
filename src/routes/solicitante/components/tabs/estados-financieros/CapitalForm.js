import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'informed';
import { Button } from 'semantic-ui-react'
import Field from "components/Field";

const RPForm = (props) => {

  return (
    <Form initialValues={props.item ? props.item : {
      
    }} onSubmit={({
      social,
      resultados_acumulados,
      utilidad_perdida
    }) => props.onSubmit({
      capital: {
        social,
        resultados_acumulados,
        utilidad_perdida
      }
    })}>
      {({ formState }) => (
        <React.Fragment>
          <div className="Form">
              <Field keepState label="Capital social" field="social" kind="currency"/>
              <Field keepState label="Resultados acumulados" field="resultados_acumulados" kind="currency"/>
              <Field keepState label="Utilidad o pérdida último periodo" field="utilidad_perdida" kind="currency"/>
            </div>
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