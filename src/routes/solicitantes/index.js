import React from 'react'
import { connect } from 'react-redux'
import { Button, Icon, Modal } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

import ListSolicitantes from "./components/List";
import SolicitanteForm from "components/SolicitanteForm"

import solicitante_actions from "store/actions/solicitantes";
import actions from "store/actions/creditos";
import { setSolicitante } from "store/actions/app";
import { loadTipoCreditos } from "store/actions/tipo_creditos";
import { loadApoyos } from "store/actions/apoyos";


import { objectToArray, formatColumn } from "utils/index";

import { calculateInterest } from "utils/bussines";

class SolicitantesPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      modal_id: undefined,
      modal_title: undefined,
      is_loading: false,
      solicitantes: [],
      total: 0
    }
  }

  componentDidMount = async () => {
    this.props.loadTipoCreditos()
    this.props.loadApoyos()
    await this.props.loadSolicitantes()
    this.setState((prevState) => ({
      solicitantes: objectToArray(this.props.solicitantes)
    }))
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(JSON.stringify(prevProps.solicitantes) != JSON.stringify(this.props.solicitantes)){
      this.setState((prevState) => ({
        solicitantes: objectToArray(this.props.solicitantes)
      }))
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

    let { solicitantes, is_loading, total } = state;
    let ajuste_pendiente = 71206.96;
    return (
      <div>

        {/* {props.apoyo_active === undefined && <Redirect to="/" />} */}
        <div className="Section">
          <div>
            <Button size="tiny" color="green" onClick={() => {
              this.toggleModal({
                id: 'SOLICITANTE_FORM_ADD',
                title: 'Alta de Solicitante Persona Fisica'
              })
            }}>
              <Icon name='plus' />
              Nuevo Solicitante
            </Button>
            <Button size="tiny" color="blue" onClick={async () => {
              this.setState((prevState) => ({
                is_loading: true
              }))
              await this.props.loadSolicitantesFullData()

              const { props } = this;
              let solicitantes = objectToArray(props.solicitantes)
              let total = 0;
              
              solicitantes = solicitantes.map(sol => {
                const creditos_id = sol.creditos ? sol.creditos : []

                let creditos = creditos_id.map(credito_id => props.creditos[credito_id] ? props.creditos[credito_id] : {})

                let liquidacion_total = 0;
                creditos = creditos.map(
                  credito => {
                    const pagares = credito.pagares ? credito.pagares : [];
                    const { tio, tiv, tim, comision_apertura } = credito;
                    const res = calculateInterest(pagares, 0, 0, 0, 0);
                    liquidacion_total += res.totales.capital;
                    return {
                      ...credito,
                      liquidacion: res.totales.capital
                    }
                  }
                )
                total += liquidacion_total;
                return {
                  ...sol,
                  liquidacion_total
                }
              })

              this.setState((prevState) => ({
                solicitantes,
                is_loading: false,
                total
              }))
            }}> Cargar saldos </Button>
          </div>

          <div>
            {total > 0 && formatColumn('currency', total - ajuste_pendiente)}
          </div>
        </div>

        <ListSolicitantes
          loading={is_loading}
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
                item.is_coming_from_heroku = true
                props.addSolicitante(item)
                this.closeModal()
              }} />
            }

          </Modal.Content>
        </Modal>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadSolicitantes: () => dispatch(solicitante_actions.loadSolicitantes()),
  loadSolicitantesFullData: () => dispatch(solicitante_actions.loadSolicitantesFullData()),
  addSolicitante: item => dispatch(solicitante_actions.add(item)),
  setSolicitante: id => dispatch(setSolicitante(id)),
  loadCreditos: solicitante_id => dispatch(actions.load(solicitante_id)),

  loadApoyos: () => dispatch(loadApoyos()),
  loadTipoCreditos: () => dispatch(loadTipoCreditos()),
});

const mapStateToProps = (state) => ({
  solicitantes: state.solicitantes,
  apoyo_active: state.app.apoyo_active,
  apoyos: state.apoyos,
  creditos: state.creditos
});

export default connect(mapStateToProps, mapDispatchToProps)(SolicitantesPage)