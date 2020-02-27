import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';

export default class AddFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendName: '',
    };
  }

  addFriend = () => {
    const {friendName} = this.state;
    const {route} = this.props;
    const {username} = route.params;
    fetch(
      `http://localhost:8080/Friends/add?username=${username}&friendName=${friendName}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          alert(data.message);
        } else {
          alert(friendName + ' has been added to your friendsList!');
        }
      });
  };

  setFriendName = friendName => {
    this.setState({friendName});
  };

  render() {
    const {friendName} = this.state;
    return (
      <View>
        <Text style={styles.heading}>Add friend!</Text>
        <View style={styles.spacingHigh} />
        <Text style={styles.fieldText}>Enter friend's username: </Text>
        <TextInput
          style={styles.fieldText}
          placeholder="Enter friend's username:"
          value={friendName}
          autoCapitalize="none"
          onChangeText={this.setFriendName}
        />
        <View>
          <Button title={'Add'} onPress={this.addFriend} />
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
  spacingSmaller: {
    padding: 1,
  },
  chatHeading: {
    alignItems: 'center',
  },
  alignRightView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
