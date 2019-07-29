import React from 'react'
import { Form} from 'informed';
import { Button, Tab } from 'semantic-ui-react'


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

        <React.Fragment>
          <Tab menu={{ secondary: true, pointing: true }} panes={[
          { menuItem: 'Datos personales', render: () => (
              <div className="Form">
                <Field label="Apellido paterno" field="paterno" validate={validate} keepState  />
                <Field label="Apellido materno" field="materno" validate={validate} keepState/>
                <Field label="Nombre" field="nombre" validate={validate}keepState />
                <Field label="RFC" field="rfc" keepState/>
                <Field label="CURP" field="curp" keepState  />
                <Field label="Teléfono" field="telefono" keepState />
                <Field label="Estado Civil" field="estado_civil" kind="select" options={estados_civi} keepState/>   
                <Field label="Sexo" field="sexo" kind="select" options={sexos} keepState />
                <Field label="Municipio" field="municipio" kind="select" options={municipios} keepState/>
                <Field label="Localidad" field="localidad" kind="select" options={municipios} keepState/>
              </div>
          ) },
          { menuItem: 'Extras', render: () => (
            <div className="Form Form_tab">
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
                <Field label="Fecha de nacimiento" field="fecha_nacimiento" kind="datepicker" keepState />
                <Field label="Lugar de nacimiento" field="lugar_nacimiento" keepState/>
                <Field label="Domicilio" field="domicilio" keepState/>
                <Field label="Código postal" field="codigo_postal" keepState />
                <Field label="No. de identificación" field="no_identificacion" keepState />
                <Field label="Tipo de identificación" field="tipo_identificacion" keepState/>
              </div>
          ) },
          { menuItem: 'Datos bancarios', render: () => (
            <div className="Form Form_tab">
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
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <Field label="Cuenta" field="cuenta" keepState  />
                <Field label="Clabe" field="clabe" keepState  />
                <Field label="Banco" field="banco" keepState  />
                <Field label="Plaza" field="plaza" keepState />
              </div>
          ) }
          ]} />
          <div className="Form">
            <Button className="Form_button" color="blue" type="submit">Guardar</Button>
          </div>
          
        </React.Fragment>
        
      )}
    </Form>
    
  )
}



export default SolicitanteForm