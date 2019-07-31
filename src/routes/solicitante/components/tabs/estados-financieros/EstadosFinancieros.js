import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Icon, Tab, Grid } from 'semantic-ui-react'
import { formatColumn} from "utils/";
import FormActivo from "./ActivoForm";

import actions from "store/actions/estados_financieros";


const EstadosFinancieros = (props) => {

  const [modal, setModal] = useState({});

  useEffect(() => {
    props.load(props.credito_active._id)
  }, [])

  const {
    _id = false,
    activo_circulante = {},
    activo_fijo = {},
    activo_otros = {},
    pasivo_circulante = {},
    pasivo_largo_plazo = {}
  } = props.credito_active.estados_financieros ? props.credito_active.estados_financieros[0] ? props.credito_active.estados_financieros[0] : {} : {}

  // Get totals
  const getTotal = (items) => items ? Object.keys(items).reduce((acum, key) => acum + items[key], 0) : 0;

  // Activos

  const sum_activo_circulante = getTotal(activo_circulante);

  const sum_activo_fijo = getTotal(activo_fijo)

  const sum_activo_otros = getTotal(activo_otros)

  // Pasivos

  const sum_pasivo_circulante = getTotal(pasivo_circulante)

  const sum_pasivo_largo_plazo = getTotal(pasivo_largo_plazo)


  const handler = () => {
    setModal({title: 'Activo', id: _id ? 'EDIT' : 'ADD'})
  }


  const GR = ({items: [i1, i2], type = "normal", handler}) => {
    const labelWidth = 14;
    const textWidth = 2;
    return (
    <Grid.Row className={`GR_${type}`}>
      <Grid.Column width={labelWidth}> {type == 'title' && <Button onClick={handler} color="teal" className="GR_edit" icon> <Icon name="edit"/></Button>} {i1}</Grid.Column>
      <Grid.Column width={textWidth}>{formatColumn("currency",i2)}</Grid.Column>
    </Grid.Row>
  )}

  return (
    <div>
      <Tab menu={{ secondary: true, pointing: true }} panes={[{
        menuItem: 'Activo',
        render: () => <div>
          <Grid className="Grid">
            <GR handler={handler} type="title" items={['Activo Circulante', sum_activo_circulante]}/>
            <GR type="black" items={['Caja', activo_circulante.caja]}/>
            <GR type="normal" items={['Bancos (Chequera)', activo_circulante.bancos]}/>
            <GR type="black" items={['Cuentas por cobrar (Clientes)', activo_circulante.cuentas_por_cobrar]}/>
            <GR type="normal" items={['Inventarios', activo_circulante.inventarios]}/>

            <GR handler={handler} type="title" items={['Activo Fijo', sum_activo_fijo]}/>
            <GR type="black" items={['Terrenos y edificios (Catastral)', activo_fijo.terreno_catastral]}/>
            <GR type="normal" items={['Terrenos y edificios (Comercial)', activo_fijo.terreno_comercial]}/>
            <GR type="black" items={['Maquinaria y equipo', activo_fijo.maquinaria]}/>
            <GR type="normal" items={['Equipo de oficina', activo_fijo.equipo_oficina]}/>
            <GR type="black" items={['Equipo de transporte', activo_fijo.equipo_transporte]}/>
            <GR type="normal" items={['Otros', activo_fijo.otros]}/>

            <GR handler={handler} type="title" items={['Otros activos', sum_activo_otros]}/>
            <GR type="black" items={['Rentas pagadas por anticipado', activo_otros.rentas_pagadas]}/>
            <GR type="normal" items={['Publicidad', activo_otros.publicidad]}/>
            <GR type="black" items={['Primas de seguro', activo_otros.primas]}/>

            <GR type="total" items={['Total Activo', (sum_activo_circulante + sum_activo_fijo + sum_activo_otros)]}/>
          </Grid>
        </div>
      },{
        menuItem: 'Pasivo',
        render: () => <div>
          <Grid className="Grid">
            <GR handler={handler} type="title" items={['Pasivo Circulante', sum_pasivo_circulante]}/>
            <GR type="black" items={['Proveedores', pasivo_circulante.proveedores]}/>
            <GR type="normal" items={['Acreedores diversos', pasivo_circulante.acreedores]}/>
            <GR type="black" items={['Impuestos por pagar', pasivo_circulante.impuestos_por_pagar]}/>
            <GR type="normal" items={['Creditos bancarios a corto plazo', pasivo_circulante.creditos_bancarios]}/>
            <GR type="black" items={['Otros pasivos a corto plazo', pasivo_circulante.corto_plazo]}/>

            <GR handler={handler} type="title" items={['Pasivo a Largo Plazo', sum_pasivo_largo_plazo]}/>
            <GR type="black" items={['Creditos Bancarios', pasivo_largo_plazo.creditos_bancarios]}/>
            <GR type="normal" items={['Otras Obligaciones a largo plazo', pasivo_largo_plazo.otras_obligaciones]}/>
            <GR type="black" items={['Rentas cobradas por anticipado', pasivo_largo_plazo.rentas_cobradas]}/>
            

            <GR type="total" items={['Total Pasivo', (sum_pasivo_largo_plazo + sum_pasivo_circulante)]}/>
          </Grid>
        </div>
      },{
        menuItem: 'Capital',
        render: () => <div></div>
      },{
        menuItem: 'Circulante',
        render: () => <div></div>
      }]} />

      <Modal
        open={modal.id !== undefined}
        size='small'
        onClose={() => setModal({})}
      >
        <Modal.Header>{modal.title}</Modal.Header>
        <Modal.Content>
          
          {
            modal.id === 'EDIT' && <FormActivo item={{
              ...activo_circulante,
              ...activo_fijo,
              ...activo_otros
            }} onSubmit={values => {
              props.update({
                _id,
                ...values
              })
              setModal({})
            }} />
          }
         
          {
            modal.id === 'ADD' && <FormActivo onSubmit={values => {
              props.add({
                ...values,
                credito: props.credito_active._id
              })
              setModal({})
            } } />
          } 

        </Modal.Content>
      </Modal>
    </div>
  )
}



const mapDispatchToProps = (dispatch) => ({
  load: id => dispatch(actions.load(id)),
  add: item => dispatch(actions.add(item)),
  remove: item => dispatch(actions.remove(item)),
  update: item => dispatch(actions.update(item))
});


const mapStateToProps = (state, ownProps) => ({
  credito_active: state.creditos[ownProps.credito_active]
});

export default connect(mapStateToProps, mapDispatchToProps)(EstadosFinancieros)
