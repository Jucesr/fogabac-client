import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'informed';
import { Button } from 'semantic-ui-react'
import Field from "components/Field";
import { generateOptions } from "utils/index";
import formData from "./formData";
import { replaceAll, validate } from "utils/index";

const RPForm = (props) => {

  const options = generateOptions(formData.proyecto_estrategico)

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
      proyecto_estrategico
    }) => {

      proyecto_estrategico = options.findIndex(i => i.value == proyecto_estrategico)

      props.onSubmit({
        proyecto_estrategico
      })
    }}>
      {({ formState }) => (
        <React.Fragment>
          <div className="Form">
            <Field validate={validate} keepState options={options} label="Proyecto Estatal" field="proyecto_estrategico" kind="select"/>
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