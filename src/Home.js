import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, FlatList, SectionList} from 'react-native';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            groups: [],
            chats: []
        }
    }


    /*componentWillUnmount() {
        cle
    }*/

    getChats = () => {
        const {navigation} = this.props;
        const username = navigation.getParam('userName');
        fetch(`http://localhost:8080/Chat/getChats?username=${username}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.message)
                } else {
                    this.setState({
                        chats: data
                    });

                }
            });
    };

    getFriends = () => {
        const {navigation} = this.props;
        const username = navigation.getParam('userName');
        fetch(`http://localhost:8080/Friends/list?username=${username}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.message)
                } else {
                    this.setState({
                        friends: data
                    });

                }
            });
    };

    /*getGroups = () => {
        const {navigation} = this.props;
        const username = navigation.getParam('userName');
        fetch(`http://localhost:8080/Chat/getGroups?username=${username}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.message)
                } else {
                    this.setState({
                        groups: data
                    });
                    return data;

                }
            });
    };*/

    render() {
        const {navigation} = this.props;
        const username = navigation.getParam('userName');
        //this.getFriends();
        //this.getGroups();
        this.getChats();
        const {chats} = this.state;
        //const {friends} = this.state;
        //const {groups} = this.state;
        if (chats.length === 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.fieldText}>Add a friend to start chatting!</Text>
                    <Button title={"Add Friend"} onPress={() => this.props.navigation.navigate('AddFriend', {
                        userName: username,
                    })}/>
                    <Button title={"Add Random"} onPress={() => this.props.navigation.navigate('AddRandom', {
                        userName: username,
                    })}/>

                </View>
            )
        } else {
            return (

                <View style={styles.container}>
                    <Button title={"Add Friend"} onPress={() => this.props.navigation.navigate('AddFriend', {
                        userName: username,
                    })}/>
                    <View style={styles.spacingSmall}/>

                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={chats}
                        renderItem={this.renderItem}

                    />
                    <Button title={"Create Group"} onPress={() => this.props.navigation.navigate('CreateGroup', {
                        userName: username,

                    })}/>
                    <Button title={"Add Random"} onPress={() => this.props.navigation.navigate('AddRandom', {
                        userName: username,
                    })}/>
                </View>
            )
        }

    }


    renderItem = ({item}) => {
        const {navigation} = this.props;
        const username = navigation.getParam('userName');
        const name = item.username === undefined ? item.id : item.username;
        const func = item.username === undefined ? this.loadChatGroup : this.loadChat;
        return(
            <View>
                <Text style={styles.fieldText}>
                    {name}
                </Text>
                <View>
                    <Button title={"View Chat"} onPress={() => func(username, name)}/>
                </View>
                <View style={styles.spacingSmall}/>

            </View>
        )

        /*return (
            <View>
                <Text style={styles.fieldText}>
                    {item.username}
                </Text>
                <View>
                    <Button title={"View Chat"} onPress={() => this.loadChat(username, item.username)}/>
                </View>
                <View style={styles.spacingSmall}/>

            </View>

        )*/



    };

    /*renderGroup = ({item}) => {
        const {navigation} = this.props;
        const username = navigation.getParam('userName');
        return(
            <View>
                <Text style={styles.fieldText}>
                    {item.id}
                </Text>
                <View>
                    <Button title={"View Chat"} onPress={() => this.loadChatGroup(username, item.id)}/>
                </View>
                <View style={styles.spacingSmall}/>

            </View>
        )

    };*/

    loadChat = (username, friend) => {
        fetch(`http://localhost:8080/Chat/read?username=${username}&friend=${friend}`)
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                if (data.error) {
                    alert(data.message)
                } else {
                    this.props.navigation.navigate('ChatScreen', {
                        friendName: friend,
                        chats: data,
                        userName: username,
                        isGroup: false
                    })
                }
            });
    };

    loadChatGroup = (username, id) => {
        fetch(`http://localhost:8080/Chat/readgroup?gName=${id}`)
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                if (data.error) {
                    alert(data.message)
                } else {
                    this.props.navigation.navigate('ChatScreen', {
                        friendName: id,
                        chats: data,
                        userName: username,
                        isGroup: true
                    })
                }
            });
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    textInput: {
        height: 45, width: "95%", borderColor: "gray", borderWidth: 1, fontSize: 20,
    },
    buttonStyle: {
        width: "93%",
        marginTop: 50,
        backgroundColor: "red",
    },
    fieldText: {
        fontSize: 16,
        textAlign: "center"
    },
    spacingSmall: {
        padding: 5
    },
});