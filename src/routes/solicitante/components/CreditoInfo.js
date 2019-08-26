import React from 'react'
import { Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { formatDate, formatColumn , replaceAll, toUpper} from "utils/";
import capitalize from 'lodash/capitalize'

const CreditoInfo = ({
  item: {
    _id,
    createdAt,
    promotor = "Julio Ojeda",
    estatus = "Pendiente",
    monto,
    destino,
    comision_apertura,
    tiee,
    ingresos = 0,
    tiv,
    egresos = 0,
    tim
  } = {}
}) => {
  return (
    <Grid className="Grid" columns={4}>
        <GR items={['Folio', toUpper(_id), 'Registro', toUpper(formatDate(createdAt))]}/>
        <GR items={['Promotor', toUpper(promotor), 'Estatus', toUpper(estatus)]}/>
        <GR items={['Monto Solicitado', formatColumn('currency', monto), 'Destino del crédito', toUpper(replaceAll(destino, '_', ' '))]}/>
        <GR items={['Comisión por apertura', `${comision_apertura} %` , 'TI Ordinario', `${tiee} %`]}/>
        <GR items={['Ingresos', formatColumn('currency', ingresos), 'TI Vencido', `${tiv} %` ]}/>
        <GR items={['Egresos', formatColumn('currency', egresos), 'TI Moratorio', `${tim} %` ]}/>
    </Grid>
  )
}

const GR = ({items: [i1, i2, i3, i4]}) => {
  const labelWidth = 3
  const textWidth = 5;
  return (
  <Grid.Row className="Grid_row">
    <Grid.Column className="Grid_row_label" width={labelWidth}>{i1}</Grid.Column>
    <Grid.Column className="Grid_row_text"width={textWidth}>{i2}</Grid.Column>
    <Grid.Column className="Grid_row_label" width={labelWidth}>{i3}</Grid.Column>
    <Grid.Column className="Grid_row_text"width={textWidth}>{i4}</Grid.Column>
  </Grid.Row>
)}

CreditoInfo.propTypes = {
  persona: PropTypes.object.isRequired
}

export default CreditoInfo
