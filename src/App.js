import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login'
import Evaluation from './pages/evaluation'
import CheckInfo from './pages/checkInfo'
import Finished from './pages/finished'

import wxFireWall from './utils/wxFireWall'
import { config } from './config/config.default'

export const AppContext = React.createContext({})

function App() {
  const [userInfo, setUserInfo] = React.useState({
    login: false,
    sno: null,
    token: null,
  })

  if (config.wxOnly) {
    wxFireWall()
  }

  return (
    <AppContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/check-info" component={CheckInfo} />
          <Route exact path="/evaluation" component={Evaluation} />
          <Route exact path="/finished" component={Finished} />
        </Switch>
      </HashRouter>
    </AppContext.Provider>
  )
}

export default App;
