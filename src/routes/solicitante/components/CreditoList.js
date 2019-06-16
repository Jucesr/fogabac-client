import React from 'react'
import ReactTable from "react-table";
import { Icon } from 'semantic-ui-react'

import { formatColumn } from "utils/";

const CreditoList = (props) => {
  return (
    <ReactTable
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
            Header: "Abrir",
            width: 60,
            Cell: () => <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Icon name="file"/></div>
          },
          {
            Header: "Folio",
            accessor: "_id"
          },
          {
            Header: "Bolsa de Crédito",
            accessor: "bolsa_credito.nombre",
            width: 400
          },
          {
            Header: "Monto Solicitado",
            accessor: "monto",
            Cell: row => formatColumn('currency', row.value)
          },
          {
            Header: "Ejercido",
            accessor: "ejercido",
            Cell: row => formatColumn('currency', row.value)
          },{
            Header: "Disponible",
            accessor: "disponible",
            Cell: row => formatColumn('currency', row.value)
          },
          {
            Header: "Recuperado",
            accessor: "recuperado",
            Cell: row => formatColumn('currency', row.value)
          }
        ]}
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            onClick: (e, handleOriginal) => {
              if(column.Header === 'Abrir'){
                props.onRowClick(rowInfo.original)
              }
        
              if (handleOriginal) {
                handleOriginal();
              }
            }
          };
        }}
      />
  )
}

export default CreditoList