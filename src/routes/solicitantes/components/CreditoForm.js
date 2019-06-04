import React from 'react'
import { Form} from 'informed';
import { Button } from 'semantic-ui-react'
import { generateOptions } from "utils/index";

import Field from "components/Field";

const validate = value => {
  return !value || value.length === 0
    ? 'Obligatorio'
    : undefined;
};

const CreditoForm = (props) => {

  const tipos_credito = generateOptions([
    'REFACCIONARIO',
    'AVIO',
    'CONVENIO JUDICIAL',
    'CORTO PLAZO',
    'CREDITO SIMPLE',
    'CUENTA CORRIENTE',
    'FUENTE',
    'PRORROGA',
    'PUENTE',
    'REESTRUCTURA',
    'SIMPLE',
    'RENOVACION'
  ])

  return (
    <Form initialValues={props.item ? props.item : {}} onSubmit={props.onSubmit}>
      {({ formState }) => (
        <div className="Form">
          <Field label="Bolsa de Crédito" field="bolsa_credito" validate={validate} />
          <Field label="Monto Solicitado (Pesos)" field="monto" validate={validate} />
          <Field label="Tipo de crédito" field="tipo_credito" kind="select" options={tipos_credito}/>
          <Field label="Linea" field="linea" validate={validate} />
          <Field label="Domicilio de la inversion del credito" field="domicilio_credito" />
          <Field label="Medida" field="medida" />
          <Field label="Ciclo" field="ciclo" />
          <Field label="Unidad de medida" field="unidad_medida" />
          <Field label="Destino del crédito" field="destino_credito" />
          <Field label="Actividad del productor o razón social" field="razon_social" />
          <Field label="Tipo de tenencia" field="tipo_tenencia" />
          <Field label="TIEE (Taza Interbancaria de Interes y Equilibrio)" field="tiee" />
          <Field label="Tasa de intereses moratorios" field="tim" />
          <Field label="Tasa de intereses vencidos" field="tiv"/>
          <Field label="Comision por apertura" field="comision_apertura"/>
          <Button className="Form_button" color="blue" type="submit">Guardar</Button>
        </div>
      )}
    </Form>
  )
}



export default CreditoForm