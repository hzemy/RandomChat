import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button, FlatList} from 'react-native';
import Triangle from 'react-native-triangle';

export default class ChatScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            chat: {},
            message: "",
            chats: []
        }
    }
    loadChat = (username, friendName) => {
        fetch(`http://localhost:8080/Chat/read?username=${username}&friend=${friendName}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.message)
                } else {
                    this.setState({
                        chats: data
                    })
                }
            });
    };

    loadChatGroup = (username, id) => {

        fetch(`http://localhost:8080/Chat/readgroup?gName=${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.message)
                } else {
                    this.setState({
                        chats: data
                    })
                }
            });
    };

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("friendName"),
        };
    };

    render() {
        const {navigation} = this.props;
        const friendName = navigation.getParam('friendName'); //friend or id
        const username = navigation.getParam('userName');
        const isGroup = navigation.getParam('isGroup');
        const {message} = this.state;
        if (isGroup) {
           this.loadChatGroup(username, friendName);
        } else {
            this.loadChat(username, friendName);
        }
        const {chats} = this.state;
        console.log(chats)
        if (chats.length === 0) {
            return (
                <View style={styles.container}>
                    <View style={{flexDirection: "row", position: "absolute", bottom: 0, left: 10}}>
                        <View style={{width: "80%"}}>
                            <View style={{position: "absolute", bottom: 20, left: 10}}>
                                <TextInput
                                    placeholder={"Write message"}
                                    value={message}
                                    onChangeText={message => this.setState({message})}/>
                            </View>
                        </View>
                        <View style={{width: "20%",}}>
                            <View style={{position: "absolute", bottom: 10}}>
                                <Button title={"Send"}
                                        onPress={() => this.sendMessage(username, friendName, this.state.message)}/>
                            </View>
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <FlatList
                        keyExtractor={(x, i) => i.toString()}
                        data={chats}
                        renderItem={this.renderItem}
                        inverted = {-1}
                    />
                    <View style={{flexDirection: "row"}}>
                        <View style={{width: "80%"}}>
                            <TextInput
                                placeholder={"Write message"}
                                value={message}
                                onChangeText={message => this.setState({message})}/>
                        </View>
                        <View style={{width: "20%"}}>
                            <Button title={"Send"}
                                    onPress={() => this.sendMessage(username, friendName, this.state.message)}/>
                        </View>
                    </View>
                </View>
            );
        }
    }

    renderItem = ({item}) => {
        const {navigation} = this.props;
        const username = navigation.getParam('userName');
        const align = item.sender.username === username ? 'flex-end' : 'flex-start';
        const container = item.sender.username === username ? "#00B2EE" : "#B9D3EE";
        const dir = item.sender.username === username ? "left" : "right";
        const name = item.sender.username === username ? "Me" : item.sender.username
        return (
            <View style={{flex: 1}}>
                <View style={[{alignItems: align, flexShrink: 1}]}>
                    <View style={{backgroundColor: container, borderRadius: 10,}}>
                        <View style={{padding: 4}}/>
                        <Text>  {name}  </Text>
                        <Text>  {item.message}  </Text>
                        <Text style={{color: "#6F6F6F"}}>  {item.date}  </Text>
                        <View style={{alignItems: align}}>
                            <Triangle
                                width={20}
                                height={10}
                                color={container}
                                direction={dir}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.spacingSmall}/>
            </View>
        )
    };

    sendMessage = (username, friendName, message) => {
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
                if (data.error) {
                    alert(data.message)
                } else {
                    this.setState({chat: data[0]}, function () {
                        this.props.navigation.navigate('ChatScreen', {
                            friendName: friendName,
                            chats: data,
                            userName: username,
                        })
                    });
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