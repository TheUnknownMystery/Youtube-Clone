import * as React from 'react';
import Home from './Screens/Home'
import { createAppContainer } from 'react-navigation';
import { SwitchNavigator } from './navigations/SwitchNavigator';


export default class App extends React.Component {
  render() {
    return (

      <AppContainer />

    );
  }
}

const AppContainer = createAppContainer(SwitchNavigator)