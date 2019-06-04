import React from 'react'
import { Form} from 'informed';
import { Button } from 'semantic-ui-react'


import Field from "components/Field";

const validate = value => {
  return !value || value.length === 0
    ? 'Obligatorio'
    : undefined;
};

const SolicitanteForm = (props) => {

  const estados_civi = [{
    label: 'Soltero',
    value: 'soltero'
  },{
    label: 'Viudo',
    value: 'viudo'
  },{
    label: 'Casado',
    value: 'casado'
  },{
    label: 'Divorciado',
    value: 'divorciado'
  }]

  const sexos = [{
    label: 'Masculino',
    value: 'masculino'
  },{
    label: 'Femenino',
    value: 'fenemino'
  }]

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
    <Form initialValues={props.item ? props.item : {}} onSubmit={props.onSubmit}>
      {({ formState }) => (
        <div className="Form">
          <Field label="Apellido paterno" field="paterno" validate={validate} />
          <Field label="Apellido materno" field="materno" validate={validate} />
          <Field label="Nombre" field="nombre" validate={validate} />
          <Field label="Domicilio" field="domicilio" />
          <Field label="RFC" field="rfc" />
          <Field label="Código postal" field="codigo_postal" />
          <Field label="CURP" field="curp" />
          <Field label="Teléfono" field="telefono" />
          <Field label="Estado Civil" field="estado_civil" kind="select" options={estados_civi} />
          <Field label="Fecha de nacimiento" field="fecha_nacimiento" kind="datepicker" />
          <Field label="No. de identificación" field="no_identificacion" />
          <Field label="Tipo de identificación" field="tipo_identificacion" />
          <Field label="Lugar de nacimiento" field="lugar_nacimiento"/>
          <Field label="Sexo" field="sexo" kind="select" options={sexos} />
          <Field label="Municipio" field="municipio" kind="select" options={municipios} />
          <Field label="Localidad" field="localidad" kind="select" options={municipios}/>

          <Button className="Form_button" color="blue" type="submit">Guardar</Button>
        </div>
      )}
    </Form>
  )
}



export default SolicitanteForm