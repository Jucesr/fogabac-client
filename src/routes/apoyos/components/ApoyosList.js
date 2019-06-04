import React from 'react'
import ReactTable from "react-table";
import { Icon } from 'semantic-ui-react'
import { formatColumn } from "utils/";

const ApoyosList = (props) => {
  return (
    <React.Fragment >
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
            Header: "Nombre",
            accessor: "nombre",
            width: 350
          },
          {
            Header: "Iniciales",
            accessor: "iniciales"
          },
          {
            Header: "Tipo Crédito",
            accessor: "tipo_credito"
          },
          {
            Header: "Monto Máximo",
            accessor: "monto_maximo",
            Cell: row => formatColumn('currency', row.value)
          },
          {
            Header: "No. de Solicitudes",
            accessor: "no_solicitudes"
          }
        ]}
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            onClick: (e, handleOriginal) => {
              if(column.Header === 'Abrir'){

                props.onRowClick(rowInfo.original)
              }
              
      
              // IMPORTANT! React-Table uses onClick internally to trigger
              // events like expanding SubComponents and pivots.
              // By default a custom 'onClick' handler will override this functionality.
              // If you want to fire the original onClick handler, call the
              // 'handleOriginal' function.
              if (handleOriginal) {
                handleOriginal();
              }
            }
          };
        }}
      />
    </React.Fragment>
  )
}

ApoyosList.propTypes = {

}

export default ApoyosList