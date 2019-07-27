import React from 'react'
import { connect } from 'react-redux'
import { Button, Icon, Modal } from 'semantic-ui-react'
import { Redirect} from 'react-router-dom'


import ListSolicitantes from "./components/List";
import SolicitanteForm from "components/SolicitanteForm"

import { loadSolicitantes, addSolicitante } from "store/actions/solicitantes";
import actions from "store/actions/creditos";
import { setSolicitante } from "store/actions/app";

import { objectToArray } from "utils/index";

class SolicitantesPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      modal_id: undefined,
      modal_title: undefined
    }
  }

  componentDidMount = () => {
    this.props.loadSolicitantes()
  }

  toggleModal = ({id, title}) => {
    this.setState((prevState) => ({
      modal_id: id,
      modal_title: title
    }))
  }

  closeModal = () => {
    this.setState((prevState) => ({
      modal_id: undefined,
      modal_title: undefined
    }))
  }

  render() {
    const { props, state } = this

    const solicitantes = objectToArray(props.solicitantes)
    
    return (
      <div>

        {props.apoyo_active === undefined && <Redirect to="/" />}

        <Button size="tiny" color="green" onClick={() => {
          this.toggleModal({
            id: 'SOLICITANTE_FORM_ADD',
            title: 'Alta de Solicitante Persona Fisica'
          })
        }}>
          <Icon name='plus' />
          Nuevo Solicitante
      </Button>
        <ListSolicitantes
          data={solicitantes}
          onRowClick={row => {
            props.setSolicitante(row._id)
            props.loadCreditos(row._id)
            props.history.push(`/solicitantes/${row._id}`)
          }}
        />
            
        <Modal
          open={state.modal_id !== undefined}
          size='small'
          onClose={this.closeModal}
        >
          <Modal.Header>{state.modal_title}</Modal.Header>
          <Modal.Content>
            {
              state.modal_id === 'SOLICITANTE_FORM_ADD' && <SolicitanteForm onSubmit={item => {
                props.addSolicitante(item)
                this.closeModal()
              }}/>
            }

          </Modal.Content>
        </Modal>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadSolicitantes: () => dispatch(loadSolicitantes()),
  addSolicitante: item => dispatch(addSolicitante(item)),
  setSolicitante: id => dispatch(setSolicitante(id)),
  loadCreditos: solicitante_id => dispatch(actions.load(solicitante_id))
});

const mapStateToProps = (state) => ({
  solicitantes: state.solicitantes,
  apoyo_active: state.app.apoyo_active,
  apoyos: state.apoyos
});

export default connect(mapStateToProps, mapDispatchToProps)(SolicitantesPage)