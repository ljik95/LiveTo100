import React from 'react';
import { Text, Image, StyleSheet, View } from 'react-native';
import {
  Container,
  Content,
  ListItem,
  Separator,
  Item,
  Input,
  Button,
  Icon,
} from "native-base";
import { Header } from 'react-native-elements';
import { Pedometer } from 'expo'
import { storeSteps, storeStartDate, storeGold, fetchSteps, fetchStartDate, fetchGold } from '../Storage';

export default class DataList extends React.Component {

  constructor() {
    super();
    this.state = {
      name: 'Jay',
      gold: '0',
      start: '0',
      steps: 'Refresh Please',
      workOut: '0',
      water: '0',
      sleep: '0',
    };
    this.turnIntoGold = this.turnIntoGold.bind(this);
    this.refresh = this.refresh.bind(this);
    this.getSteps = this.getSteps.bind(this);
  }

  getSteps() {
    fetchStartDate().then(date => this.setState({start:date}))
    Pedometer.getStepCountAsync(new Date(this.state.start), new Date()).then(
      result => {
        this.setState({ steps: String(result.steps) });
      },
      error => {
        this.setState({
          steps: "Step count not available at the moment"
        });
      }
    );
  }

  async turnIntoGold() {
    this.setState({gold: await fetchGold()});
    let goldAddition = +this.state.workOut + (+this.state.water) * 7 + (+this.state.sleep) * 3;
    if (typeof (+this.state.steps)/250 === 'number') {
      goldAddition += (+this.state.steps)/250;
    }
    this.setState({gold: +this.state.gold + goldAddition});
    this.setState({start: new Date(), steps: '0', workOut: '0', water: '0', sleep: '0'});
    storeSteps(this.state.steps);
    storeStartDate(this.state.start);
    storeGold(this.state.gold);
  }

  refresh() {
    try {
      this.getSteps();
      console.log(this.state.steps);
      storeSteps(this.state.steps);
    } catch (err) {
      this.setState({
        steps: "Step count not available on your device"
      });
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header outerContainerStyles={{height: 90}}>
          <Image
          source={{ uri: 'https://lh5.ggpht.com/j0fhQF9XI7o3_79a1w5gHQUMS5_GCWXVGmE_r1Pn_XZFDIWbxnn4JzNPAk5RcVpceg=w300' }}
          style={{ width: 70, height: 67, marginLeft: 10}}
          resizeMode="cover"
          />
          <Text style={{fontSize: 25, fontWeight: 'bold', marginRight: 30, marginBottom: 5}}>Name: Jay</Text>
        </Header>
        <Content>
          <Separator bordered style={{height: 42}}>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>Steps taken since reset</Text>
          </Separator>
          <ListItem>
            <Item regular>
              <Input
                value={this.state.steps}
                style={{fontSize: 15, height: 32}}
              />
            </Item>
          </ListItem>
          <Separator bordered style={{height: 42}}>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>Minutes of exercise since reset?</Text>
          </Separator>
          <ListItem>
            <Item regular>
              <Input
                value={this.state.workOut}
                keyboardType='numeric'
                style={{fontSize: 15, height: 32}}
                onChangeText={(text) => this.setState({workOut: text})} />
            </Item>
          </ListItem>
          <Separator bordered style={{height: 42}}>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>Amount of water drunk since reset? (Cup)</Text>
          </Separator>
          <ListItem last>
            <Item regular>
              <Input
                value={this.state.water}
                keyboardType='numeric'
                style={{fontSize: 15, height: 32}}
                onChangeText={(text) => this.setState({water: text})} />
            </Item>
          </ListItem>
          <Separator bordered style={{height: 42}}>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>Hours of sleep since reset?</Text>
          </Separator>
          <ListItem>
            <Item regular>
              <Input
                value={this.state.sleep}
                keyboardType='numeric'
                style={{fontSize: 15, height: 32}}
                onChangeText={(text) => this.setState({sleep: text})} />
            </Item>
          </ListItem>
          <View style={{ flexDirection: "row", justifyContent: 'center' }}>
            <Button info style={{marginTop: 10}} onPress={this.refresh}>
              <Icon active name="refresh" />
              <Text style={{marginHorizontal: 15, fontWeight: 'bold', fontSize: 28}}>Refresh</Text>
            </Button>
          </View>
          <View style={{ flexDirection: "row", justifyContent: 'center' }}>
            <Button iconLeft style={{marginTop: 10, backgroundColor: 'gold'}} onPress={this.turnIntoGold}>
              <Icon active name="cash" />
              <Text style={{marginHorizontal: 15, fontWeight: 'bold', fontSize: 28}}>Turn into Gold</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    marginTop: 40,
  },
});
