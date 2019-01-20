import React from 'react';
import LinksScreen from './LinksScreen';
import { fetchHelmet, fetchWeapon } from '../Storage';
import { Button, Icon } from 'native-base';
import { Text } from 'react-native';

export default class Battle extends React.Component {

  state = {
    weaponLvl: 1,
    helmetLvl: 1,
    redering: false
  }

  static navigationOptions = {
    title: 'LiveTo100',
  };

  async componentDidMount() {
    this.setState({weaponLvl: await fetchWeapon()});
    this.setState({helmetLvl: await fetchHelmet()});
  }

  render() {
    return (
      this.state.rendering ?
      (
        <LinksScreen weaponLvl={this.state.weaponLvl} helmetLvl={this.state.helmetLvl} />
      ) :
      (
        <Button iconLeft style={{marginTop: 10, backgroundColor: 'gold'}} onPress={() => this.setState({rendering:true})}>
          <Icon active name="refresh" />
          <Text style={{fontWeight: 'bold', fontSize: 20}}>PLAY</Text>
        </Button>
      )
    )
  }
}
