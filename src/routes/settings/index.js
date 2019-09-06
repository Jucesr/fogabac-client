import React from 'react'
import { connect } from 'react-redux'
import { Button, Icon, Modal, Tab } from 'semantic-ui-react'
import { Form, useFormApi } from 'informed';
import Field from "components/Field";
import { getDirector, setDirector } from "store/actions/app";

const validate = value => {
  return !value || value.length === 0
    ? 'Obligatorio'
    : undefined;
};

class SettingsPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      modal_id: undefined,
      modal_title: undefined
    }

    
  }

  componentDidMount = () => {
    this.props.changePage('Configuracion');
    this.props.getDirectores();
  }
 
  render() {
    const { props, state } = this  
    const panes = [
      {
        menuItem:
        {
          key: 'refs',
          icon: 'address book',
          content: <span className="TabItem">Directores</span>
        },
        render: () => <Tab.Pane>
          {!props.loading && <Form 
          // validateFields={validateFields} 
          initialValues={props.directores} 
          onSubmit={values => {
            props.setDirectores(values)
          }}>
          {({ formApi }) => (
            <div className="Form">
              <Field label="Agricultura" field="director_agricultura" validate={validate} />
              <Field label="Ganaderia" field="director_ganaderia"  validate={validate} />
              <Field label="Pesca" field="director_pesca" validate={validate} />
              <Field label="Director General" field="director_general" validate={validate} />
              <Button className="Form_button" color="blue" type="submit">Guardar</Button>
            </div>
          )}
          </Form>}
        </Tab.Pane>
      }
    ];
    return (
      <div>
        <Tab onTabChange={this.onTabChange} menu={{ fluid: true, color: 'blue', pointing: true }} panes={panes} />
        
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setDirectores: (data) => dispatch(setDirector(data)),
  getDirectores: () => dispatch(getDirector()),
  changePage: (page_title) => {
    dispatch({
      type: 'CHANGE_PAGE',
      payload: page_title
    })
   },
});

const mapStateToProps = (state) => ({
  directores: state.app.directores,
  loading: state.app.fetching
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)