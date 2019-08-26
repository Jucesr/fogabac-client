import React from 'react'
import { Grid } from 'semantic-ui-react'
import { formatDate, toUpper } from "utils/";

const SolicitanteInfoPage = ({
  persona: {
    paterno = "",
    nombre= "",
    rfc= "",
    curp= "",
    fecha_nacimiento = "",
    municipio= "",
    tipo_persona= "",
    materno= "",
    domicilio= "",
    codigo_postal= "",
    telefono= "",
    sexo= "",
    localidad= ""
  } = {}
}) => {

  return (
    <Grid className="Grid" columns={4}>
        <GR items={['Apellido paterno', toUpper(paterno), 'Apellido materno', toUpper(materno)]}/>
        <GR items={['Nombre', toUpper(nombre), 'Domicilio', toUpper(domicilio)]}/>
        <GR items={['RFC', toUpper(rfc), 'Código postal', toUpper(codigo_postal)]}/>
        <GR items={['CURP', toUpper(curp), 'Télefono', toUpper(telefono)]}/>
        <GR items={['Fecha de nacimiento', formatDate(fecha_nacimiento), 'Sexo', toUpper(sexo)]}/>
        <GR items={['Municipio', toUpper(municipio), 'Localidad', toUpper(localidad)]}/>
        <GR items={['Tipo de persona', toUpper(tipo_persona), '', '']}/>
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

export default SolicitanteInfoPage
