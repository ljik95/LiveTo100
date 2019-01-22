import React from 'react';
import DataList from './DataList';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Stats',
    headerStyle : {marginBottom: -40},
  };

  render() {
    return <DataList />;
  }
}
