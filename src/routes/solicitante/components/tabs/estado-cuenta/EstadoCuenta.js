import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Table from "components/Table";
import { Modal, Header, Button, Icon, Checkbox } from 'semantic-ui-react'
import { formatColumn, formatDate } from "utils/";
import { calculateInterest } from "utils/bussines";
import actions from "store/actions/pagares";
import es from 'date-fns/locale/es';
import DatePicker from 'react-datepicker';

const EstadoCuenta = (props) => {

  const [modal, setModal] = useState({});
  const [item, setItem] = useState();
  const [interestDate, setInterestDate] = useState();
  const [isComisionOn, setIsComisionOn] = useState(false);

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
  const {tio, tiv, tim, comision_apertura} = props.credito_active;
  const res = calculateInterest(items, tio, tiv, tim, isComisionOn ? comision_apertura: 0, interestDate);

  items = res.items;
  totales = res.totales;

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
        {/* <Checkbox checked={isComisionOn} onChange={v => setIsComisionOn(!isComisionOn)} toggle label='Comisión por apertura'/> */}
        <div>
          
          <span>Fecha de corte: </span>
          <DatePicker
            popperPlacement="top"
            showMonthDropdown
            showYearDropdown
            customInput={<input />}
            selected={interestDate}
            onChange={date => {
              setInterestDate(date.getTime())}}
            locale={es}
            placeholderText="Selecciona una fecha"
            dateFormat="d MMMM, yyyy"
            isClearable={true}
          />
        </div>
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
            Header: "Capital + Comisión",
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
          
          {/* {
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
          }  */}

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

export default connect(mapStateToProps, mapDispatchToProps)(EstadoCuenta)

