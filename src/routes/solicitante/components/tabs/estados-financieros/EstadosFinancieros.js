import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Icon, Tab, Grid } from 'semantic-ui-react'
import { formatColumn} from "utils/";
import FormActivo from "./ActivoForm";
import FormPasivo from "./PasivoForm";
import FormCapital from "./CapitalForm";
import FormCirculante from "./CirculanteForm";
import FormIngreso from "./IngresosForm";
import FormEgreso from "./EgresoForm";
import Table from "components/Table";

import actions from "store/actions/estados_financieros";


const EstadosFinancieros = (props) => {

  const [modal, setModal] = useState({});
  const [item, setItem] = useState();

  useEffect(() => {
    props.load(props.credito_active._id)
  }, [])

  const {
    _id = false,
    activo_circulante = {},
    activo_fijo = {},
    activo_otros = {},
    pasivo_circulante = {},
    pasivo_largo_plazo = {},
    capital = {},
    circulante_ingresos = {},
    circulante_gastos = {},
    circulante_otros = {},
    ingresos = [],
    egresos = [],
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

  //  Capital

  const sum_capital = getTotal(capital)

  //  Circulantes

  const sum_circulante_ingresos = getTotal(circulante_ingresos)
  const sum_circulante_gastos = getTotal(circulante_gastos)
  const sum_circulante_otros = getTotal(circulante_otros)


  const onSubmit = values => {
    if(_id){
      //  It already exits it will update
      props.update({
        _id,
        ...values
      })
    }else{
      //  It is new
      props.add({
        ...values,
        credito: props.credito_active._id
      })
    }
    
    setModal({})
  }

  const handlerActivo = () => {
    setModal({title: 'Activo', id: 'ACTIVO'})
  }
  const handlerPasivo = () => {
    setModal({title: 'Pasivo', id: 'PASIVO'})
  }
  const handlerCapital = () => {
    setModal({title: 'Capital', id: 'CAPITAL'})
  }
  const handlerCirculante = () => {
    setModal({title: 'Circulante', id: 'CIRCULANTE'})
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
            <GR handler={handlerActivo} type="title" items={['Activo Circulante', sum_activo_circulante]}/>
            <GR type="black" items={['Caja', activo_circulante.caja]}/>
            <GR type="normal" items={['Bancos (Chequera)', activo_circulante.bancos]}/>
            <GR type="black" items={['Cuentas por cobrar (Clientes)', activo_circulante.cuentas_por_cobrar]}/>
            <GR type="normal" items={['Inventarios', activo_circulante.inventarios]}/>

            <GR handler={handlerActivo} type="title" items={['Activo Fijo', sum_activo_fijo]}/>
            <GR type="black" items={['Terrenos y edificios (Catastral)', activo_fijo.terreno_catastral]}/>
            <GR type="normal" items={['Terrenos y edificios (Comercial)', activo_fijo.terreno_comercial]}/>
            <GR type="black" items={['Maquinaria y equipo', activo_fijo.maquinaria]}/>
            <GR type="normal" items={['Equipo de oficina', activo_fijo.equipo_oficina]}/>
            <GR type="black" items={['Equipo de transporte', activo_fijo.equipo_transporte]}/>
            <GR type="normal" items={['Otros', activo_fijo.otros]}/>

            <GR handler={handlerActivo} type="title" items={['Otros activos', sum_activo_otros]}/>
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
            <GR handler={handlerPasivo} type="title" items={['Pasivo Circulante', sum_pasivo_circulante]}/>
            <GR type="black" items={['Proveedores', pasivo_circulante.proveedores]}/>
            <GR type="normal" items={['Acreedores diversos', pasivo_circulante.acreedores]}/>
            <GR type="black" items={['Impuestos por pagar', pasivo_circulante.impuestos_por_pagar]}/>
            <GR type="normal" items={['Creditos bancarios a corto plazo', pasivo_circulante.creditos_bancarios_corto]}/>
            <GR type="black" items={['Otros pasivos a corto plazo', pasivo_circulante.corto_plazo]}/>

            <GR handler={handlerPasivo} type="title" items={['Pasivo a Largo Plazo', sum_pasivo_largo_plazo]}/>
            <GR type="black" items={['Creditos Bancarios', pasivo_largo_plazo.creditos_bancarios]}/>
            <GR type="normal" items={['Otras Obligaciones a largo plazo', pasivo_largo_plazo.otras_obligaciones]}/>
            <GR type="black" items={['Rentas cobradas por anticipado', pasivo_largo_plazo.rentas_cobradas]}/>

            <GR type="total" items={['Total Pasivo', (sum_pasivo_largo_plazo + sum_pasivo_circulante)]}/>
          </Grid>
        </div>
      },{
        menuItem: 'Capital',
        render: () => <div>
          <Grid className="Grid">
            <GR handler={handlerCapital} type="title" items={['Capital', sum_capital]}/>
            <GR type="black" items={['Capital social', capital.social]}/>
            <GR type="normal" items={['Resultados acumulados', capital.resultados_acumulados]}/>
            <GR type="black" items={['Utilidad o pérdida último periodo', capital.utilidad_perdida]}/>
        
            <GR type="total" items={['Total Pasivo mas Capital', (sum_pasivo_largo_plazo + sum_pasivo_circulante + sum_capital)]}/>
          </Grid>
        </div>
      },{
        menuItem: 'Circulante',
        render: () => <div>
        <Grid className="Grid">
          <GR handler={handlerCirculante} type="title" items={['Ingresos', sum_circulante_ingresos]}/>
          <GR type="black" items={['Ventas de contado', circulante_ingresos.ventas_contado]}/>
          <GR type="normal" items={['Ventas de credito', circulante_ingresos.ventas_credito]}/>

          <GR handler={handlerCirculante} type="title" items={['Gastos de operación', sum_circulante_gastos]}/>
          <GR type="black" items={['Sueldos', circulante_gastos.sueldos]}/>
          <GR type="normal" items={['Comisión por ventas', circulante_gastos.comision]}/>
          <GR type="black" items={['Luz, teléfono, agua', circulante_gastos.luz_telefono_agua]}/>
          <GR type="normal" items={['Renta de local', circulante_gastos.renta_local]}/>
          <GR type="black" items={['Papelería y útiles de ofina', circulante_gastos.publicidad]}/>
          <GR type="normal" items={['Publicidad', circulante_gastos.papeleria]}/>
          <GR type="black" items={['Primas de seguro', circulante_gastos.primas_seguro]}/>
          <GR type="normal" items={['Gasolina', circulante_gastos.gasolina]}/>
          <GR type="black" items={['Otros', circulante_gastos.otros]}/>

          <GR handler={handlerCirculante} type="title" items={['Otros', sum_circulante_otros]}/>
          <GR type="black" items={['Costo de ventas', circulante_otros.costo_ventas]}/>
          <GR type="normal" items={['Impuestos', circulante_otros.impuestos]}/>

          <GR type="total" items={['Total Circulante', (sum_circulante_ingresos + sum_circulante_gastos + sum_circulante_otros)]}/>
        </Grid>
        
      </div>
      },{
        menuItem: 'Ingresos',
        render: () => <div>
          <div className="Section">
            <div> 
            </div>
            <Button size="tiny" color="green" onClick={() => {setModal({title: 'Agregar ingreso', id: 'INGRESO'}); setItem({})}}>
              <Icon name='plus' />
              Nuevo ingreso
            </Button>
          </div>
          <Table
            itemName="concepto"
            onEditRow={row => {
              setModal({
                  title: 'Editar egreso',
                  id: 'INGRESO'
                })
                setItem(row)
              }}
            onDeleteRow={row => { 
              props.deleteIngreso(_id, row._id);
            }}
            columns={[{
              Header: "Concepto",
              accessor: "concepto"
            },{
              Header: "Superficie",
              accessor: "superficie",
              Cell: row => formatColumn('number', row.value)
            },{
              Header: "Rendimiento",
              accessor: "rendimiento",
              Cell: row => formatColumn('number', row.value)
            },{
              Header: "Volumen Total",
              accessor: "volumen_total",
              Cell: row => formatColumn('number', row.value)
            },{
              Header: "Valor Unitario",
              accessor: "valor_unitario",
              Cell: row => formatColumn('currency', row.value)
            },{
              Header: "Otros Ingresos",
              accessor: "otros_ingresos",
              Cell: row => formatColumn('currency', row.value)
            },{
              Header: "Total Estimado",
              accessor: "total",
              Cell: row => formatColumn('currency', row.value)
            }]}
            data={ingresos.map(item => ({
              ...item,
              volumen_total: item.superficie * item.rendimiento,
              total: item.superficie * item.rendimiento * item.valor_unitario
            }))}
          />
        </div>
      },{
        menuItem: 'Egresos',
        render: () => <div>
          <div className="Section">
            <div> 
            </div>
            <Button size="tiny" color="green" onClick={() => {setModal({title: 'Agregar egreso', id: 'EGRESO'}); setItem({})}}>
              <Icon name='plus' />
              Nuevo egreso
            </Button>
          </div>
          <Table
            itemName="concepto"
            onEditRow={row => {
              setModal({
                  title: 'Editar egreso',
                  id: 'EGRESO'
                })
                setItem(row)
              }}
            onDeleteRow={row => { 
              props.deleteEgreso(_id, row._id);
            }}
            columns={[{
              Header: "Concepto",
              accessor: "concepto"
            },{
              Header: "Superficie",
              accessor: "superficie",
              Cell: row => formatColumn('number', row.value)
            },{
              Header: "Costo",
              accessor: "costo",
              Cell: row => formatColumn('number', row.value)
            },{
              Header: "Costo Total",
              accessor: "costo_total",
              Cell: row => formatColumn('currency', row.value)
            },{
              Header: "Otros Egresos",
              accessor: "otros_egresos",
              Cell: row => formatColumn('currency', row.value)
            },{
              Header: "Total Estimado",
              accessor: "total",
              Cell: row => formatColumn('currency', row.value)
            }]}
            data={egresos.map(item => ({
              ...item,
              costo_total: item.superficie * item.costo,
              total: item.superficie * item.costo
            }))}
          />
        </div>
      }]} />

      <Modal
        open={modal.id !== undefined}
        size='small'
        onClose={() => setModal({})}
      >
        <Modal.Header>{modal.title}</Modal.Header>
        <Modal.Content>
          
          {
            modal.id === 'ACTIVO' && <FormActivo item={ _id ? {
              ...activo_circulante,
              ...activo_fijo,
              ...activo_otros
            }: undefined } onSubmit={onSubmit} />
          }
          {
            modal.id === 'PASIVO' && <FormPasivo item={ _id ? {
              ...pasivo_circulante,
              ...pasivo_largo_plazo
            }: undefined } onSubmit={onSubmit} />
          }
          {
            modal.id === 'CAPITAL' && <FormCapital item={ _id ? {
              ...capital
            }: undefined } onSubmit={onSubmit} />
          }
          {
            modal.id === 'CIRCULANTE' && <FormCirculante item={ _id ? {
              ...circulante_ingresos,
              ...circulante_gastos,
              ...circulante_otros
            }: undefined } onSubmit={onSubmit} />
          }

          {
            modal.id === 'INGRESO' && <FormIngreso item={item ? item : undefined} onSubmit={({ingresos}) => {
              if(_id){
                //  It already exits it will update
                props.update({
                  _id,
                  ingresos: [{
                    ...item,
                    ...ingresos[0]
                  }]
                })
              }else{
                //  It is new
                props.add({
                  credito: props.credito_active._id
                })
              }
              
              setModal({})
            }} />
          }

          {
            modal.id === 'EGRESO' && <FormEgreso item={item ? item : undefined} onSubmit={({egresos}) => {
              if(_id){
                //  It already exits it will update
                props.update({
                  _id,
                  egresos: [{
                    ...item,
                    ...egresos[0]
                  }]
                })
              }else{
                //  It is new
                props.add({
                  credito: props.credito_active._id
                })
              }
              
              setModal({})
            }} />
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
  update: item => dispatch(actions.update(item)),
  deleteEgreso: (id, item_id) => dispatch(actions.deleteEgreso(id, item_id)),
  deleteIngreso: (id, item_id) => dispatch(actions.deleteIngreso(id, item_id))
});


const mapStateToProps = (state, ownProps) => ({
  credito_active: state.creditos[ownProps.credito_active]
});

export default connect(mapStateToProps, mapDispatchToProps)(EstadosFinancieros)
