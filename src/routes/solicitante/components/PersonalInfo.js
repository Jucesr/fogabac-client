import React from 'react'
import { Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { formatDate } from "utils/";

const SolicitanteInfoPage = ({
  persona: {
    paterno,
    nombre,
    rfc,
    curp,
    fecha_nacimiento = "",
    municipio,
    tipo_persona,
    materno,
    domicilio,
    codigo_postal,
    telefono,
    sexo,
    localidad
  } = {}
}) => {
  return (
    <Grid className="Grid" columns={4}>
        <GR items={['Apellido paterno', paterno, 'Apellido materno', materno]}/>
        <GR items={['Nombre', nombre, 'Domicilio', domicilio]}/>
        <GR items={['RFC', rfc, 'Código postal', codigo_postal]}/>
        <GR items={['CURP', curp, 'Télefono', telefono]}/>
        <GR items={['Fecha de nacimiento', formatDate(fecha_nacimiento), 'Sexo', sexo]}/>
        <GR items={['Municipio', municipio, 'Localidad', localidad]}/>
        <GR items={['Tipo de persona', tipo_persona, '', '']}/>
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

SolicitanteInfoPage.propTypes = {
  persona: PropTypes.object.isRequired
}

export default SolicitanteInfoPage
