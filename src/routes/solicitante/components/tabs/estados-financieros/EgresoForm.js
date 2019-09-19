import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'informed';
import { Button } from 'semantic-ui-react'
import Field from "components/Field";
import { validateNegative, validate } from "utils/";

const RPForm = (props) => {

  return (
    <Form initialValues={props.item ? props.item : {
      
    }} onSubmit={({
      concepto,
      superficie,
      costo,
      otros_egresos
    }) => props.onSubmit({
      egresos: [{
        concepto,
        superficie,
        costo,
        otros_egresos
      }]
    })}>
      {({ formState }) => (
        <React.Fragment>
        <div className="Form">
          <Field keepState label="Concepto" field="concepto" validate={validate}/>
          <Field keepState label="Superficie" field="superficie" kind="number" validate={validateNegative}/>
          <Field keepState label="Costo" field="costo" kind="number" validate={validateNegative}/>
          <Field keepState label="Otros egresos" field="otros_egresos" kind="currency" />
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