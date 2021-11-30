import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'informed';
import { Button, Tab } from 'semantic-ui-react'
import Field from "components/Field";
import municipios from "catalogs/municipios";
import tipos_seccion from "catalogs/tipos_seccion";

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

          <React.Fragment>
            <Tab menu={{ secondary: true, pointing: true }} panes={[{
              menuItem: 'Datos generales', render: () => (
                <div className="Form">
                  <Field keepState label="Numero Lote" field="numero_lote" validate={validate} />
                  <Field keepState label="Manzana" field="manzana"/>
                  <Field keepState label="Colonia" field="colonia"/>
                  <Field keepState label="Titular" field="titular"/>
                  <Field keepState label="Escritura Publica" field="escritura_publica"/>
                  <Field keepState label="Volumen" field="volumen" kind="number"/>
                  <Field keepState label="Fecha" field="fecha" kind="datepicker" />
                  <Field keepState label="Numero Notario" field="numero_notario"/>
                  <Field keepState label="Partida" field="partida"/>
                  <Field keepState label="Municipio" field="municipio" kind="select" options={municipios} />
                  <Field keepState label="Valor Estimado" field="valor_estimado" kind="currency"/>
                  <Field keepState label="Sección" field="seccion" kind="select" options={tipos_seccion}/>
                  <Field keepState label="Titular Notaria" field="titular_notaria"/>
                  <Field keepState label="Documento" field="documento" kind="file"/> 
                </div>
              )
            },{
              menuItem: 'Colindancia de terreno', render: () => (
                <div className="Form">
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
                  <Field keepState label="Superficie" kind="number" field="superficie" validate={validate}/>
                  <Field keepState label="Norte" field="norte"/>
                  <Field keepState label="Sur" field="sur"/>
                  <Field keepState label="Este" field="este"/>
                  <Field keepState label="Oeste" field="oeste"/>
                  <Field keepState label="Sureste" field="sureste"/>
                  <Field keepState label="Suroeste" field="suroeste"/>
                  <Field keepState label="Noreste" field="noreste"/>
                  <Field keepState label="Noroeste" field="noroeste"/>
                </div>
              )
            }]}/>
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