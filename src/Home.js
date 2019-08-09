import React from 'react';
import {abortController, Button, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            groups: [],
            chats: [],
        }
    }

    controller = new AbortController();

    getChats = () => {

        const {navigation} = this.props;
        const username = navigation.getParam('userName');
        fetch(`http://localhost:8080/Chat/getChats?username=${username}`, {signal: this.controller.signal})
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.message)
                } else {
                    this.setState({
                        chats: data
                    })
                }
            }).catch(error => {
            if (error.name === 'AbortError') return;
            console.log("Other error");
        });
    };

    componentWillUnmount() {
        this.controller.abort();
    }

    render() {
        const {navigation} = this.props;
        const username = navigation.getParam('userName');
        this.getChats();
        const {chats} = this.state;
        if (chats.length === 0) {
            return (
                <View style={styles.container}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AddFriend', {
                            userName: username,
                        })}>
                            <Icon name={"adduser"} size={30}/>
                            <Text>Add{"\n"}Friend</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateGroup', {
                            userName: username,
                        })}>
                            <Icon name={"addusergroup"} size={30}/>
                            <Text>Create{"\n"}Group</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AddRandom', {
                            userName: username,
                        })}>
                            <Icon2 name={"account-question"} size={30}/>
                            <Text>Add{"\n"}Random</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.spacingHigh}/>
                    <View style={styles.spacingSmall}/>
                    <View style={{justifyContent: "center", alignItems: "center",}}>
                        <Text style={styles.fieldText}>Add a friend to start chatting!</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={{flexDirection: "row", justifyContent: "space-between",}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AddFriend', {
                            userName: username,
                        })} style={{}}>
                            <Icon name={"adduser"} size={30} color={"#104E8B"}/>
                            <Text style={{color: "#104E8B"}}>Add{"\n"}Friend</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateGroup', {
                            userName: username,
                        })}>
                            <Icon name={"addusergroup"} size={30} color={"#104E8B"}/>
                            <Text style={{color: "#104E8B"}}>Create{"\n"}Group</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AddRandom', {
                            userName: username,
                        })}>
                            <Icon2 name={"account-question"} size={30} color={"#104E8B"}/>
                            <Text style={{color: "#104E8B"}}>Add{"\n"}Random</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.spacingHigh}/>
                    <View style={styles.spacingSmall}/>
                    <View style={{justifyContent: "center", alignItems: "center",}}>
                        <Text style={{fontWeight: "500", fontSize: 20}}>Chats: </Text>
                    </View>
                    <View style={styles.spacingSmall}/>
                    <View style={styles.spacingSmall}/>
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={chats}
                        renderItem={this.renderItem}
                    />
                </View>
            )
        }

    }

    renderItem = ({item}) => {
        const {navigation} = this.props;
        const username = navigation.getParam('userName');
        const name = (item.id).includes("-") ? (item.id).substring(0, (item.id).indexOf("-")) : item.id;
        const sender = item.sender === null ? "" : (item.sender.username === username ? "Me" : item.sender.username);
        const lastText = item.sender === null ? "Start Chatting!" : (item.sender.username === null ? "Start chatting!" : sender + ": " + item.message);
        const color = lastText === "Start chatting!" ? "#6F6F6F" : "#4D3F3F";
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ChatScreen', {
                    friendName: name,
                    userName: username,
                    isGroup: !(item.id).includes("-")
                })}>
                    <Text style={{color: "#104E8B"}}>
                        {name}
                    </Text>
                    <Text style={{color: color}}>
                        {lastText}
                    </Text>
                </TouchableOpacity>
                <View style={styles.spacingSmall}/>
            </View>
        )
    };
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
        flexWrap: "wrap",
    },
    spacingSmall: {
        padding: 5
    },
    spacingHigh: {
        padding: 10
    },
});