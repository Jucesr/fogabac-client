import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'informed';
import { Button } from 'semantic-ui-react'
import Field from "components/Field";
import { generateOptions } from "utils/index";
import formData from "./formData";
import { replaceAll, validate } from "utils/index";

const RPForm = (props) => {

  const options = generateOptions(formData.solvencia_moral)

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
      solvencia_moral
    }) => {

      solvencia_moral = options.findIndex(i => i.value == solvencia_moral)

      props.onSubmit({
        solvencia_moral
      })
    }}>
      {({ formState }) => (
        <React.Fragment>
          <div className="Form">
            <Field validate={validate} keepState options={options} label="Solvencia Moral" field="solvencia_moral" kind="select"/>
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