import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Form } from 'informed';
import { Button } from 'semantic-ui-react'
import { generateOptions } from "utils/index";
import formData from "./formData";

import { addCredito } from "store/actions/creditos";

import Field from "components/Field";

const validate = value => {
  return !value || value.length === 0
    ? 'Obligatorio'
    : undefined;
};

const CreditoForm = (props) => {

  const { tipo_creditos, apoyos } = props;
  const first_tc = tipo_creditos[Object.keys(tipo_creditos)[0]]

  const [TC_selected, setTC] = useState(first_tc._id);

  const tipos_credito = Object.keys(tipo_creditos).map(key => {
    let tc = tipo_creditos[key]
    return {
      label: tc.nombre,
      value: tc._id
    }
  })

  //  Get the Bolsas that belongs to the tipo de credito selected.
  const bolsasArray = Object.keys(apoyos).map(key => apoyos[key])

  const bolsasFilter = bolsasArray.filter(apoyo => {

    if (apoyo.tipo_credito === null) {
      return false
    }

    return apoyo.tipo_credito._id === TC_selected
  })

  const bolsas_options = bolsasFilter.map(bolsa => ({
    label: bolsa.nombre,
    value: bolsa._id
  }))

  //  Lineas de creditos
  const lineas = generateOptions(formData.lineas)
  const actividades = generateOptions(formData.actividades)
  const unidades = generateOptions(formData.unidades)
  const destinos = generateOptions(formData.destinos)
  const tenencias = generateOptions(formData.tenencias)

  return (
    <Form initialValues={props.item ? props.item : {}} onSubmit={values => {

      props.addCredito({
        ...values,
        solicitante: props.solicitante_active,
      })
    }}>
      {({ formState }) => (
        <div className="Form">
          <Field
            label="Tipo de crédito"
            field="tipo_credito"
            kind="select"
            options={tipos_credito}
            value={TC_selected}
            onChange={e => {
              setTC(e.target.value)
            }}
          />
          <Field label="Bolsa de Crédito" field="bolsa_credito" kind="select" options={bolsas_options} />
          <Field label="Monto Solicitado (Pesos)" field="monto" kind="currency" validate={validate} />
          <Field label="Linea" field="linea" validate={validate} kind="select" options={lineas} />
          <Field label="Domicilio de la inversion del credito" field="domicilio_inversion" />
          <Field label="Medida" field="medida" />
          <Field label="Ciclo" field="ciclo" />
          <Field label="Unidad de medida" field="unidad_medida" kind="select" options={unidades} />
          <Field label="Destino del crédito" field="destino" kind="select" options={destinos} />
          <Field label="Actividad del productor o razón social" kind="select" field="actividad" options={actividades} />
          <Field label="Tipo de tenencia" field="tenencia" kind="select" options={tenencias} />
          <Field label="TIEE (Taza Interbancaria de Interes y Equilibrio)" field="tiee" />
          <Field label="Tasa de intereses moratorios" field="tim" />
          <Field label="Tasa de intereses vencidos" field="tiv" />
          <Field label="Comision por apertura" field="comision_apertura" />
          <Button className="Form_button" color="blue" type="submit">Guardar</Button>
        </div>
      )}
    </Form>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addCredito: item => dispatch(addCredito(item))
});

const mapStateToProps = (state) => ({
  tipo_creditos: state.tipo_creditos,
  apoyos: state.apoyos
});

export default connect(mapStateToProps, mapDispatchToProps)(CreditoForm)