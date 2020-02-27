import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

export default class Main extends React.Component {
  render() {
    return (
      <View style={{position: 'absolute', marginTop: 100, marginLeft: 40}}>
        <Text style={styles.heading}>Welcome to RandomChats!</Text>
        <View style={styles.spacingHigh} />
        <View>
          <Text style={styles.fieldText}>New User?</Text>
          <Button
            title={'Sign Up'}
            onPress={() => this.props.navigation.navigate('SignUp')}
          />
        </View>
        <View style={styles.spacingSmall} />
        <View>
          <Text style={styles.fieldText}>Coming Back?</Text>
          <Button
            title={'Login'}
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',

  },
  spacingHigh: {
    padding: 10,
  },
  spacingSmall: {
    padding: 5,
  },
  fieldText: {
    fontSize: 16,
    textAlign: 'center',
  },
  alignLeftView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  btnStyle: {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 2,
  },
});
