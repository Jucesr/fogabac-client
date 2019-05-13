import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux'

import ApoyosRoute from "./apoyos";
import SolicitantesRoute from "./solicitantes";

import Header from "components/Header";
import Page from "components/Page";
import ModalForm from "components/ModalForm";

const AppRouter =  (props) => (
  <BrowserRouter>
    <div className="App">
      <div className="App-Container">
        <Header />
        <Page title={props.page_title}>

          <Switch>
            <Route path="/apoyos" component={ApoyosRoute} exact={true} />
            <Route path="/solicitantes" component={SolicitantesRoute} exact={true} />
          </Switch>
        </Page>

      </div>

      <ModalForm />

    </div>

  </BrowserRouter>
)

const mapDispatchToProps = (dispatch) => ({
});

const mapStateToProps = (state) => ({
  page_title: state.app.page_title
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);