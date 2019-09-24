import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'informed';
import { Button } from 'semantic-ui-react'
import Field from "components/Field";
import { generateOptions } from "utils/index";
import formData from "./formData";
import { replaceAll, validate } from "utils/index";

const RPForm = (props) => {

  const yesno = generateOptions(formData.yesno)

  let initialValues = {};
  if(props.item){
    Object.keys(props.item).map(key => {
      let item = props.item[key];
      initialValues[key] = item ? 'si' : 'no';
    })
  }

  return (
    <Form initialValues={initialValues} onSubmit={({
      nueva_tecnologia,
      nuevos_insumos,
      diversificar_mercados,
      adultos_mayores,
      profesionales,
      empleos_indirectos,
    }) => {

      nueva_tecnologia = yesno.findIndex(i => i.value == nueva_tecnologia)
      nuevos_insumos = yesno.findIndex(i => i.value == nuevos_insumos)
      diversificar_mercados = yesno.findIndex(i => i.value == diversificar_mercados)
      adultos_mayores = yesno.findIndex(i => i.value == adultos_mayores)
      profesionales = yesno.findIndex(i => i.value == profesionales)
      empleos_indirectos = yesno.findIndex(i => i.value == empleos_indirectos)

      props.onSubmit({
        gob_bc: {
          nueva_tecnologia,
          nuevos_insumos,
          diversificar_mercados,
          adultos_mayores,
          profesionales,
          empleos_indirectos,
        }
      })
    }}>
      {({ formState }) => (
        <React.Fragment>
          <div className="Form">
            <Field validate={validate} keepState options={yesno} label="Invertirá en nueva o mejor tecnología" field="nueva_tecnologia" kind="select"/>
            <Field validate={validate} keepState options={yesno} label="Adquirirá más del 50% de los insumos, equipos, maquinaria e infraestructura dentro del estado" field="nuevos_insumos" kind="select"/>
            <Field validate={validate} keepState options={yesno} label="Diversificará sus mercados" field="diversificar_mercados" kind="select"/>
            <Field validate={validate} keepState options={yesno} label="Contratará adultos mayores" field="adultos_mayores" kind="select"/>
            <Field validate={validate} keepState options={yesno} label="Contratará personas con carrera técnica o profesional" field="profesionales" kind="select"/>
            <Field validate={validate} keepState options={yesno} label="Generación de empleos indirectos" field="empleos_indirectos" kind="select"/>
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