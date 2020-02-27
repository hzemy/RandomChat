import React from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
//import Icon from 'react-native-vector-icons/AntDesign';
//import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      groups: [],
      chats: [],
    };
  }

  getChats = () => {
    const {route} = this.props;
    const {username} = route.params;
    console.log('email: ' + JSON.stringify(username));
    fetch(`http://localhost:8080/Chat/getChats?username=${username}`
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.message);
        } else {
          this.setState({
            chats: data,
          });
        }
      })
      .catch(error => {
        if (error.name === 'AbortError') {
          return;
        }
        console.log('Other error');
      });
  };

  // componentWillUnmount() {
  //   this.controller.abort();
  // }

  getFriends = () => {
    const {route} = this.props;
    const {username} = route.params;
    console.log('email: ' + JSON.stringify(username));
    fetch(`http://localhost:8080/Friends/list?username=${username}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.message);
        } else {
          this.setState({
            friends: data,
          });
        }
      });
  };

  render() {
    const {route} = this.props;
    const {username} = route.params;
    console.log('email: ' + JSON.stringify(username));
    this.getChats();
    const {chats} = this.state;
    if (chats.length === 0) {
      return (
        <View style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('AddFriend', {
                  username: username,
                })
              }>
              <Text>Add{'\n'}Friend</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('CreateGroup', {
                  username: username,
                })
              }>
              <Text>Create{'\n'}Group</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('AddRandom', {
                  username: username,
                })
              }>
              <Text>Add{'\n'}Random</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spacingHigh} />
          <View style={styles.spacingSmall} />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.fieldText}>
              Add a friend to start chatting!
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('AddFriend', {
                  username: username,
                })
              }>
              <Text>Add{'\n'}Friend</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('CreateGroup', {
                  username: username,
                })
              }>
              <Text>Create{'\n'}Group</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('AddRandom', {
                  username: username,
                })
              }>
              <Text>Add{'\n'}Random</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spacingHigh} />
          <View style={styles.spacingSmall} />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontWeight: '500'}}>Chats: </Text>
          </View>
          <View style={styles.spacingSmall} />
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={chats}
            renderItem={this.renderItem}
          />
        </View>
      );
    }
  }

  renderItem = ({item}) => {
    const {route} = this.props;
    const {username} = route.params;
    console.log('email: ' + JSON.stringify(username));
    const func = item.id.includes('-') ? this.loadChat : this.loadChatGroup;
    const name = item.id.includes('-')
      ? item.id.substring(0, item.id.indexOf('-'))
      : item.id;
    const sender =
      item.sender.username === username ? 'Me' : item.sender.username;
    const lastText =
      item.sender.username === null
        ? 'Start chatting!'
        : sender + ': ' + item.message;
    const color = lastText === 'Start chatting!' ? '#6F6F6F' : '#4D3F3F';
    return (
      <View>
        <TouchableOpacity onPress={() => func(username, name)}>
          <Text>{name}</Text>
          <Text style={{color: color}}>{lastText}</Text>
        </TouchableOpacity>
        <View style={styles.spacingSmall} />
      </View>
    );
  };

  loadChat = (username, friend) => {
    fetch(
      `http://localhost:8080/Chat/read?username=${username}&friend=${friend}`,
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.message);
        } else {
          this.props.navigation.navigate('ChatScreen', {
            friendName: friend,
            chats: data,
            username: username,
            isGroup: false,
          });
        }
      });
  };

  loadChatGroup = (username, id) => {
    fetch(`http://localhost:8080/Chat/readgroup?gName=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.message);
        } else {
          this.props.navigation.navigate('ChatScreen', {
            friendName: id,
            chats: data,
            username: username,
            isGroup: true,
          });
        }
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  textInput: {
    height: 45,
    width: '95%',
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 20,
  },
  buttonStyle: {
    width: '93%',
    marginTop: 50,
    backgroundColor: 'red',
  },
  fieldText: {
    fontSize: 16,
    flexWrap: 'wrap',
  },
  spacingSmall: {
    padding: 5,
  },
  spacingHigh: {
    padding: 10,
  },
});
