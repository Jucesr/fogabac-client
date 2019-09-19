import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'informed';
import { Button, Tab } from 'semantic-ui-react'
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
      numero_parcela: values.numero_parcela ? values.numero_parcela : '',
      ejido: values.ejido ? values.ejido : '',
      superficie: values.superficie ? values.superficie : 0,

      norte: values.norte ? values.norte : '0',
      sur: values.sur ? values.sur : '0',
      este: values.este ? values.este : '0',
      sureste: values.sureste ? values.sureste : '0',
      suroeste: values.suroeste ? values.suroeste : '0',
      noroeste: values.noroeste ? values.noroeste : '0',
      noreste: values.noreste ? values.noreste : '0',

      titular: values.titular ? values.titular : '',
      registro_agrario : values.registro_agrario ? values.registro_agrario : '',
      fecha : values.fecha ? values.fecha : '', 
      certificado_parcelario : values.certificado_parcelario ? values.certificado_parcelario : '',
      valor: values.valor ? values.valor : 0
    })}>
      {({ formState }) => (

          <React.Fragment>
            <Tab menu={{ secondary: true, pointing: true }} panes={[{
              menuItem: 'Datos generales', render: () => (
                <div className="Form">
                  <Field keepState label="Numero Parcela" field="numero_parcela" validate={validate} />
                  <Field keepState label="Ejido" field="ejido"/>
                  <Field keepState label="Titular" field="titular"/>
                  <Field keepState label="Registro agrario nacional" field="registro_agrario"/>
                  <Field keepState label="Fecha" field="fecha" kind="datepicker" />
                  <Field keepState label="Certificado Parcelario" field="certificado_parcelario"/>
                  <Field keepState label="Valor Estimado" field="valor" kind="currency"/>
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
                  <Field keepState label="Superficie" kind="number" field="superficie" validate={validate}/>
                  <Field keepState label="Norte" field="norte"/>
                  <Field keepState label="Sur" field="sur"/>
                  <Field keepState label="Este" field="este"/>
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