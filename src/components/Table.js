import React, { useState } from 'react'
import ReactTable from "react-table"
import { Icon, Button, Confirm } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const Table = (props) => {

  const [confirm, setConfirm] = useState(false);
  const [content, setContent] = useState();
  const [onConfirm, setOnConfirm] = useState();

  return (
    <React.Fragment>
      <Confirm
        confirmButton="Eliminar"
        cancelButton="Cancelar"
        header="¿Estás seguro de eliminarlo?"
        content={content}
        open={confirm}
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          setConfirm(false)
          onConfirm()
        }}
      />

      <ReactTable
        defaultFilterMethod={(filter, row, column) => String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())}
        previousText='Anterior'
        nextText='Siguiente'
        loadingText='Cargando...'
        noDataText='Lista vacia'
        pageText='Página'
        ofText='de'
        rowsText='renglones'
        className="-striped"
        data={props.data}
        columns={[
          {
            Header: "Acciones",
            accessor: "descarga",
            width: 150,
            Cell: ({ original }) => (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
                {props.onSelectRow && <Button icon onClick={() => props.onSelectRow(original)}><Icon name="folder open outline" /></Button>}
                
                {props.onDownloadRow && <Button icon onClick={() => props.onDownloadRow(original)}><Icon name="download" /></Button>}
                
                
                {/* DELETE */}

                {props.onDeleteRow && <Button icon onClick={() => {
                  setContent(
                    <div style={{ margin: '30px' }}>
                    <div>No podrás recuperar este elemento.</div>
                      <br />
                    <div><strong>{original[props.itemName]}</strong></div>
                  </div>
                  )

                  setOnConfirm(() => () => props.onDeleteRow(original))

                  setConfirm(true)
                  }}><Icon name="trash" />
                </Button>}

                {/* EDIT */}

                {props.onEditRow && <Button icon onClick={() => props.onEditRow(original)}><Icon name="edit" /></Button>}
              </div>
            )
          },
          ...props.columns
        ]}
      />
    </React.Fragment>

  )
}

Table.propTypes = {
  itemName: PropTypes.string,
  data: PropTypes.array,
  columns: PropTypes.array,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func
}

export default Table