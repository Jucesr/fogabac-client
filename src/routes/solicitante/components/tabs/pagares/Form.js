import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'informed';
import { Button } from 'semantic-ui-react'
import Field from "components/Field";
import { validateMax } from "utils/";

const validate = value => {
  return !value || value.length === 0
    ? 'Obligatorio'
    : undefined;
};

const RPForm = (props) => {
  return (
    <Form initialValues={props.item ? props.item : {}} onSubmit={values => props.onSubmit({
      ...values
    })}>
      {({ formState }) => (
        <div className="Form">
          <Field label="Fecha de suscripción" field="fecha_suscripcion" kind="datepicker" validate={validate} />
          <Field label="Fecha de vencimiento" field="fecha_vencimiento" kind="datepicker" validate={validate} />
          <Field label="Concepto" field="concepto" validate={validate}/>
          <Field label="Monto" field="monto" kind="currency" validate={validateMax(props.max)}/> 
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