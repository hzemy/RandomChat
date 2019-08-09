import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
} from 'react-native';

export default class CreateGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: "",
            memberNames: ""
        }
    }

    createGroup = () => {
        const {navigation} = this.props;
        const username = navigation.getParam('userName');
        const {memberNames} = this.state;
        const {groupName} = this.state;
        console.log(username);
        console.log(memberNames);
        console.log("GroupNames: " + groupName);
        fetch(`http://localhost:8080/Chat/creategroup?username=${username}&friends=${memberNames}&gName=${groupName}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    alert(data.message)
                } else {
                    alert(groupName + " has been created!");
                }
            })
    };

    setGroupName = (groupName) => {
        this.setState({groupName})
    };

    setMemberNames = (memberNames) => {
        this.setState({memberNames})
    };

    render() {
        const {groupName} = this.state;
        const {memberNames} = this.state;
        return (
            <View>
                <Text style={styles.heading}>Create Group!</Text>
                <View style={styles.spacingHigh}/>
                <Text style={styles.fieldText}>Enter group name: </Text>
                <TextInput style={styles.fieldText} placeholder="Enter group name" value={groupName}
                           autoCapitalize={"none"}
                           onChangeText={this.setGroupName}/>
                <View style={styles.spacingSmall}/>
                <Text style={styles.fieldText}>Enter name of friends to add separated by commas: </Text>
                <TextInput style={styles.fieldText}
                           placeholder="Enter name of friends to add separated by commas" value={memberNames}
                           autoCapitalize={"none"}
                           onChangeText={this.setMemberNames}/>
                <View style={{width: "50%", alignSelf: "center"}}>
                    <Button title={"Create"} onPress={this.createGroup}/>
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