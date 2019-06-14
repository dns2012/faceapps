import React, { Component } from 'react';

import { View, Alert, BackHandler } from 'react-native';

import { Text, Thumbnail, Container,  Content,  ListItem, Icon, Left, Body, Button } from 'native-base';

import SharedPreferences from 'react-native-shared-preferences';

export default class Sidebar extends Component {

    constructor() {
        super();
        this.signOut = this.signOut.bind(this);
        this.confirmedSO = this.confirmedSO.bind(this);
        this.password = this.password.bind(this);
    }
    
    signOut() {
        Alert.alert(
            "Konfirmasi",
            "Checkout dan keluar aplikasi?",
            [
                {text: 'BATAL', onPress: () => ""},
                {text: 'YA', onPress: () => this.confirmedSO()},
            ],
            {cancelable: true},
        )
    }

    password() {
        this.props.navigation.navigate("Password");
    }

    confirmedSO() {
        SharedPreferences.getItem("userId", function(value) {
            let userId = parseInt(value);
            const form_status = {
                status : "0"
            }
            fetch("http://117.53.47.77:3000/profile/status/" + userId, {
                method: "PUT",
                body: JSON.stringify(form_status),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => response.json())
            .then(response => {})
            .catch(error => {
                console.log(error)
            })
        })
        SharedPreferences.clear();
        BackHandler.exitApp();
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <View style={{flex: 2, justifyContent: "center", alignItems: "center", backgroundColor: '#808080'}}>
                    <Thumbnail source={{uri: 'http://117.53.47.77:3000/static/upload/' + this.props.image}} style={{alignSelf: "center", marginTop: 10, width: 100, height: 100, borderRadius: 100, borderWidth: 1, borderColor: "#eee"}} />
                    <Text style={{color: "#fff", fontSize: 20, textTransform: "uppercase"}}>{this.props.name}</Text>
                    <Text style={{color: "#fff", fontSize: 10}}> ~ {this.props.username}</Text>
                </View>
                <View style={{flex: 4, backgroundColor: '#fff'}}>
                    <Container>
                        <Content style={{marginTop: 10}}>
                            <ListItem icon onPress={this.password}>
                                <Left>
                                    <Button>
                                        <Icon active name="key" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text>KATA SANDI</Text>
                                </Body>
                            </ListItem>
                            <ListItem icon onPress={this.signOut}>
                                <Left>
                                    <Button>
                                        <Icon active name="log-out" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text>KELUAR</Text>
                                </Body>
                            </ListItem>
                        </Content>
                    </Container>
                </View>
            </View>
        )
    }
}