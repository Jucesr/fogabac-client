import React from 'react'
import { connect } from 'react-redux'
import { Button, Icon, Header, Modal } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'


import ListSolicitantes from "./components/List";
import PersonalInfo from "./components/PersonalInfo";
import CreditoList from "./components/CreditoList";
import CreditoForm from "./components/CreditoForm";
import SolicitanteForm from "./components/SolicitanteForm";

import { loadSolicitantes, addSolicitante, editSolicitante } from "store/actions/solicitantes";
import { loadCreditos } from "store/actions/creditos";

import { objectToArray } from "utils/index";

class SolicitantesPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      page_active: 'LIST',
      solicitante_active_id: undefined,
      modal_id: undefined,
      modal_title: undefined
    }
  }

  componentDidMount = () => {
    this.props.loadSolicitantes()
  }

  setSolicitante = (person) => {

    this.props.loadCreditos(person._id)

    this.setState((prevState) => ({
      page_active: 'INFO',
      solicitante_active_id: person._id
    }))
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
    
    const solicitante_active = props.solicitantes[state.solicitante_active_id]

    //  Get Creditos based on Solicitante active
    const creditos = solicitante_active && solicitante_active.creditos ? solicitante_active.creditos.map(
      credito => ({
        ...credito,
        ejercido: 0,
        bolsa_credito: props.apoyos[credito.bolsa_credito],
        disponible: credito.monto,
        recuperado: credito.monto
      })
    ) : []
    return (
      <div>

        {props.apoyo_active === undefined && <Redirect to="/" />}

        {
          state.page_active === 'LIST' && (
            <React.Fragment>
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
                onRowClick={this.setSolicitante}
              />
            </React.Fragment>
          )
        }

        {state.page_active === 'INFO' &&
          <React.Fragment>
            <div className="Creditos">
              <Header className="Subtitle" as='h4'>Datos del solicitante</Header>
              <Button size="tiny" color="blue" onClick={() => {
                this.toggleModal({
                  id: 'SOLICITANTE_FORM_EDIT',
                  title: 'Editar Solicitante Persona Fisica'
                })
              }}>
                <Icon name='edit' />
                Editar solicitante
            </Button>
            </div>

            <PersonalInfo persona={solicitante_active} />

            <div className="Creditos">
              <Header className="Subtitle" as='h4'>Créditos</Header>
              <Button size="tiny" color="green" onClick={() => {
                this.toggleModal({
                  id: 'CREDITO_FORM_ADD',
                  title: 'Alta de Crédito'
                })
              }}>
                <Icon name='plus' />
                Nueva solicitud
            </Button>
            </div>

            <CreditoList data={creditos} />
          </React.Fragment>


        }

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

            {
              state.modal_id === 'SOLICITANTE_FORM_EDIT' && <SolicitanteForm item={solicitante_active} onSubmit={item => {
                props.editSolicitante({
                  ...item,
                  _id: solicitante_active._id
                })
                this.closeModal()
              }}/>
            }

{
              state.modal_id === 'CREDITO_FORM_ADD' && <CreditoForm solicitante_active={state.solicitante_active_id} />
            }

          </Modal.Content>
        </Modal>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({

  changePage: ({ page_title, page_active }) => {
    dispatch({
      type: 'CHANGE_PAGE',
      payload: { page_title, page_active }
    })
  },
  toggleModal: ({ id, title }) => {
    dispatch({
      type: 'TOGGLE_MODAL',
      payload: {
        id: id,
        title: title
      }
    })
  },
  loadSolicitantes: () => dispatch(loadSolicitantes()),
  addSolicitante: item => dispatch(addSolicitante(item)),
  editSolicitante: item => dispatch(editSolicitante(item)),

  loadCreditos: solicitante_id => dispatch(loadCreditos(solicitante_id))
});

const mapStateToProps = (state) => ({
  solicitantes: state.solicitantes,
  apoyo_active: state.app.apoyo_active,
  apoyos: state.apoyos
});

export default connect(mapStateToProps, mapDispatchToProps)(SolicitantesPage)