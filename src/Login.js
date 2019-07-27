import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            friends: [

            ],

        }
    }

    loginUser = () => {
        const {username, password} = this.state;
        //const {changePageHandler} = this.props;
        fetch(`http://localhost:8080/User/login?username=${username}&password=${password}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    alert(data.message)
                } else {
                    /*const {friends} = this.state.friends;
                    for (let i = 0; i < 3; i++) {
                        console.log(friends[i].username);
                    }*/
                    this.props.navigation.navigate('Home', {
                        userName: this.state.username,
                        //friendList: this.state.friends,
                    })
                    //changePageHandler("home");
                }
            })
    };

    /*getFriends() {
        const {username} = this.state;
        fetch(`http://localhost:8080/Friends/list?username=${username}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    alert(data.message)
                } else {
                    this.setState({
                        friends: data
                    });
                    this.props.navigation.navigate('Home', {
                        userName: this.state.username,
                        friendList: this.state.friends,
                    })

                }
            })
    };*/

    render() {
        const {username, password} = this.state;
        return (
            <View style={styles.heading}>
                <Text style={styles.heading}>Welcome Back!</Text>
                <View style={styles.spacingHigh}/>
                <Text style={styles.fieldText}>Username: </Text>
                <TextInput style = {styles.fieldText} placeholder="Enter username:" onChangeText={username => this.setState({username})}/>
                <View style={styles.spacingSmall}/>
                <Text style={styles.fieldText}>Password: </Text>
                <TextInput style = {styles.fieldText} placeholder="Enter password:" onChangeText={password => this.setState({password})}/>
                <View style={styles.spacingSmall}/>
                <View>
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


