import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button, FlatList, ScrollView} from 'react-native';

export default class ChatScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            username: "",
            chat: {},
            message: ""
        }
    }

    render() {
        const {navigation} = this.props;
        const friendName = navigation.getParam('friendName'); //friend or id
        const username = navigation.getParam('userName');
        const chats = navigation.getParam('chats');

        const {message} = this.state;
        return (
            <View style={styles.container}>


                <FlatList
                    style = {{backgroundColor: "#146a8a"}}
                    keyExtractor={(x, i) => i}
                    data={chats}
                    renderItem={this.renderItem}

                />
                <TextInput
                    style={styles.textStyle}
                    placeholder={"Write message"}
                    value={message}
                    onChangeText={message => this.setState({message})}/>
                <Button title={"Send"}
                        onPress={() => this.sendMessage(username, friendName, this.state.message)}/>

            </View>
        );
    }

    renderItem = ({item}) => {

        const {navigation} = this.props;
        const username = navigation.getParam('userName');
        const align = item.sender.username === username ? 'flex-end' : 'flex-start';
        return (
            <View style={{flex: 1}}>
                <View style={[{alignItems: align, flexShrink: 1}]}>
                    <Text>{item.sender.username}</Text>
                    <Text>{item.message}</Text>
                    <Text>{item.date}</Text>
                </View>
                <View style={styles.spacingSmall}/>
            </View>

        )
    };

    sendMessage = (username, friendName, message) => {
        console.log(username);
        console.log(friendName);
        console.log(message);
        const {navigation} = this.props;
        const isGroup = navigation.getParam('isGroup');
        let url = "";
        if (isGroup) {
            url = `http://localhost:8080/Chat/chatgroup?username=${username}&gName=${friendName}&message=${message}`;
        } else {
            url = `http://localhost:8080/Chat/chat?username=${username}&friend=${friendName}&message=${message}`;
        }
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    alert(data.message)
                } else {
                    this.setState({chat: data[data.length - 1]});
                    this.props.navigation.navigate('ChatScreen', {
                        friendName: friendName,
                        chats: data,
                        userName: username
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
    heading: {
        fontSize: 24,
        fontWeight: "500"
    },
    spacingHigh: {
        padding: 10
    },
    spacingSmall: {
        padding: 5
    },
    fieldText: {
        fontSize: 16
    },
    alignLeftView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    btnStyle: {
        backgroundColor: "black",
        color: "white",
        borderRadius: 2
    },
    buttonContainer: {
        flex: 1,
        padding: 26,
        backgroundColor: "#fff",
        justifyContent: "flex-start",

    },
    innerContainer: {
        // flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
});

