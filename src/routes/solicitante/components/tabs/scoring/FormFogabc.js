import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'informed';
import { Button } from 'semantic-ui-react'
import Field from "components/Field";
import { generateOptions } from "utils/index";
import formData from "./formData";
import { replaceAll, validate } from "utils/index";

const RPForm = (props) => {

  const q1 = generateOptions(formData.edad)
  const q2 = generateOptions(formData.antiguedad_negocio)
  const q3 = generateOptions(formData.giro_negocio)
  const q4 = generateOptions(formData.maquinaria)
  const q5 = generateOptions(formData.activos)
  const q6 = generateOptions(formData.empleados_conservados)
  const q7 = generateOptions(formData.empleados_generar)
  
  let initialValues = {};
  if(props.item){
    Object.keys(props.item).map(key => {
      let item = props.item[key];
      let value = formData[key][item];
      initialValues[key] = replaceAll(value,' ','_').toLowerCase();
    })
  }

  return (
    <Form initialValues={initialValues} onSubmit={({
      edad,
      antiguedad_negocio,
      giro_negocio,
      maquinaria,
      activos,
      empleados_conservados,
      empleados_generar
    }) => {

      edad = q1.findIndex(i => i.value == edad)
      antiguedad_negocio = q2.findIndex(i => i.value == antiguedad_negocio)
      giro_negocio = q3.findIndex(i => i.value == giro_negocio)
      maquinaria = q4.findIndex(i => i.value == maquinaria)
      activos = q5.findIndex(i => i.value == activos)
      empleados_conservados = q6.findIndex(i => i.value == empleados_conservados)
      empleados_generar = q7.findIndex(i => i.value == empleados_generar)

      props.onSubmit({
        fogabac: {
          edad,
          antiguedad_negocio,
          giro_negocio,
          maquinaria,
          activos,
          empleados_conservados,
          empleados_generar
        }
      })
    }}>
      {({ formState }) => (
        <React.Fragment>
        <div className="Form">
            <Field validate={validate} keepState options={q1} label="Edad del solicitante" field="edad" kind="select"/>
            <Field validate={validate} keepState options={q2} label="Antiguedad en el negocio" field="antiguedad_negocio" kind="select"/>
            <Field validate={validate} keepState options={q3} label="Giro del negocio" field="giro_negocio" kind="select"/>
            <Field validate={validate} keepState options={q4} label="Maquinaria y Equipo" field="maquinaria" kind="select"/>
            <Field validate={validate} keepState options={q5} label="Activos Fijos" field="activos" kind="select"/>
            <Field validate={validate} keepState options={q6} label="No. de empleados conservados" field="empleados_conservados" kind="select"/>
            <Field validate={validate} keepState options={q7} label="No. de empleados generados" field="empleados_generar" kind="select"/>
          </div>
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