import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Button } from 'react-native-elements';
import { storeStartDate } from '../Storage';

export default class LinksScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      gold: 0,
      weaponLvl: 1,
      helmetLvl: 1
    }
  }

  static navigationOptions = {
    title: 'Links',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button>
          Hi
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
