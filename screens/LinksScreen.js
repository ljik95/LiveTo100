import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Button } from 'native-base';
import { fetchHelmet, fetchWeapon } from '../Storage';

export default class LinksScreen extends React.Component {

  constructor(props) {
    super(props);
    console.log(props, 'PROPS')
    this.state = {
      weaponLvl: +props.weaponLvl,
      helmetLvl: +props.helmetLvl,
      stage: 1
    }
  }

  // async componentDidMount() {
  //   this.setState({weaponLvl: await fetchHelmet()});
  //   this.setState({helmetLvl: await fetchWeapon()});
  // }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 30}}>Stage: {this.state.stage}</Text>
        </View>
        <View style={{flexDirection: 'column', position: 'absolute', marginLeft: 270, marginTop: 40}}>
          <Text>Pizza</Text>
          <Text>Health: 300</Text>
          <Text>Attack DMG: 30</Text>
          <Image
            source={{ uri:'/Users/Sangyun/Desktop/Coding/SeniorPhase/LiveTo100/assets/images/Pizza.png' }}
            style={{width: 120, height: 180}}
          />
        </View>
        <View style={{position: 'absolute',flexDirection: 'column', bottom: 150, marginLeft: 30}}>
          <Image
            source={{ uri:'/Users/Sangyun/Desktop/Coding/SeniorPhase/LiveTo100/assets/images/Teemo.png' }}
            style={{width: 180, height: 160}}
          />
          <Text>Jay</Text>
          <Text>Health: {250 + this.props.helmetLvl * 100}</Text>
          <Text>Attack DMG: {50 + this.props.weaponLvl * 20}</Text>
        </View>
        <View style={{bottom: -500}}>
          <Button iconLeft danger style={{width: 180, justifyContent: 'center', alignSelf: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>
              Attack
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: 'gray',
  },
});
