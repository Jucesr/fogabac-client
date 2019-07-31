import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'informed';
import { Button, Tab } from 'semantic-ui-react'
import Field from "components/Field";

const RPForm = (props) => {

  return (
    <Form initialValues={props.item ? props.item : {
      
    }} onSubmit={({
      caja,
      bancos,
      cuentas_por_cobrar,
      inventarios,
      terreno_catastral,
      terreno_comercial,
      maquinaria,
      equipo_oficina,
      equipo_transporte,
      otros,
      rentas_pagadas,
      publicidad,
      primas
    }) => props.onSubmit({
      activo_circulante: {
        caja,
        bancos,
        cuentas_por_cobrar,
        inventarios,
      },
      activo_fijo: {
        terreno_catastral,
        terreno_comercial,
        maquinaria,
        equipo_oficina,
        equipo_transporte,
        otros
      },
      activo_otros: {
        rentas_pagadas,
        publicidad,
        primas
      }
    })}>
      {({ formState }) => (
        <React.Fragment>
          <Tab menu={{ secondary: true, pointing: true }} panes={[{
            menuItem: 'Activo Circulante', render: () => (
              <div className="Form Form_activos">
                <Field keepState label="Caja" field="caja" kind="currency"/>
                <Field keepState label="Bancos" field="bancos" kind="currency"/>
                <Field keepState label="Cuentas por cobrar" field="cuentas_por_cobrar" kind="currency"/>
                <Field keepState label="Inventarios" field="inventarios" kind="currency"/>
              </div>
            )
          },{
            menuItem: 'Activo Fijo', render: () => (
              <div className="Form">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <Field keepState label="Terrenos y edificios (Catastral)" field="terreno_catastral" kind="currency"/>
                <Field keepState label="Terrenos y edificios (Comercial)" field="terreno_comercial" kind="currency"/>
                <Field keepState label="Maquinaria y equipo" field="maquinaria" kind="currency"/>
                <Field keepState label="Equipo de oficina" field="equipo_oficina" kind="currency"/>
                <Field keepState label="Equipo de transporte" field="equipo_transporte" kind="currency"/>
                <Field keepState label="Otros" field="otros" kind="currency"/>
              </div>
            )
          },{
            menuItem: 'Otros Activos', render: () => (
              <div className="Form Form_activos">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <Field keepState label="Rentas pagadas por anticipado" field="rentas_pagadas" kind="currency"/>
                <Field keepState label="Publicidad" field="publicidad" kind="currency"/>
                <Field keepState label="Primas de seguro" field="primas" kind="currency"/>
              </div>
            )
          }]}/>
          <div className="Form">
            <Button className="Form_button" color="blue" type="submit">Guardar</Button>
          </div>
        </React.Fragment>
        
        
      )}
    </Form>
  )
}

RPForm.propTypes = {
  item: PropTypes.object,
  onSubmit: PropTypes.func
}

export default RPForm