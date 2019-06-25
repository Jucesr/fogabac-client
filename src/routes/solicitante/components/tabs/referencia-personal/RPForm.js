import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'informed';
import { Button } from 'semantic-ui-react'
import Field from "components/Field";

const RPForm = (props) => {
  return (
    <Form initialValues={props.item ? props.item : {}} onSubmit={values => props.onSubmit(values)}>
      {({ formState }) => (
        <div className="Form">
          <Field label="Nombre" field="nombre"/>
          <Field label="Teléfono" field="telefono"/>
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