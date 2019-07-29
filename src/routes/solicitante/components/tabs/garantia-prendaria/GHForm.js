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
      serie: values.serie ? values.serie : '',
      marca: values.marca ? values.marca : '',
      modelo: values.modelo ? values.modelo : '',
      tipo: values.tipo ? values.tipo : '',
      observacion : values.observacion ? values.observacion : '',
      valor_estimado: values.valor_estimado ? values.valor_estimado : 0
    })}>
      {({ formState }) => (
        <div className="Form">
          <Field label="Descripción" field="descripcion" validate={validate} />
          <Field label="Serie" field="serie"/>
          <Field label="Marca" field="marca"/>
          <Field label="Modelo" field="modelo"/>
          <Field label="Tipo" field="tipo"/>
          <Field label="Observación" field="observacion"/>
          <Field label="Valor Estimado" field="valor_estimado" kind="currency"/>
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