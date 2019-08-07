import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            friends: [],
            hidden: true

        }
    }

    loginUser = () => {
        const {username, password} = this.state;
        fetch(`http://192.168.0.100:8080/User/login?username=${username}&password=${password}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    alert(data.message)
                } else {
                    this.props.navigation.navigate('Home', {
                        userName: this.state.username,
                    })
                }
            })
    };

    render() {
        const {username, password} = this.state;
        const {hidden} = this.state;
        const title = hidden ? "eye-slash" : "eye";
        return (
            <View style={styles.heading}>
                <Text style={styles.heading}>Welcome Back!</Text>
                <View style={styles.spacingHigh}/>
                <Text style={styles.fieldText}>Username: </Text>
                <TextInput style={styles.fieldText} autoCapitalize="none" placeholder="Enter username"
                           onChangeText={username => this.setState({username})}/>
                <View style={styles.spacingSmall}/>
                <Text style={styles.fieldText}>Password: </Text>
                <View style={{flexDirection: "row", justifyContent: "center"}}>
                    <Text>{"       "}</Text>
                    <TextInput style={styles.fieldText}
                               autoCapitalize="none" placeholder="Enter password"
                               secureTextEntry={hidden}
                               onChangeText={password => this.setState({password})}/>
                    <Text> {"  "}</Text>
                    <TouchableOpacity onPress={() => this.setState({hidden: !hidden})}>
                        <Icon name={title} size={18}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.spacingSmall}/>
                <View style={{width: "50%", alignSelf: "center"}}>
                    <Button title={"Login"} onPress={this.loginUser}/>
                </View>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
        fontWeight: "500",
        textAlign: "center"
    },
    spacingHigh: {
        padding: 10
    },
    spacingSmall: {
        padding: 5
    },
    fieldText: {
        fontSize: 16,
        textAlign: "center",
        alignItems: "center"
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
    }
});


