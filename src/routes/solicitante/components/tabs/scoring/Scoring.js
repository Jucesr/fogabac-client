import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Icon, Grid } from 'semantic-ui-react'
import { formatColumn} from "utils/";
import FormFogabac from "./FormFogabc";
import FormGobBC from "./FormGobBC";
import FormSolvenciaMoral from "./FormSolvenciaMoral";
import FormProyectoEstatal from "./FormProyectoEstatal";

import actions from "store/actions/scoring";

const Scoring = (props) => {

  const [modal, setModal] = useState({});
  // const [item, setItem] = useState();

  useEffect(() => {
    props.load(props.credito_active._id)
  }, [])

  const {
    _id = false,
    fogabac = {},
    gob_bc = {},
    solvencia_moral = 0,
    proyecto_estrategico = 0,
    _fogabac = 0,
    _gob_bc = 0,
    _solvencia_moral = 0,
    _proyecto_estrategico = 0,
    _total_fogabac = 0,
    _total_gob_bc = 0,
    _total_solvencia_moral = 0,
    _total_proyecto_estrategico = 0,
  } = props.credito_active.scoring ? props.credito_active.scoring[0] ? props.credito_active.scoring[0] : {} : {}

  const gran_total = _total_fogabac + _total_gob_bc + _total_solvencia_moral + _total_proyecto_estrategico;
  const _total = _fogabac + _gob_bc + _solvencia_moral + _proyecto_estrategico;

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

  const handlerFogabac = () => {
    setModal({title: 'Editar Scoring Fogabac', id: 'FORM_FOGABAC'})
  }
  const handlerGobBC = () => {
    setModal({title: 'Editar Scoring GOB BC', id: 'FORM_GOBBC'})
  }
  const handlerSolvencia = () => {
    setModal({title: 'Editar Scoring Solvencia Moral', id: 'FORM_SOLVENCIA_MORAL'})
  }
  const handlerProyecto = () => {
    setModal({title: 'Editar Scoring Proyecto Estrategico', id: 'FORM_PROYECT_ESTATAL'})
  }

  const GR = ({items: [i1, i2, i3, i4], type = "normal", handler}) => {
    const labelWidth = 10;
    const textWidth = 2;
    return (
    <Grid.Row className={`GR_${type}`}>
      {
        type == "title" ? <React.Fragment>
          <Grid.Column width={labelWidth}>{i1}</Grid.Column>
          <Grid.Column width={textWidth}>{i2}</Grid.Column>
          <Grid.Column width={textWidth}>{i3}</Grid.Column>
          <Grid.Column width={textWidth}>{i4}</Grid.Column>
        </React.Fragment> : <React.Fragment>
          <Grid.Column width={labelWidth}> {handler && <Button onClick={handler} color={'white'} className="GR_edit" icon> <Icon name="edit"/></Button>} {i1}</Grid.Column>
          <Grid.Column width={textWidth}>{ i2 ? formatColumn("percentage",i2) : ''}</Grid.Column>
          <Grid.Column width={textWidth}>{ i3 ? formatColumn("number",i3) : ''}</Grid.Column>
          <Grid.Column width={textWidth}>{ i4 ? formatColumn("percentage",i4) : ''}</Grid.Column>
        </React.Fragment>  
      }
    </Grid.Row>
  )}

  return (
    <div>
      <Grid className="Grid">
        <GR type="title" items={['Evaluación General', 'Porcentaje Sección', 'Valor Total Obtenido', 'Puntuación']}/>
        <GR handler={handlerFogabac} type="black" items={['Scoring Fogabac', 20,_fogabac, _total_fogabac]}/>
        <GR handler={handlerGobBC} type="normal" items={['Scoring Gob BC', 10,_gob_bc,_total_gob_bc]}/>
        <GR handler={handlerFogabac} type="black" items={['Razones Financieras', 10,0,0]}/>
        <GR handler={handlerFogabac} type="normal" items={['Capacidad de pago y Relación Garantiía vs Crédito', 30,0,0]}/>
        <GR handler={handlerSolvencia} type="black" items={['Solvencia Moral', 10,_solvencia_moral,_total_solvencia_moral]}/>
        <GR handler={handlerProyecto} type="normal" items={['Proyecto Estratégico Estatal', 20,_proyecto_estrategico,_total_proyecto_estrategico]}/>
        <GR type="total" items={['Totales', 100, _total, gran_total]}/>
      </Grid>


      <Modal
        open={modal.id !== undefined}
        size='large'
        onClose={() => setModal({})}
      >
        <Modal.Header>{modal.title}</Modal.Header>
        <Modal.Content>
          
          { 
            modal.id === 'FORM_FOGABAC' && <FormFogabac item={ _id ? {...fogabac}: undefined } onSubmit={onSubmit} />
          }
          { 
            modal.id === 'FORM_GOBBC' && <FormGobBC item={ _id ? {...gob_bc}: undefined } onSubmit={onSubmit} />
          }
          { 
            modal.id === 'FORM_SOLVENCIA_MORAL' && <FormSolvenciaMoral item={ _id ? {solvencia_moral}: undefined } onSubmit={onSubmit} />
          }
          { 
            modal.id === 'FORM_PROYECT_ESTATAL' && <FormProyectoEstatal item={ _id ? {proyecto_estrategico}: undefined } onSubmit={onSubmit} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Scoring)
