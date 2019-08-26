import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Table from "components/Table";
import { Modal, Header, Button, Icon } from 'semantic-ui-react'
import { formatColumn, formatDate } from "utils/";
import actions from "store/actions/pagares";

const Pagares = (props) => {

  const [modal, setModal] = useState({});
  const [item, setItem] = useState();

  useEffect(() => {
    props.load(props.credito_active._id)
  }, [])

  let items = props.credito_active.pagares ? props.credito_active.pagares : []
  let totales = {
    capital: 0,
    io: 0,
    iv: 0,
    im: 0,
    liquidacion: 0
  }

  items = items.map(item => {

    if(item.is_liquidado){
      return {
        ...item,
        dias_ordinario: 0,
        dias_vencidos: 0,
        capital: 0,
        interes_ordinario: 0,
        interes_vencido: 0,
        interes_moratorio: 0,
        liquidacion: 0
      }
    }

    let vencimiento = new Date(item.fecha_vencimiento);
    let subscipcion  = new Date(item.fecha_suscripcion);

    let dias_hasta_vencimiento = (vencimiento - subscipcion) / 86400000;

    let today = Date.now();
    let dias_ordinario = Math.floor(( today - subscipcion) / 86400000)
    let dias_vencidos = Math.floor(( Date.now()  - vencimiento) / 86400000)
    
    //  Valida que los dias ordinarios no sean mayor a la fecha de vencimiento
    dias_ordinario = dias_ordinario >= dias_hasta_vencimiento ? dias_hasta_vencimiento : dias_ordinario;
    dias_vencidos = dias_vencidos < 0 ? 0 : dias_vencidos;
    let interes_ordinario = (item.monto * (props.credito_active.tiee/100) / 360 * dias_ordinario) - item.monto_recuperado_interes; 
    let interes_vencido = (item.monto * (props.credito_active.tiv/100) / 360 * dias_vencidos) - item.monto_recuperado_vencido; 
    let interes_moratorio = (item.monto * (props.credito_active.tim/100) / 360 * dias_vencidos) - item.monto_recuperado_moratorio; 
    let capital = item.monto - item.monto_recuperado_capital;

    totales = {
      capital: totales.capital + capital,
      io: totales.io + interes_ordinario,
      iv: totales.iv + interes_vencido,
      im: totales.im + interes_moratorio,
      liquidacion: totales.liquidacion + capital + interes_ordinario + interes_vencido + interes_moratorio
    }

    return {
      ...item,
      dias_ordinario,
      dias_vencidos,
      capital,
      interes_ordinario,
      interes_vencido,
      interes_moratorio,
      liquidacion: capital + interes_ordinario + interes_vencido + interes_moratorio
    }
  })

  //  Agrega renglon de total
  items = [
    ...items,{
      is_total: true,
      concepto: 'Total',
      capital: totales.capital,
      interes_ordinario: totales.io,
      interes_vencido: totales.iv,
      interes_moratorio: totales.im,
      liquidacion: totales.liquidacion
    }
  ]

  return (
    <React.Fragment>
      <div className="Section">
        <Header className="Subtitle" as='h4'>Estado de cuenta</Header>
        
      </div>
      <Table
        itemName="concepto"
        actionsLabel="Detalle"
        actionsWidth={70}
        // onDownloadRow = {row => window.open(`${process.env.REACT_APP_API_ENDPOINT}/referencia_personal/${row._id}/downloadFile`)}
        onSelectRow={row => {
          setModal({
            title: 'Editar pagaré',
            id: 'EDIT'
          })
          setItem(row)
        }}
        columns={[
          {
            Header: "No.",
            accessor: "concepto"
          },
          {
            Header: "Fecha de subscipción",
            accessor: "fecha_suscripcion",
            Cell: row => formatDate(row.value)
          },
          {
            Header: "Fecha de vencimiento",
            accessor: "fecha_vencimiento",
            Cell: row => formatDate(row.value)
          },
          {
            Header: "Capital",
            accessor: "capital",
            Cell: row => formatColumn('currency', row.value)
          },
          {
            Header: "Dias Ordinario",
            accessor: "dias_ordinario"
          },
          {
            Header: "Dias Vencido",
            accessor: "dias_vencidos"
          },
          {
            Header: "Interes Ordinario",
            accessor: "interes_ordinario",
            Cell: row => formatColumn('currency', row.value)
          },
          {
            Header: "Interes Vencido",
            accessor: "interes_vencido",
            Cell: row => formatColumn('currency', row.value)
          },
          {
            Header: "Interes Moratorio",
            accessor: "interes_moratorio",
            Cell: row => formatColumn('currency', row.value)
          },{
            Header: "Total Liquidación",
            accessor: "liquidacion",
            Cell: row => formatColumn('currency', row.value)
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

