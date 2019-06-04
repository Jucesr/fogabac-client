import React from 'react'
import ReactTable from "react-table";
import { Icon } from 'semantic-ui-react'

const ListSolicitantes = (props) => {
  return (
    <div >
      <ReactTable
         filterable={true}
         defaultFilterMethod={(filter, row, column) => String( row[filter.id] ).toLowerCase().includes(filter.value.toLowerCase())}
         previousText='Anterior'
         nextText='Siguiente'
         loadingText='Cargando...'
         noDataText='Lista vacia'
         pageText='Página'
         ofText='de'
         rowsText='renglones'
         className="-striped"
         data={props.data.map(item => ({...item, completo: `${item.paterno} ${item.materno} ${item.nombre}`}))}
         columns={[
          {
            Header: "Abrir",
            width: 60,
            Cell: () => <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Icon name="file"/></div>
          },
          {
            Header: "Solicitante",
            accessor: "completo",
            width: 400
          },
          {
            Header: "Vígente",
            accessor: "vigente"
          },
          {
            Header: "Vencido",
            accessor: "vencido"
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
    </div>
  )
}

ListSolicitantes.propTypes = {

}

export default ListSolicitantes