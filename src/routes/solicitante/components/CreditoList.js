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
            accessor: "numero_contrato"
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
            accessor: "importe_ejercido",
            Cell: row => formatColumn('currency', row.value)
          },{
            Header: "Disponible",
            accessor: "importe_disponible",
            Cell: row => formatColumn('currency', row.value)
          },
          {
            Header: "Recuperado",
            accessor: "importe_recuperado",
            Cell: row => formatColumn('currency', row.value)
          },
          {
            Header: "Pagares",
            accessor: "no_pagares",
            Cell: row => formatColumn('number', row.value)
          },{
            Header: "Saldo",
            accessor: "liquidacion",
            Cell: row => formatColumn('currency', row.value)
          },
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