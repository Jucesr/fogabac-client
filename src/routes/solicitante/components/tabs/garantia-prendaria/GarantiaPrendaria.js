import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Table from "components/Table";
import { Modal, Header, Button, Icon } from 'semantic-ui-react'
import Form from "./GHForm";
import { formatColumn } from "utils/";

import actions from "store/actions/garantia_prendaria";

const GrantiaPrendaria = (props) => {

  const [modal, setModal] = useState({});
  const [item, setItem] = useState();

  useEffect(() => {
    props.load(props.credito_active._id)
  }, [])

  const items = props.credito_active.garantias_prendarias ? props.credito_active.garantias_prendarias : []

  return (
    <React.Fragment>
      <div className="Section">
        <Header className="Subtitle" as='h4'>Garantias Prendarias</Header>
        <Button size="tiny" color="green" onClick={() => setModal({title: 'Agregar garantia prendaria', id: 'ADD'})}>
          <Icon name='plus' />
          Nueva garantia
        </Button>
      </div>
      <Table
        itemName="numero_lote"
        onDownloadRow = {row => window.open(`${process.env.REACT_APP_API_ENDPOINT}/garantia_prendaria/${row._id}/downloadFile`)}
        onEditRow={row => {
          setModal({
            title: 'Editar garantia prendaria',
            id: 'EDIT'
          })
          setItem(row)
        }}
        onDeleteRow={row => { 
          props.remove(row);
        }}
        columns={[
          {
            Header: "Descripción",
            accessor: "descripcion"
          },
          {
            Header: "Serie",
            accessor: "serie"
          },
          {
            Header: "Marca",
            accessor: "marca"
          },
          {
            Header: "Modelo",
            accessor: "modelo"
          },
          {
            Header: "Valor estimado",
            accessor: "valor_estimado",
            Cell: row => formatColumn('currency', row.value)
          },
          {
            Header: "Documento",
            accessor: "documento.nombre"
          }
        ]}
        data={items}
      />

      <Modal
        open={modal.id !== undefined}
        size='small'
        onClose={() => setModal({})}
      >
        <Modal.Header>{modal.title}</Modal.Header>
        <Modal.Content>
          
          {
            modal.id === 'EDIT' && <Form item={{
              ...item,
              documento: item.documento ? {
                name: item.documento.nombre
              } : undefined
            }} onSubmit={values => {
              props.update({
                ...item,
                ...values
              })
              setModal({})
            }} />
          }
         
          {
            modal.id === 'ADD' && <Form onSubmit={values => {
              props.add({
                ...values,
                credito: props.credito_active._id
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
  load: id => dispatch(actions.load(id)),
  add: item => dispatch(actions.add(item)),
  remove: item => dispatch(actions.remove(item)),
  update: item => dispatch(actions.update(item))
});


const mapStateToProps = (state, ownProps) => ({
  credito_active: state.creditos[ownProps.credito_active]
});

export default connect(mapStateToProps, mapDispatchToProps)(GrantiaPrendaria)

