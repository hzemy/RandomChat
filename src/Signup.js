import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';

export default class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirm: ""
        }
    }
    signupUser = () => {
        const {username, password, confirm} = this.state;
        fetch(`http://localhost:8080/User/signup?username=${username}&password=${password}&confirm=${confirm}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    alert(data.message)
                } else {
                    this.props.navigation.navigate('Home', {
                        userName: this.state.username,
                        friendList: []
                    })
                }
            })
    };

    render() {
        return (
            <View>
                <Text style={styles.heading}>Welcome! </Text>
                <View style={styles.spacingHigh}/>
                <Text style={styles.fieldText}>Username: </Text>
                <TextInput style = {styles.fieldText} placeholder="Enter username:" onChangeText={username => this.setState({username})}/>
                <View style={styles.spacingSmall}/>
                <Text style={styles.fieldText}>Password: </Text>
                <TextInput style = {styles.fieldText} placeholder="Enter password:" onChangeText={password => this.setState({password})}/>
                <View style={styles.spacingSmall}/>
                <Text style={styles.fieldText}>Confirm Password: </Text>
                <TextInput style = {styles.fieldText} placeholder="Confirm password:" onChangeText={confirm => this.setState({confirm})}/>
                <View style={styles.spacingSmall}/>
                <View>
                    <Button title={"Sign Up"} onPress={this.signupUser}/>
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
        textAlign: "center"
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
