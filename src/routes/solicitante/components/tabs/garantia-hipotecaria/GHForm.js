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

  const municipios = [{
    label: 'Mexicali',
    value: 'mexicali'
  },{
    label: 'Tijuana',
    value: 'tijuana'
  },{
    label: 'Tecate',
    value: 'tecate'
  },{
    label: 'Ensenada',
    value: 'ensenada'
  }]

  return (
    <Form initialValues={props.item ? props.item : {
      
    }} onSubmit={values => props.onSubmit({
      ...values,
      manzana: values.manzana ? values.manzana : '',
      colonia: values.colonia ? values.colonia : '',
      superficie: values.superficie ? values.superficie : 0,

      norte: values.norte ? values.norte : '0',
      sur: values.sur ? values.sur : '0',
      este: values.este ? values.este : '0',
      sureste: values.sureste ? values.sureste : '0',
      suroeste: values.suroeste ? values.suroeste : '0',
      noroeste: values.noroeste ? values.noroeste : '0',
      noreste: values.noreste ? values.noreste : '0',

      titular: values.titular ? values.titular : '',
      escritura_publica : values.escritura_publica ? values.escritura_publica : '',
      volumen : values.volumen ? values.volumen : 0,
      fecha : values.fecha ? values.fecha : '', 
      numero_notario : values.numero_notario ? values.numero_notario : '',
      partida : values.partida ? values.partida : '',
      municipio : values.municipio ? values.municipio : 'mexicali',
      valor_estimado: values.valor_estimado ? values.valor_estimado : 0,
      seccion : values.seccion ? values.seccion : '',
      titular_notaria : values.titular_notaria ? values.titular_notaria : ''
    })}>
      {({ formState }) => (
        <div className="Form">
          <Field label="Numero Lote" field="numero_lote" validate={validate} />
          <Field label="Manzana" field="manzana"/>
          <Field label="Colonia" field="colonia"/>
          <Field label="Superficie" kind="number" field="superficie" validate={validate}/>
          
          <Field label="Norte" field="norte"/>
          <Field label="Sur" field="sur"/>
          <Field label="Este" field="este"/>
          <Field label="Sureste" field="sureste"/>
          <Field label="Suroeste" field="suroeste"/>
          <Field label="Noreste" field="noreste"/>
          <Field label="Noroeste" field="noroeste"/>

          <Field label="Titular" field="titular"/>
          <Field label="Escritura Publica" field="escritura_publica"/>
          <Field label="Volumen" field="volumen" kind="number"/>
          <Field label="Fecha" field="fecha" kind="datepicker" />
          <Field label="Numero Notario" field="numero_notario"/>
          <Field label="Partida" field="partida"/>
          <Field label="Municipio" field="municipio" kind="select" options={municipios} />
          <Field label="Valor Estimado" field="valor_estimado" kind="currency"/>
          <Field label="Sección" field="seccion"/>
          <Field label="Titular Notaria" field="titular_notaria"/>

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