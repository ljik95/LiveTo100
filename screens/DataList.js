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
  Icon
} from "native-base";
import { Header } from 'react-native-elements';
import { Pedometer } from 'expo'
import { storeSteps, storeStartDate, fetchSteps, fetchStartDate } from '../Storage';

export default class DataList extends React.Component {

  constructor() {
    super();
    this.state = {
      name: 'Jay',
      age: 24,
      start: '0',
      steps: 'Refresh Please',
      workOut: '0',
      water: '0',
      sleep: '0',
    };
    this.powerUp = this.powerUp.bind(this);
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

  async powerUp() {
    let stepCount = await fetchSteps();
    this.setState({start: new Date(), steps: '0'})
    storeSteps(this.state.steps)
    storeStartDate(this.state.start)
  }

  refresh() {
    try {
      this.getSteps();
      console.log(this.state.steps)
      storeSteps(this.state.steps)
    } catch (err) {
      this.setState({
        steps: "Step count not available on your device"
      });
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header outerContainerStyles={{height: 130}}>
          <Image
          source={{ uri: 'https://lh5.ggpht.com/j0fhQF9XI7o3_79a1w5gHQUMS5_GCWXVGmE_r1Pn_XZFDIWbxnn4JzNPAk5RcVpceg=w300' }}
          style={{ width: 85, height: 80}}
          resizeMode="cover"
          />
          <Text style={{fontSize: 27, fontWeight: 'bold'}}>Name: Jay</Text>
          <Text style={{fontSize: 27, fontWeight: 'bold'}}>Age: 24</Text>
        </Header>
        <Content padder>
          <Separator bordered style={{height: 42}}>
            <Text style={{fontSize: 18}}>Steps taken since reset</Text>
          </Separator>
          <ListItem>
            <Item regular>
              <Input
                value={this.state.steps}
              />
            </Item>
          </ListItem>
          <Separator bordered style={{height: 42}}>
            <Text style={{fontSize: 18}}>How many hours did you exercise since reset?</Text>
          </Separator>
          <ListItem>
            <Item regular>
              <Input
                placeholder={this.state.workOut}
                onChangeText={(text) => this.setState({workOut: text})} />
            </Item>
          </ListItem>
          <Separator bordered style={{height: 42}}>
            <Text style={{fontSize: 18}}>How much water did you drink since reset?</Text>
          </Separator>
          <ListItem last>
            <Item regular>
              <Input
                placeholder={this.state.water}
                onChangeText={(text) => this.setState({water: text})} />
            </Item>
          </ListItem>
          <Separator bordered style={{height: 42}}>
            <Text style={{fontSize: 18}}>How many hours did you sleep since reset?</Text>
          </Separator>
          <ListItem>
            <Item regular>
              <Input
                placeholder={this.state.sleep}
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
            <Button iconLeft danger style={{marginTop: 10}} onPress={this.powerUp}>
              <Icon active name="body" />
              <Text style={{marginHorizontal: 15, fontWeight: 'bold', fontSize: 28}}>Power Up!</Text>
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
    marginTop: 15,
  },
});
