import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Table from "components/Table";
import { Modal, Header, Button, Icon } from 'semantic-ui-react'
import RPForm from "./RPForm";

import { loadReferenciasPersonales, addReferenciaPersonal } from "store/actions/referencias_personales";

const ReferenciasPersonales = (props) => {

  const [modal, setModal] = useState({});

  useEffect(() => {
    props.loadReferenciasPersonales(props.solicitante_active._id)
  }, [])

  const referencias = props.solicitante_active.referencias_personales ? props.solicitante_active.referencias_personales : []

  return (
    <React.Fragment>
      <div className="Section">
        <Header className="Subtitle" as='h4'>Referencias Personales</Header>
        <Button size="tiny" color="green" onClick={() => setModal({title: 'Agregar referencia personal', id: 'ADD'})}>
          <Icon name='plus' />
          Nueva referencia
        </Button>
      </div>
      <Table
        itemName="nombre"
        onEditRow={row => {
          setModal({
            title: 'Editar referencia personal',
            id: 'FORM_EDIT'
          })
        }}
        onDeleteRow={() => { alert('Se va a borrar') }}
        columns={[
          {
            Header: "Nombre",
            accessor: "nombre"
          }
        ]}
        data={referencias}
      />

      <Modal
        open={modal.id !== undefined}
        size='small'
        onClose={() => setModal({})}
      >
        <Modal.Header>{modal.title}</Modal.Header>
        <Modal.Content>
          {/* 
          {
            modal.id === 'FORM_EDIT' && <SolicitanteForm item={solicitante_active} onSubmit={item => {
              props.editSolicitante({
                ...item,
                _id: solicitante_active._id
              })
              this.closeModal()
            }} />
          }
          */}
          {
            modal.id === 'ADD' && <RPForm onSubmit={values => {
              props.addReferenciaPersonal({
                ...values,
                solicitante: props.solicitante_active._id
              })
              setModal({})
            } } />
          } 

        </Modal.Content>
      </Modal>
    </React.Fragment>

  )
}

const mapDispatchToProps = (dispatch) => ({
  loadReferenciasPersonales: id => dispatch(loadReferenciasPersonales(id)),
  addReferenciaPersonal: item => dispatch(addReferenciaPersonal(item))
});


const mapStateToProps = (state) => ({
  solicitante_active: state.solicitantes[state.app.solicitante_active]
});

export default connect(mapStateToProps, mapDispatchToProps)(ReferenciasPersonales)

