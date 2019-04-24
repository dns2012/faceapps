import React, { Component } from 'react';

import { View, Alert } from 'react-native';

import { Container, Icon, Text, Button, Thumbnail } from 'native-base';

class Present extends Component {
    alert() {
        console.log('oke');
    }
    render() {
        return(
            <Container>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 15, backgroundColor: "#fff"}}>
                    <Thumbnail large square source={{uri: "https://www.shareicon.net/data/512x512/2015/11/07/668308_contacts_512x512.png"}} />
                    <Button bordered block primary rounded iconLeft onPress={this.alert}>
                        <Icon name='person' />
                        <Text>PRESENT TODAY</Text>
                    </Button>
                    <Text style={{marginTop: 10}}>
                        Tap button above to capture your face !
                    </Text>
                </View>
            </Container>
        )
    }
}

export default Present;