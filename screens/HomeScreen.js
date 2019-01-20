import React from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text
} from "native-base";
import { StyleSheet, View, Image, Alert } from 'react-native'
import { WebBrowser } from 'expo';
import { fetchGold, storeGold, fetchHelmet, fetchWeapon, storeHelmet, storeWeapon } from '../Storage';

export default class HomeScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      gold: 0,
      weaponLvl: 1,
      helmetLvl: 1,
    }
    this.refresh = this.refresh.bind(this);
    this.upgradeDart = this.upgradeDart.bind(this);
    this.upgradeHelmet = this.upgradeHelmet.bind(this);
  }

  static navigationOptions = {
    title: 'Shop',
  }

  async componentDidMount() {
    this.setState({
      gold: await fetchGold(),
      weaponLvl: await fetchWeapon(),
      helmetLvl: await fetchHelmet()
    });
  }

  async refresh() {
    this.setState({
      gold: await fetchGold(),
      weaponLvl: await fetchWeapon(),
      helmetLvl: await fetchHelmet()
    });
  }

  async upgradeDart() {
    this.setState({
      gold: await fetchGold(),
      weaponLvl: await fetchWeapon(),
    });
    storeGold(this.state.gold - 100);
    storeWeapon(+this.state.weaponLvl + 1)
    this.setState({
      weaponLvl: +this.state.weaponLvl + 1,
      gold: this.state.gold - 100
    })
    console.log(this.state.gold)
  }

  async upgradeHelmet() {
    this.setState({
      gold: await fetchGold(),
      helmetLvl: await fetchHelmet()
    });
    storeGold(this.state.gold - 100);
    storeHelmet(+this.state.helmetLvl + 1)
    this.setState({
      helmetLvl: +this.state.helmetLvl + 1,
      gold: this.state.gold - 100
    })
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content padder>
          <View style={{flexDirection: 'row', height: 50, marginVertical: 20}}>
            <Image
            source={{ uri: 'https://lh5.ggpht.com/j0fhQF9XI7o3_79a1w5gHQUMS5_GCWXVGmE_r1Pn_XZFDIWbxnn4JzNPAk5RcVpceg=w300' }}
            style={{ width: 80, height: 80, marginLeft: 60, marginTop: 5}}
            resizeMode="cover"
            />
            <View style={{flexDirection: 'column', marginLeft: 60}}>
              <Text style={{fontWeight: 'bold', fontSize: 28, color: 'gold'}}>Gold: {this.state.gold}</Text>
              <Button iconLeft style={{marginTop: 10, backgroundColor: 'gold'}} onPress={this.refresh}>
                <Icon active name="refresh" />
                <Text style={{fontWeight: 'bold', fontSize: 20}}>Refresh</Text>
              </Button>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row', width: '100%', alignItems: 'center', marginTop: 15}}>
            <Image
              source={{ uri: 'https://csg.tinkercad.com/things/6c43FB7tsM3/t725.png?rev=8&s=0c706e2a5f14b371bddbd2f508621f19&v=0' }}
              style={{ width: 150, height: 120, marginVertical: 15, marginLeft: 20, marginRight: 30}}
              resizeMode="cover"
            />
            <View style={{flex: 1}}>
              <Text style={{fontWeight: 'bold', fontSize: 17}}>Price: 100</Text>
              <Text style={{fontWeight: 'bold', fontSize: 17}}>+ 20 Attack Damage</Text>
              <Button
                iconLeft danger style={{marginTop: 10, width: 180, justifyContent: 'center'}}
                onPress={() => {
                  if (this.state.gold >= 100) {
                    this.upgradeDart();
                  } else {
                    Alert.alert(
                      'NOT ENOUGH GOLD',
                      'Go workout more!',
                      [
                        {text: 'Okay', style: 'cancel'},
                        {text: 'I do what I want!', onPress: () => {Alert.alert(`No, you won't`,'Go drink some water',[{text: 'Okay...', style: 'cancel'}])}, style: 'destructive'}
                      ]
                    )
                  }
                }}
              >
                <Text
                style={{fontWeight: 'bold', fontSize: 17}}>
                  Upgrade Dart Gun
                </Text>
              </Button>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row', width: '100%', alignItems: 'center'}}>
            <Image
              source={{ uri: 'https://ae01.alicdn.com/kf/HTB1x39ZHVXXXXbaXVXXq6xXFXXX7/Free-shipping-hot-sale-the-Swift-Scout-Teemo-hat-Hero-alliance-around-cospaly-hat-LOL-Game.jpg' }}
              style={{ width: 150, height: 120, marginVertical: 15, marginLeft: 20, marginRight: 30}}
              resizeMode="cover"
            />
            <View style={{flex: 1}}>
              <Text style={{fontWeight: 'bold', fontSize: 17}}>Price: 100</Text>
              <Text style={{fontWeight: 'bold', fontSize: 17}}>+ 100 Health</Text>
              <Button
                iconLeft success style={{marginTop: 10, width: 180,justifyContent: 'center'}}
                onPress={() => {
                  if (this.state.gold >= 100) {
                    this.upgradeHelmet();
                  } else {
                    Alert.alert(
                      'NOT ENOUGH GOLD',
                      'Go workout more!',
                      [
                        {text: 'Okay', style: 'cancel'},
                        {text: 'I do what I want!', onPress: () => {Alert.alert(`No, you won't`,'Go drink some water',[{text: 'Okay...', style: 'cancel'}])}, style: 'destructive'}
                      ]
                    )
                  }
                }}
              >
                <Text style={{fontWeight: 'bold', fontSize: 17}}>Upgrade Helmet</Text>
              </Button>
            </View>
          </View>
          <View style={{marginTop: 25}}>
            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 22}}>Current Attack Damage: {`${50 + 20 * this.state.weaponLvl}`}</Text>
            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 22}}>Current Health: {`${250 + 100 * this.state.helmetLvl}`}</Text>
          </View>
          <View style={{bottom: -100, position: 'absolute', flexDirection: 'row', alignSelf: 'center'}}>
            <Text style={{bottom:-10, fontWeight: 'bold', marginLeft: 5}}>Developed by:</Text>
            <Button bordered dark style={styles.mb15} onPress={this.goToGithub}>
              <Text style={{fontWeight: 'bold', fontSize: 17}}>GitHub</Text>
            </Button>
            <Button bordered primary style={styles.mb15} onPress={this.goToLinkedin}>
              <Text style={{fontWeight: 'bold', fontSize: 17}}>LinkedIn</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }

  goToGithub = () => {
    WebBrowser.openBrowserAsync('https://github.com/ljik95');
  };

  goToLinkedin = () => {
    WebBrowser.openBrowserAsync('https://www.linkedin.com/in/jongikthom/');
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  mb15: {
    marginBottom: 10,
    height: 38,
    paddingHorizontal: 15,
    marginHorizontal: 10
  },
});
