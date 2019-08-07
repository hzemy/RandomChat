import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';

export default class AddRandom extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            friendName: ""
        }
    }

    addRandom = () => {
        const {navigation} = this.props;
        const username = navigation.getParam('userName');
        fetch(`http://192.168.0.103:8080/Friends/addrandom?username=${username}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    alert(data.message)
                } else {
                    alert(data[0].username + " has been added to your friendsList!");
                }
            })
    };;

    setFriendName = (friendName) => {
        this.setState({friendName})
    };

    render() {
        return (
            <View>
                <Text style={styles.heading}>Add a random friend!</Text>
                <View style={styles.spacingHigh}/>
                <View style={{width: "50%", alignSelf: "center"}}>
                    <Button title={"Add"} onPress={this.addRandom}/>
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
    },
    spacingSmaller: {
        padding: 1
    },
    chatHeading: {
        alignItems: 'center'
    },
    alignRightView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end"
    }
});