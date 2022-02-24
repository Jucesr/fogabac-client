import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Table from "components/Table";
import NormalTable from "react-table";
import { Modal, Header, Button, Icon } from 'semantic-ui-react'
import RPForm from "./Form";
import { formatColumn, formatDate } from "utils/";
import { calculateInterest } from "utils/bussines";
import actions from "store/actions/recuperaciones";
import pagareActions from "store/actions/pagares";

import es from 'date-fns/locale/es';
import DatePicker from 'react-datepicker';

const Recuperacion = (props) => {

  const [modal, setModal] = useState({});
  const [item, setItem] = useState();
  const [interestDate, setInterestDate] = useState(null);

  useEffect(() => {
    props.load(props.credito_active._id)
    props.loadPagares(props.credito_active._id)
  }, [])

  const items = props.credito_active.recuperaciones ? props.credito_active.recuperaciones : []
  const pagares = props.credito_active.pagares ? props.credito_active.pagares : []

  const { tio, tiv, tim, comision_apertura } = props.credito_active;
  const res = calculateInterest(pagares, tio, tiv, tim, comision_apertura, interestDate);

  return (
    <React.Fragment>
      <div className="Section">
        <Header className="Subtitle" as='h4'>Recuperaciones</Header>
        <Button size="tiny" color="green" onClick={() => setModal({ title: 'Agregar recuperación', id: 'ADD' })}>
          <Icon name='plus' />
          Nueva recuperación
        </Button>
      </div>
      <Table
        itemName="concepto"
        // onDownloadRow = {row => window.open(`${process.env.REACT_APP_API_ENDPOINT}/referencia_personal/${row._id}/downloadFile`)}
        onSelectRow={row => {
          setModal({
            title: `Desglose de recuperacion ${row.concepto} - ${formatColumn('currency', row.monto)}`,
            id: 'DETAIL'
          })
          setItem(row)
        }}
        // onEditRow={row => {
        //   setModal({
        //     title: 'Editar recuperación',
        //     id: 'EDIT'
        //   })
        //   setItem(row)
        // }}
        onDeleteRow={row => {
          props.remove(row);
        }}
        columns={[
          {
            Header: "Concepto",
            accessor: "concepto"
          },
          {
            Header: "Fecha de registro",
            accessor: "fecha_registro",
            Cell: row => formatDate(row.value)
          },
          {
            Header: "Fecha de interés",
            accessor: "fecha_interes",
            Cell: row => formatDate(row.value)
          },
          {
            Header: "Monto",
            accessor: "monto",
            Cell: row => formatColumn('currency', row.value)
          },
          {
            Header: "Capital",
            accessor: "capital",
            Cell: row => formatColumn('currency', row.value)
          },
          {
            Header: "Interes ordinario",
            accessor: "ordinario",
            Cell: row => formatColumn('currency', row.value)
          },
          {
            Header: "Interes vencido",
            accessor: "vencido",
            Cell: row => formatColumn('currency', row.value)
          },
          {
            Header: "Interes moratorio",
            accessor: "moratorio",
            Cell: row => formatColumn('currency', row.value)
          }
        ]}
        data={items.map(item => ({
          ...item,
          capital: item.pagares.reduce((acum, p) => acum + p.monto_recuperado_capital, 0),
          ordinario: item.pagares.reduce((acum, p) => acum + p.monto_recuperado_interes, 0),
          vencido: item.pagares.reduce((acum, p) => acum + p.monto_recuperado_vencido, 0),
          moratorio: item.pagares.reduce((acum, p) => acum + p.monto_recuperado_moratorio, 0)
        }))}
      />

      <Modal
        open={modal.id !== undefined}
        size='small'
        onClose={() => setModal({})}
      >
        <Modal.Header>{modal.title}</Modal.Header>
        <Modal.Content>

          {
            modal.id === 'EDIT' && <RPForm credito={props.credito_active} item={item} onSubmit={values => {
              props.update({
                ...item,
                ...values
              })
              setModal({})
            }} />
          }

          {
            modal.id === 'ADD' && (
              <React.Fragment>
                <Header className="Subtitle" as='h4'>Resumen de estado de cuenta</Header>
                <div style={{
                  textAlign: 'right'
                }}>

                  <span>Fecha de corte: </span>
                  <DatePicker
                    popperPlacement="top"
                    showMonthDropdown
                    showYearDropdown
                    customInput={<input />}
                    selected={interestDate}
                    onChange={date => {
                      setInterestDate(date.getTime())
                    }}
                    locale={es}
                    placeholderText="Selecciona una fecha"
                    dateFormat="d MMMM, yyyy"
                    isClearable={true}
                  />
                </div>
                <br />
                <NormalTable
                  minRows={0}
                  className="-striped"
                  showPagination={false}

                  data={[{
                    ...res.totales
                  }]}
                  columns={[
                    {
                      Header: "Capital",
                      accessor: "capital",
                      Cell: row => formatColumn('currency', row.value)
                    },
                    {
                      Header: "Interes ordinario",
                      accessor: "io",
                      Cell: row => formatColumn('currency', row.value)
                    },
                    {
                      Header: "Interes vencido",
                      accessor: "iv",
                      Cell: row => formatColumn('currency', row.value)
                    },
                    {
                      Header: "Interes moratorio",
                      accessor: "im",
                      Cell: row => formatColumn('currency', row.value)
                    },
                    {
                      Header: "Total Liquidación",
                      accessor: "liquidacion",
                      Cell: row => formatColumn('currency', row.value)
                    }
                  ]}
                >

                </NormalTable>
                <br />

                <Header className="Subtitle" as='h4'>Formulario</Header>
                <RPForm credito={props.credito_active} max={res.totales.liquidacion} onSubmit={values => {
                  props.add({
                    ...values,
                    credito: props.credito_active._id
                  })

                  setModal({})
                }} />


              </React.Fragment>
            )
          }

          {
            modal.id === 'DETAIL' && <React.Fragment>

              <NormalTable
                minRows={0}
                className="-striped"
                showPagination={false}

                data={item.pagares.map(pagare => {
                  //  Buscar pagare.
                  const pagare_complete = props.credito_active.pagares.find(item => item._id == pagare._id)

                  return {
                    ...pagare,
                    concepto: pagare_complete.concepto
                  }
                })}
                columns={[
                  {
                    Header: "Concepto",
                    accessor: "concepto"
                  },
                  {
                    Header: "Capital",
                    accessor: "monto_recuperado_capital",
                    Cell: row => formatColumn('currency', row.value)
                  },
                  {
                    Header: "Interes ordinario",
                    accessor: "monto_recuperado_interes",
                    Cell: row => formatColumn('currency', row.value)
                  },
                  {
                    Header: "Interes vencido",
                    accessor: "monto_recuperado_vencido",
                    Cell: row => formatColumn('currency', row.value)
                  },
                  {
                    Header: "Interes moratorio",
                    accessor: "monto_recuperado_moratorio",
                    Cell: row => formatColumn('currency', row.value)
                  }
                ]}
              >

              </NormalTable>

            </React.Fragment>
          }

        </Modal.Content>
      </Modal>
    </React.Fragment>

  )
}

const mapDispatchToProps = (dispatch) => ({
  load: id => dispatch(actions.load(id)),
  loadPagares: id => dispatch(pagareActions.load(id)),
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

export default connect(mapStateToProps, mapDispatchToProps)(Recuperacion)

