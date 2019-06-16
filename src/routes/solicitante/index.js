import React from 'react'
import {connect} from 'react-redux'


import SolicitanteForm from "components/SolicitanteForm"
import PersonalInfo from "./components/PersonalInfo";
import CreditoList from "./components/CreditoList";
import CreditoForm from "./components/CreditoForm";
import { Button, Icon, Header, Modal } from 'semantic-ui-react'


import { editSolicitante } from "store/actions/solicitantes";

class Solicitante extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      modal_id: undefined,
      modal_title: undefined
    }
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

  render(){
    const {props, state} = this

    const {solicitante_active} = props;

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
              state.modal_id === 'CREDITO_FORM_ADD' && <CreditoForm solicitante_active={state.solicitante_active_id} />
            }
  
          </Modal.Content>
        </Modal>
      </React.Fragment>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  editSolicitante: item => dispatch(editSolicitante(item)),
});


const mapStateToProps = (state) => ({
  apoyos: state.apoyos,
  solicitante_active: state.solicitantes[state.app.solicitante_active]
});

export default connect(mapStateToProps, mapDispatchToProps)(Solicitante)