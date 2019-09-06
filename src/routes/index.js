import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux'

import ApoyosRoute from "./apoyos";
import SolicitanteListRoute from "./solicitantes";
import SolicitanteRoute from "./solicitante";
import SettingsRoute from "./settings";

import Header from "components/Header";
import Page from "components/Page";
import NotificationMessage from "components/NotificationMessage";

const AppRouter =  (props) => (
  <BrowserRouter>
    <div className="App">
      <div className="App-Container">
        <Header />
        <Page title={props.page_title}>

          <Switch>
            <Route path="/apoyos" component={ApoyosRoute} exact={true} />
            <Route path="/solicitantes" component={SolicitanteListRoute} exact={true} />
            <Route path="/solicitantes/:id" component={SolicitanteRoute} exact={true} />
            <Route path="/settings" component={SettingsRoute} exact={true} />
          </Switch>
        </Page>

      </div>

      <NotificationMessage />

    </div>

  </BrowserRouter>
)

const mapDispatchToProps = (dispatch) => ({
});

const mapStateToProps = (state) => ({
  page_title: state.app.page_title
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);