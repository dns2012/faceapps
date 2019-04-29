import React, { Component } from 'react';

import { View, Alert } from 'react-native';

import { Text, Thumbnail, Container,  Content,  ListItem, Icon, Left, Body, Button } from 'native-base';

export default class Sidebar extends Component {

    constructor() {
        super();
        this.signOut = this.signOut.bind(this);
    }
    
    signOut() {
        Alert.alert(
            "Confirm Box",
            "Sign out now?",
            [
                {text: 'CANCEL', onPress: () => ""},
                {text: 'YES', onPress: () => this.props.navigation.navigate("Present")},
            ],
            {cancelable: true},
        )
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <View style={{flex: 2, justifyContent: "center", alignItems: "center", backgroundColor: '#3F51B5'}}>
                    <Thumbnail source={{uri: 'https://purepng.com/public/uploads/large/purepng.com-thinking-manthinking-manpersongentle-men-thinkingthinking-brain-1421526976436cflxw.png'}} style={{alignSelf: "center", marginTop: 10, width: 100, height: 100, borderRadius: 100, borderWidth: 1, borderColor: "#eee"}} />
                    <Text style={{color: "#fff", fontSize: 20}}>JOHN DOE</Text>
                    <Text style={{color: "#fff", fontSize: 10}}> ~ johndoe21</Text>
                </View>
                <View style={{flex: 4, backgroundColor: '#fff'}}>
                    <Container>
                        <Content style={{marginTop: 10}}>
                            <ListItem icon onPress={this.signOut}>
                                <Left>
                                    <Button>
                                        <Icon active name="log-out" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text>SIGN OUT</Text>
                                </Body>
                            </ListItem>
                        </Content>
                    </Container>
                </View>
            </View>
        )
    }
}