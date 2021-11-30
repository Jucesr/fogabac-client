import React from 'react'
import { Form} from 'informed';
import { Button, Tab } from 'semantic-ui-react'

import Field from "components/Field";

import municipios from "catalogs/municipios";
import sexos from "catalogs/sexos";
import estados_civil from "catalogs/estados_civil";
import tipos_identificacion from "catalogs/tipos_identificacion";

const validate = value => {
  return !value || value.length === 0
    ? 'Obligatorio'
    : undefined;
};

const SolicitanteForm = (props) => {

  return (
    <Form initialValues={props.item ? props.item : {}} onSubmit={props.onSubmit}>
      {({ formState }) => (

        <React.Fragment>
          <Tab menu={{ secondary: true, pointing: true }} panes={[
          { menuItem: 'Datos personales I', render: () => (
              <div className="Form">
                <Field label="Apellido paterno" field="paterno" validate={validate} keepState disabled={props.disabled}  />
                <Field label="Apellido materno" field="materno" validate={validate} keepState disabled={props.disabled}/>
                <Field label="Nombre" field="nombre" validate={validate}keepState disabled={props.disabled} />
                <Field label="RFC" field="rfc" keepState/>
                <Field label="CURP" field="curp" keepState  />
                <Field label="Teléfono" field="telefono" keepState />
                <Field label="Estado Civil" field="estado_civil" kind="select" options={estados_civil} keepState/>   
                <Field label="Sexo" field="sexo" kind="select" options={sexos} keepState />
                <Field label="Municipio" field="municipio" kind="select" options={municipios} keepState/>
                <Field label="Localidad" field="localidad" kind="select" options={municipios} keepState/>
              </div>
          ) },
          { menuItem: 'Datos personales II', render: () => (
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
                <Field label="Tipo de identificación" field="tipo_identificacion" kind="select" options={tipos_identificacion} keepState/>
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