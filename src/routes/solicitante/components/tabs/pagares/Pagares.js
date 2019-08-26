import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Table from "components/Table";
import { Modal, Header, Button, Icon } from 'semantic-ui-react'
import RPForm from "./Form";
import { formatColumn, formatDate } from "utils/";
import actions from "store/actions/pagares";

const Pagares = (props) => {

  const [modal, setModal] = useState({});
  const [item, setItem] = useState();

  useEffect(() => {
    props.load(props.credito_active._id)
  }, [])

  let items = props.credito_active.pagares ? props.credito_active.pagares : []

  return (
    <React.Fragment>
      <div className="Section">
        <Header className="Subtitle" as='h4'>Pagarés</Header>
        <Button size="tiny" color="green" onClick={() => setModal({title: 'Agregar pagaré', id: 'ADD'})}>
          <Icon name='plus' />
          Nuevo pagaré
        </Button>
      </div>
      <Table
        itemName="concepto"
        // onDownloadRow = {row => window.open(`${process.env.REACT_APP_API_ENDPOINT}/referencia_personal/${row._id}/downloadFile`)}
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
            modal.id === 'EDIT' && <RPForm item={item} onSubmit={values => {
              props.update({
                ...item,
                ...values
              })
              setModal({})
            }} />
          }
         
          {
            modal.id === 'ADD' && <RPForm onSubmit={values => {
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
            } } />
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

