import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Tab, Button, Icon, Header, Modal } from 'semantic-ui-react'

import SolicitanteForm from "components/SolicitanteForm"
import PersonalInfo from "./components/PersonalInfo";
import CreditoList from "./components/CreditoList";
import CreditoForm from "./components/CreditoForm";
import CreditoInfo from "./components/CreditoInfo";

import ReferenciasPersonales from "./components/tabs/referencia-personal/ReferenciasPersonales";
import GarantiaHipotecaria from "./components/tabs/garantia-hipotecaria/GarantiaHipotecaria";
import GarantiaPrendaria from "./components/tabs/garantia-prendaria/GarantiaPrendaria";
import GarantiaUsufructaria from "./components/tabs/garantia-usufructaria/GarantiaUsufructaria";
import Pagares from "./components/tabs/pagares/Pagares";
import Recuperaciones from "./components/tabs/recuperacion/Recuperacion";
import EstadosFinancieros from "./components/tabs/estados-financieros/EstadosFinancieros";
import EstadoCuenta from "./components/tabs/estado-cuenta/EstadoCuenta";
import LugarInversion from "./components/tabs/lugares-inversion/LugarInversion";


import actions from "store/actions/creditos";
import solicitante_actions from "store/actions/solicitantes";
import { setSolicitante } from "store/actions/app";

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
    let panes = [];

    //  Get Creditos based on Solicitante active
    const creditos = props.creditos.map(
      credito => {
        const {importe_ejercido = 0, monto = 0} = credito;
        const disponible = monto - importe_ejercido;
        return {
          ...credito,
          bolsa_credito: props.apoyos[credito.bolsa_credito],
          importe_disponible: disponible 
        }
      }
    )

    const credito_active = state.credito_active !== undefined ? creditos.filter(c => c._id == state.credito_active)[0] : undefined
    // Panes

    if(credito_active !== undefined ){
      panes = [
        {
          menuItem:
          {
            key: 'refs',
            icon: 'address book',
            content: <span className="TabItem">Referencias Personales</span>
          },
          render: () => <Tab.Pane> <ReferenciasPersonales credito_active={credito_active._id} /></Tab.Pane>
        },
        {
          menuItem:
          {
            key: 'hipotecaria',
            icon: 'home',
            content: <span className="TabItem">Garantía hipotecaria</span>
          },
          render: () => <Tab.Pane> <GarantiaHipotecaria credito_active={credito_active._id} /></Tab.Pane>
        },
        {
          menuItem:
          {
            key: 'prendaria',
            icon: 'truck',
            content: <span className="TabItem">Garantía prendaria</span>
          },
          render: () => <Tab.Pane> <GarantiaPrendaria credito_active={credito_active._id} /></Tab.Pane>  
        },
        {
          menuItem:
          {
            key: 'usufructaria',
            icon: 'car',
            content: <span className="TabItem">Garantía usufructaria</span>
          },
          render: () => <Tab.Pane> <GarantiaUsufructaria credito_active={credito_active._id}/></Tab.Pane>
        },
        {
          menuItem:
          {
            key: 'lugar',
            icon: 'map',
            content: <span className="TabItem">Lugar de inversión</span>
          },
          render: () => <Tab.Pane> <LugarInversion credito_active={credito_active._id}/></Tab.Pane>
        },
        {
          menuItem:
          {
            key: 'financiero',
            icon: 'money bill alternate',
            content: <span className="TabItem">Estados financieros</span>
          },
          render: () => <Tab.Pane> <EstadosFinancieros credito_active={credito_active._id}/></Tab.Pane>
        }
      ]

      if(credito_active.estatus == 'Aprobado'){
        panes = [
          ...panes,
          {
            menuItem:
            {
              key: 'pagares',
              icon: 'money bill alternate',
              content: <span className="TabItem">Pagarés</span>
            },
            render: () => <Tab.Pane> <Pagares credito_active={credito_active._id} /></Tab.Pane>
          },{
            menuItem:
            {
              key: 'estado_cuenta',
              icon: 'money bill alternate',
              content: <span className="TabItem">Estado de cuenta</span>
            },
            render: () => <Tab.Pane> <EstadoCuenta credito_active={credito_active._id} /></Tab.Pane>
          },{
            menuItem:
            {
              key: 'recuperacion',
              icon: 'money bill alternate',
              content: <span className="TabItem">Recuperaciones</span>
            },
            render: () => <Tab.Pane> <Recuperaciones credito_active={credito_active._id} /></Tab.Pane>
          }
        ]
      }
    }

    return (
      <React.Fragment>

        {solicitante_active === undefined && <Redirect to="/solicitantes" />}

        <div className="Section">
          <Header className="Subtitle" as='h4'>Datos del solicitante</Header>
          <div>
            <Button size="tiny" color="blue" onClick={() => {
              this.toggleModal({
                id: 'SOLICITANTE_FORM_EDIT',
                title: 'Editar Solicitante Persona Fisica'
              })
            }}>
              <Icon name='edit' />
              Editar
          </Button>
            <Button size="tiny" color="blue" onClick={() => {
              props.setSolicitante(undefined);
            }}>
              <Icon name='exchange' />
              Cambiar
          </Button>
          </div>


        </div>

        <PersonalInfo persona={solicitante_active} />

        {credito_active === undefined ? (
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
                //props.setCredito(credito._id)
                this.setState((prevState) => ({
                  credito_active: credito._id
                }))
              }}
            />
          </React.Fragment>
        ) : (
            <React.Fragment>
              <div className="Section">
                <Header className="Subtitle" as='h4'>Datos del crédito</Header>
                <Button size="tiny" color="blue" onClick={() => {
                  this.setState((prevState) => ({
                    credito_active: undefined
                  }))
                }}>
                  <Icon name='exchange' />
                  Cambiar crédito
              </Button>
              </div>
              <CreditoInfo item={credito_active}></CreditoInfo>
              <div className="Section">
                <div>
                <Button.Group size="tiny" floated='left'>
                  <Button size="tiny" color="blue" onClick={async () => {
                    await this.props.generateSolicitud(credito_active._id)
                    window.open(`${process.env.REACT_APP_API_ENDPOINT}/credito/${credito_active._id}/get_solicitud`);
                  }}>
                    <Icon name='file alternate outline' />
                    Formato de solicitud
                  </Button>

                  <Button  color="blue" onClick={ async () =>{ 
                    await this.props.generateTarjetaEjecutiva(credito_active._id)
                    window.open(`${process.env.REACT_APP_API_ENDPOINT}/credito/${credito_active._id}/get_tarjeta_ejecutiva`)

                  }}>
                    <Icon name='file outline' />
                    Tarjeta ejecutiva
                  </Button>
                  
                </Button.Group>
                
                </div>
                <div>
                {credito_active.estatus !== 'Aprobado' && <Button size="tiny" color="blue" onClick={() =>{ alert('No se implenta aun')}}>
                  <Icon name='newspaper outline' />
                  Generar contrato
                </Button>}
                
                {credito_active.estatus !== 'Aprobado' && <Button size="tiny" color="teal" onClick={() => {
                    this.props.editCredito({
                      _id: credito_active._id,
                      estatus: 'Aprobado'
                    })
                  }}>
                  <Icon name='lock' />
                  Formalizar
                </Button>}

                {credito_active.estatus !== 'Solicitado' && <Button size="tiny" color="teal" onClick={() => {
                    this.props.editCredito({
                      _id: credito_active._id,
                      estatus: 'Solicitado'
                    })
                  }}>
                  <Icon name='lock open' />
                  Liberar
                </Button>}

                </div>
                
              </div>
              <br />
              <Tab onTabChange={this.onTabChange} menu={{ fluid: true, color: 'blue', pointing: true }} panes={panes} />
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
              state.modal_id === 'SOLICITANTE_FORM_EDIT' && <SolicitanteForm disabled={true} item={solicitante_active} onSubmit={item => {
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
  editSolicitante: item => dispatch(solicitante_actions.update(item)),
  setSolicitante: id => dispatch(setSolicitante(id)),
  editCredito: item => dispatch(actions.update(item)),
  generateSolicitud: id => dispatch(actions.generateSolicitud(id)),
  generateTarjetaEjecutiva: id => dispatch(actions.generateTarjetaEjecutiva(id))
});


const mapStateToProps = (state) => {

  const solicitante_active = state.solicitantes[state.app.solicitante_active]

  const creditos_id = solicitante_active ? solicitante_active.creditos : []

  const creditos = creditos_id ? creditos_id.map(credito_id => state.creditos[credito_id]) : []


  return {
    apoyos: state.apoyos,
    solicitante_active: solicitante_active,
    creditos: creditos
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Solicitante)