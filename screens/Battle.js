import React from 'react';
import LinksScreen from './LinksScreen';
import { fetchHelmet, fetchWeapon, fetchStage, storeStage, storeWeapon, storeHelmet } from '../Storage';
import { Button, Icon } from 'native-base';
import { Text, View } from 'react-native';

export default class Battle extends React.Component {

  state = {
    weaponLvl: 0,
    helmetLvl: 0,
    stage: 1,
    redering: false
  }

  static navigationOptions = {
    title: 'LiveTo100',
  };

  async componentDidMount() {
    storeStage(1)
    this.setState({weaponLvl: await fetchWeapon(), helmetLvl: await fetchHelmet(), stage: await fetchStage()});
  }

  render() {
    return (
      this.state.rendering ?
      (
        <LinksScreen weaponLvl={this.state.weaponLvl} helmetLvl={this.state.helmetLvl} stage={this.state.stage} />
      ) :
      (
        <View style={{backgroundColor: 'gray', height: '100%', justifyContent: 'center'}}>
          <Button iconLeft style={{marginTop: 10, backgroundColor: 'gold', height: 80, alignSelf: 'center'}} onPress={() => this.setState({rendering:true})}>
            <Text style={{fontWeight: 'bold', fontSize: 40, marginHorizontal: 15}}>Ready to battle</Text>
          </Button>
        </View>
      )
    )
  }
}
