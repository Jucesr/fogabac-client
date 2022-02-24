import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Form } from 'informed';
import { Button } from 'semantic-ui-react'
import { generateOptions, formatColumn } from "utils/index";
import formData from "./formData";

import actions from "store/actions/creditos";

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
  const [activity_selected, setActivity] = useState();

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
  const lineas = activity_selected ? generateOptions(formData.lineas[activity_selected]) : []
  const actividades = generateOptions(formData.actividades)
  const unidades = generateOptions(formData.unidades)
  const destinos = generateOptions(formData.destinos)
  const tenencias = generateOptions(formData.tenencias)

  const validateFields = values => {
    const bolsa = apoyos[values.bolsa_credito]

    if(bolsa){
      return {
        monto: values.monto > bolsa.monto_maximo ? `El monto no puede ser mayor a ${formatColumn("currency",bolsa.monto_maximo)}`: undefined
       }
    }else{
      return {}
    }
    
  }

  return (
    <Form validateFields={validateFields} initialValues={props.item ? props.item : {}} onSubmit={values => {

      props.addCredito({
        ...values,
        solicitante: props.solicitante_active,
      })

      props.onSubmit();
    }}>
      {({ formState }) => (
        <div className="Form">
           <Field label="Fecha de subscripción" field="fecha_suscripcion" kind="datepicker" validate={validate} />
           <Field label="Fecha de vencimiento" field="fecha_vencimiento" kind="datepicker" validate={validate} />
         
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
          <Field label="Bolsa de Crédito" field="bolsa_credito" kind="select" options={bolsas_options} validate={validate} />
          <Field label="Monto Solicitado (Pesos)" field="monto" kind="currency" validate={validate} />
          <Field label="Actividad del productor" kind="select" field="actividad" options={actividades} validate={validate} onChange={e => setActivity(e.target.value)}  />
          <Field label="Linea" field="linea" validate={validate} kind="select" options={lineas} />
          <Field label="Domicilio de la inversion del credito" field="domicilio_inversion" validate={validate} />
          <Field label="Medida" field="medida" kind="number" validate={validate}  />
          <Field label="Unidad de medida" field="unidad_medida" kind="select" options={unidades} validate={validate}  />
          <Field label="Ciclo" field="ciclo" validate={validate}  />
          <Field label="Destino del crédito" field="destino" kind="select" options={destinos} validate={validate}  />
          <Field label="Tipo de tenencia" field="tenencia" kind="select" options={tenencias} validate={validate}  />
          <Field label="Tasa de interes ordinario" field="tio" kind="percentage" validate={validate}  />
          <Field label="Tasa de intereses moratorios" field="tim" kind="percentage" validate={validate}  />
          <Field label="Tasa de intereses vencidos" field="tiv" kind="percentage"validate={validate}  />
          <Field label="Comision por apertura" field="comision_apertura" kind="percentage" validate={validate}  />
          <Button className="Form_button" color="blue" type="submit">Guardar</Button>
        </div>
      )}
    </Form>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addCredito: item => dispatch(actions.add(item))
});

const mapStateToProps = (state) => ({
  tipo_creditos: state.tipo_creditos,
  apoyos: state.apoyos
});

export default connect(mapStateToProps, mapDispatchToProps)(CreditoForm)