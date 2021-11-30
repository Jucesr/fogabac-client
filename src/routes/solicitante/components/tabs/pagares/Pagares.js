import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Table from "components/Table";
import { Modal, Header, Button, Icon, Message } from 'semantic-ui-react'
import RPForm from "./Form";
import { formatColumn, formatDate } from "utils/";
import moment from "moment";
import actions from "store/actions/pagares";

const Pagares = (props) => {

  const [modal, setModal] = useState({});
  const [item, setItem] = useState();

  useEffect(() => {
    props.load(props.credito_active._id)
  }, [])

  let items = props.credito_active.pagares ? props.credito_active.pagares : []

  const pagares_total = items.reduce(((acum, item) => item.monto + acum), 0)

  const disponible = props.credito_active.monto - pagares_total;

  // console.log("2019-11-30T00:00:00.000Z")
  // console.log(moment("2019-11-30T00:00:00.000Z").add(1,'days').format('DD/MM/YYYY'))

  return (
    <React.Fragment>
      <div className="Section">
        <Header className="Subtitle" as='h4'>Pagarés</Header>
        <Button size="tiny" color="green" onClick={() => setModal({title: 'Agregar pagaré', id: `${disponible > 0 ? 'ADD' : 'ERROR'}`})}>
          <Icon name='plus' />
          Nuevo pagaré
        </Button>
      </div>
      <Table
        itemName="concepto"
        onDownloadRow = {row => window.open(`${process.env.REACT_APP_API_ENDPOINT}/pagare/${row._id}/downloadFile`)}
        onEditRow={row => {
          setModal({
            title: 'Editar pagaré',
            id: 'EDIT'
          })
          setItem(row)
        }}
        onDeleteRow={row => { 
          props.remove(row);
        }}
        columns={[
          {
            Header: "No.",
            accessor: "numero",
            width: 50
          },
          {
            Header: "Concepto",
            accessor: "concepto",
            // width: 500
          },
          {
            Header: "Fecha de subscipción",
            accessor: "fecha_suscripcion",
            Cell: row => formatDate(row.value),
            width: 150
          },
          {
            Header: "Fecha de vencimiento",
            accessor: "fecha_vencimiento",
            Cell: row => formatDate(row.value),
            width: 150
          },
          {
            Header: "Monto",
            accessor: "monto",
            Cell: row => formatColumn('currency', row.value),
            width: 150
          }
        ]}
        data={items.map(item => ({...item, restante: item.monto - item.monto_recuperado}))}
      />

      <Modal
        open={modal.id !== undefined}
        size='small'
        onClose={() => setModal({})}
      >
        <Modal.Header>{modal.title}</Modal.Header>
        <Modal.Content>
          
          {
            modal.id === 'EDIT' && (
              <React.Fragment>
                <RPForm max={item.monto + disponible} item={item} onSubmit={values => {
                  props.update({
                    ...item,
                    ...values
                  })
                  setModal({})
                }} />
              </React.Fragment>
            )
              
          }
         
          {
            modal.id === 'ADD' && (
              <React.Fragment>
                <Message
                  success
                  header='Maximo disponible'
                  content={formatColumn("currency", disponible)}
                />
                <RPForm max={disponible} onSubmit={values => {
                  const {importe_ejercido = 0, monto = 0} = props.credito_active;
                  const disponible = monto - importe_ejercido;
                  if(values.monto > disponible){
                    props.logError(`No hay dinero suficiente para crear un pagaré, Disponible = $${disponible}`)
                  }else{
                    props.add({
                      ...values,
                      credito: props.credito_active._id
                    })
                  }
                  
                  setModal({})
                }}/>
              </React.Fragment>
            )
          } 

          {
            modal.id === 'ERROR' && <Message
            error
            header='No hay saldo disponible'
          />
          }

        </Modal.Content>
      </Modal>
    </React.Fragment>

  )
}

const mapDispatchToProps = (dispatch) => ({
  load: id => dispatch(actions.load(id)),
  add: item => dispatch(actions.add(item)),
  remove: item => dispatch(actions.remove(item)),
  update: item => dispatch(actions.update(item)),
  logError: message => dispatch({
    type: 'OPEN_NOTIFICATION',
    payload: {
      type: 'ERROR',
      message: message
    }
  })
});


const mapStateToProps = (state, ownProps) => ({
  credito_active: state.creditos[ownProps.credito_active]
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagares)

