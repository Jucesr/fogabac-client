import React, {Component} from 'react'
import {connect} from 'react-redux'
import ApoyosList from "./components/ApoyosList";

import { loadApoyos } from "store/actions/apoyos";
import { loadTipoCreditos } from "store/actions/tipo_creditos";
import { setApoyo } from "store/actions/app";

class ApoyosListPage extends Component {

  componentDidMount = () => {
    this.props.changePage({
      page_title: 'Apoyos'
    })
    this.props.loadApoyos()
    this.props.loadTipoCreditos()
  }

  openApoyo = (item) => {
    this.props.changePage({
      page_title: item.nombre
    })
    this.props.setApoyo(item)
    this.props.history.push('/solicitantes')
  }

  render(){
    const {props} = this
    const apoyos = Object.keys(props.apoyos).map((key) => props.apoyos[key])
    return (
      <React.Fragment>
        <ApoyosList 
          data={apoyos}
          onRowClick={this.openApoyo}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  
 changePage: ({page_title, page_active}) => {
  dispatch({
    type: 'CHANGE_PAGE',
    payload: {page_title, page_active}
  })
 },
 loadApoyos: () => dispatch(loadApoyos()),
 loadTipoCreditos: () => dispatch(loadTipoCreditos()),
 setApoyo: item => dispatch(setApoyo(item))
});

const mapStateToProps = (state) => ({
 apoyos: state.apoyos
});

export default connect(mapStateToProps, mapDispatchToProps)(ApoyosListPage)