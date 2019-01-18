import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pedometer } from "expo";
import {Badge, Button} from 'react-native-elements';

export default class PedometerFunc extends React.Component {

  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0
  };

  componentDidMount = () => {
    this._subscribe();
  }

  componentWillUnmount = () => {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  static navigationOptions = {
    title: 'Welcome',
  }

  render = () => {
    return (
      <View style={styles.container}>
          {this.state.isPedometerAvailable === 'true' ?
            // <Text style={styles.fonts}>{`
            //   Steps taken in the last 24 hours: ${this.state.pastStepCount}
            //   Walk! And watch this go up: ${this.state.currentStepCount}
            // `}</Text>
            <View>
              <Text>Live 'Til 100</Text>
              <Badge containerStyle={styles.buttonContainer}>
              </Badge>
            </View>
            :
            <Badge containerStyle={styles.buttonContainer}>
              <Text style={styles.fonts}>{`Sorry, You cannot play this game because your device has no access to the pedometer :/
            `}</Text>
            </Badge>
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    justifyContent: 'center',
   },
  buttonContainer: {
    backgroundColor: 'white',
    height: 250,
    margin: 20,
  },
  fonts: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 15
  },
});

