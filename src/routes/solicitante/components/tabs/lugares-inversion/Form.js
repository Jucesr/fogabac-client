import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'informed';
import { Button } from 'semantic-ui-react'
import Field from "components/Field";

const validate = value => {
  return !value || value.length === 0
    ? 'Obligatorio'
    : undefined;
};

const RPForm = (props) => {
  
  return (
    <Form initialValues={props.item ? props.item : {
      
    }} onSubmit={values => props.onSubmit({
      ...values,
      numero_lote: values.numero_lote ? values.numero_lote : '',
      ejido: values.ejido ? values.ejido : '',
      superficie: values.superficie ? values.superficie : 0,
      propietario: values.propietario ? values.propietario : ''
    })}>
      {({ formState }) => (
        <div className="Form">
          <Field label="No. Lote" field="numero_lote" validate={validate} />
          <Field label="Ejido o Colonia" field="ejido"/>
          <Field label="Superficie" field="superficie" kind="number"/>
          <Field label="Propietario" field="propietario"/>
          <Field label="Documento" field="documento" kind="file"/> 
          <Button className="Form_button" color="blue" type="submit">Guardar</Button>
        </div>
      )}
    </Form>
  )
}

RPForm.propTypes = {
  item: PropTypes.object,
  onSubmit: PropTypes.func
}

export default RPForm