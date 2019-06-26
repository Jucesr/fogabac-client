import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import SolicitanteForm from "components/SolicitanteForm"
import PersonalInfo from "./components/PersonalInfo";
import CreditoList from "./components/CreditoList";
import CreditoForm from "./components/CreditoForm";
import CreditoInfo from "./components/CreditoInfo";
import ReferenciasPersonales from "./components/tabs/referencia-personal/ReferenciasPersonales";
import { Tab, Button, Icon, Header, Modal } from 'semantic-ui-react'

import { editSolicitante } from "store/actions/solicitantes";

class Solicitante extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      credito_active: undefined,
      modal_id: undefined,
      modal_title: undefined
    }
  }

  toggleModal = ({ id, title }) => {
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

    const { solicitante_active } = props;

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
      <React.Fragment>

        {solicitante_active === undefined && <Redirect to="/solicitantes" />}

        <div className="Section">
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

        {state.credito_active === undefined ? (
          <React.Fragment>
            <div className="Section">
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

            <CreditoList
              data={creditos}
              onRowClick={credito => {
                this.setState((prevState) => ({
                  credito_active: credito
                }))
              }}
            />
          </React.Fragment>
        ) : (
            <React.Fragment>
              <div className="Section">
                <Header className="Subtitle" as='h4'>Datos del crédito</Header>
              </div>
              <CreditoInfo item={state.credito_active}></CreditoInfo>
              <br />
              <Tab onTabChange={this.onTabChange} menu={{ fluid: true, color: 'blue', pointing: true }} panes={[
                {
                  menuItem:
                  {
                    key: 'refs',
                    icon: 'address book',
                    content: <span className="TabItem">Referencias Personales</span>
                  },
                  render: () => <Tab.Pane> <ReferenciasPersonales /></Tab.Pane>
                },
                {
                  menuItem:
                  {
                    key: 'hipotecaria',
                    icon: 'home',
                    content: <span className="TabItem">Garantía hipotecaria</span>
                  },
                  render: () => <Tab.Pane> <Header as="h4"> Garantía hipotecaria</Header></Tab.Pane>
                },
                {
                  menuItem:
                  {
                    key: 'prendaria',
                    icon: 'truck',
                    content: <span className="TabItem">Garantía prendaria</span>
                  },
                  render: () => <Tab.Pane> <Header as="h4"> Garantía prendaria</Header></Tab.Pane>
                },
                {
                  menuItem:
                  {
                    key: 'usufructaria',
                    icon: 'car',
                    content: <span className="TabItem">Garantía usufructaria</span>
                  },
                  render: () => <Tab.Pane> <Header as="h4"> Garantía usufructaria</Header></Tab.Pane>
                },
                {
                  menuItem:
                  {
                    key: 'lugar',
                    icon: 'map',
                    content: <span className="TabItem">Lugar de inversión</span>
                  },
                  render: () => <Tab.Pane> <Header as="h4"> Lugar de inversión</Header></Tab.Pane>
                },
                {
                  menuItem:
                  {
                    key: 'financiero',
                    icon: 'money bill alternate',
                    content: <span className="TabItem">Estados financieros</span>
                  },
                  render: () => <Tab.Pane> <Header as="h4"> Estados financieros</Header></Tab.Pane>
                }
              ]} />

              {/* 
              <Tab onTabChange={this.onTabChange} menu={{ fluid: true, color: 'blue',  inverted: true, pointing: true }} panes={[
                { menuItem: { key: 'refs', icon: 'address book' }, render: () => <Tab.Pane><ReferenciasPersonales/></Tab.Pane> },
                { menuItem: 'Gatantía hipotecaria', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
                { menuItem: 'Gatantía prendaria', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
                { menuItem: 'Gatantía usufructaria', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
                { menuItem: 'Lugar de inversión', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
                { menuItem: 'Estados financieros', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }
              ]} /> */}
            </React.Fragment>
          )}

        <Modal
          open={state.modal_id !== undefined}
          size='small'
          onClose={this.closeModal}
        >
          <Modal.Header>{state.modal_title}</Modal.Header>
          <Modal.Content>

            {
              state.modal_id === 'SOLICITANTE_FORM_EDIT' && <SolicitanteForm item={solicitante_active} onSubmit={item => {
                props.editSolicitante({
                  ...item,
                  _id: solicitante_active._id
                })
                this.closeModal()
              }} />
            }

            {
              state.modal_id === 'CREDITO_FORM_ADD' && <CreditoForm onSubmit={() => this.closeModal()} solicitante_active={solicitante_active._id} />
            }

          </Modal.Content>
        </Modal>
      </React.Fragment>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  editSolicitante: item => dispatch(editSolicitante(item))
});


const mapStateToProps = (state) => ({
  apoyos: state.apoyos,
  solicitante_active: state.solicitantes[state.app.solicitante_active]
});

export default connect(mapStateToProps, mapDispatchToProps)(Solicitante)