import React from 'react';
import { View, StyleSheet, Image, Text, ImageBackground, Animated } from 'react-native';
import { Button, Content, Card, CardItem } from 'native-base';
import { fetchHelmet, fetchWeapon } from '../Storage';
import FadeDamage from './FadeDamage';

export default class LinksScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      weaponLvl: props.weaponLvl,
      helmetLvl: props.helmetLvl,
      stage: props.stage,
      myMax: 0,
      myHealth: 0,
      myDMG: 0,
      monsterMax: 0,
      monsterHealth: 0,
      monsterDMG: 0,
      monsterName: [
      'Pizza',
      'FrenchFries',
      'Beer',
      'FriedShrimp',
      'Donut'
      ],
      lost: false,
      fadeAnim: new Animated.Value(0)
    }
    this.attack = this.attack.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.setState({
      myMax: 200 + this.state.helmetLvl * 100,
      myHealth: 200 + this.state.helmetLvl * 100,
      myDMG: 50 + this.state.weaponLvl * 20,
      monsterMax: 200 + this.state.stage * 150,
      monsterHealth: 200 + this.state.stage * 150,
      monsterDMG: 10 + this.state.stage * 30
    });
    // console.log(this.state.stage, 'STAGE')
    // switch (this.state.stage) {
    //   case 1:
    //     this.setState({monsterName: 'French Fries'})
    //   case 2:
    //     this.setState({monsterName: 'Beer'})
    //   case 3:
    //     this.setState({monsterName: 'Fried Shrimp'})
    //   case 4:
    //     this.setState({monsterName: 'Donut'})
    // }
  }

  attack() {
    this.state.fadeAnim.setValue(1);
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 0,
        duration: 1000,
      }
    ).start();
    if (this.state.monsterHealth - this.state.myDMG <= 0) {
      this.setState({
        stage: this.state.stage + 1,
        myMax: 200 + this.state.helmetLvl * 100,
        myHealth: 200 + this.state.helmetLvl * 100,
        myDMG: 50 + this.state.weaponLvl * 20,
        monsterMax: 350 + this.state.stage * 150,
        monsterHealth: 350 + this.state.stage * 150,
        monsterDMG: 40 + this.state.stage * 30
      })
    } else if (this.state.myHealth - this.state.monsterDMG <= 0) {
      this.setState({lost: true})
    } else {
      this.setState({
        myHealth: this.state.myHealth - this.state.monsterDMG,
        monsterHealth: this.state.monsterHealth - this.state.myDMG
      })
    }
  }

  async reset() {
    this.setState({
      myHealth: 200 + await fetchHelmet() * 100,
      myDMG: 50 + await fetchWeapon() * 20,
      monsterHealth: 200 + this.state.stage * 150,
      monsterDMG: 10 + this.state.stage * 30,
      lost: false,
      fadeAnim: new Animated.Value(0)
    })
  }

  render() {
    let stage = +this.state.stage;
    return (
      !this.state.lost ?
        <Content contentContainerStyle={styles.container}>
          <ImageBackground source={{ uri:`/Users/Sangyun/Desktop/Coding/SeniorPhase/LiveTo100/assets/images/Stage${stage}` }} style={styles.backgroundImage}>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 35}}>Stage: {stage}</Text>
            </View>
            <View style={{flexDirection: 'column', position: 'absolute', marginLeft: 220, marginTop: 5}}>
              <Text style={styles.txt}>{this.state.monsterName[stage - 1]}</Text>
              <Text style={styles.txt}>Health: {this.state.monsterHealth} / {this.state.monsterMax}</Text>
              <Text style={styles.txt}>Attack DMG: {this.state.monsterDMG}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: -60, marginTop: 10}}>
                <Animated.View
                  style={{opacity: this.state.fadeAnim, marginRight: 10}}
                  >
                  <View>
                    <Text style={{fontSize: 35, fontWeight: 'bold', color: 'red'}}>-{this.state.myDMG}</Text>
                  </View>
                </Animated.View>
                <Image
                  source={{ uri:`/Users/Sangyun/Desktop/Coding/SeniorPhase/LiveTo100/assets/images/Stage${stage}Monster.png` }}
                  style={{width: 130, height: 180}}
                  resizeMode='cover'
                  />
              </View>
            </View>
            <View style={{position: 'absolute',flexDirection: 'column', bottom: 30, marginLeft: 30}}>
              <Animated.View
                style={{opacity: this.state.fadeAnim, marginRight: 10}}
                >
                <View>
                  <Text style={{fontSize: 35, fontWeight: 'bold', color: 'red', textAlign: 'center'}}>-{this.state.monsterDMG}</Text>
                </View>
              </Animated.View>
              <Image
                source={{ uri:'/Users/Sangyun/Desktop/Coding/SeniorPhase/LiveTo100/assets/images/Teemo.png' }}
                style={{width: 180, height: 160}}
              />
              <Text style={styles.txt}>Jay</Text>
              <Text style={styles.txt}>Health: {this.state.myHealth} / {this.state.myMax}</Text>
              <Text style={styles.txt}>Attack DMG: {this.state.myDMG}</Text>
            </View>
          </ImageBackground>
          <Card style={styles.card}>
            <CardItem>
              <Text style={{fontSize: 20}}>Wild {this.state.monsterName[stage - 1]} appeared!!</Text>
              <View style={{marginLeft: 10}}>
                <Button iconLeft danger style={{width: 160, justifyContent: 'center', alignSelf: 'center'}} onPress={() => this.attack()}>
                  <Text style={{fontWeight: 'bold', fontSize: 17}}>
                    Attack
                  </Text>
                </Button>
              </View>
            </CardItem>
          </Card>
        </ Content>
        :
        <Content contentContainerStyle={styles.container}>
          <ImageBackground source={{ uri:`/Users/Sangyun/Desktop/Coding/SeniorPhase/LiveTo100/assets/images/Stage${stage}` }} style={styles.backgroundImage}>
            <Button iconLeft danger style={{height: 80, width: 170, justifyContent: 'center', alignSelf: 'center', bottom: -270}} onPress={this.reset}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center'}}>
                I'm ready for another battle!
              </Text>
            </Button>
            <Image
              source={{ uri:'/Users/Sangyun/Desktop/Coding/SeniorPhase/LiveTo100/assets/images/LostTeemo.png' }}
              style={{position: 'absolute', width: 160, height: 180, bottom: 30, marginLeft: 30}}
            />
          </ImageBackground>
          <Card style={styles.card}>
            <CardItem style={{flexDirection: 'column'}}>
              <Text style={{textAlign: 'center', fontSize: 20}}>Aw.. You lost.</Text>
              <Text style={{textAlign: 'center', fontSize: 20}}>Get stronger and come back.</Text>
            </CardItem>
          </Card>
        </ Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    flex : 1,
    width : '100%'
  },
  card: {
    borderColor: 'black',
    borderWidth: 5
  },
  txt: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
