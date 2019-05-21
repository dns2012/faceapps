import React, { Component } from 'react';

import {Modal, TouchableHighlight, View, Alert} from 'react-native';

import { Container, Icon, Text, Button, Thumbnail, Spinner } from 'native-base';

import SharedPreferences from 'react-native-shared-preferences';

class Start extends Component {
    constructor() {
        super();
        this.state = {
            modalVisible: true,
        }
    }

    componentDidMount() {
        let which = this;
        SharedPreferences.getItem("userId", function(value) {
            if(value) {
                which.setState({
                    modalVisible : false
                })
                which.props.navigation.navigate('Profile')
            } else {
                which.setState({
                    modalVisible : false
                })
                which.props.navigation.navigate('Present')
            }
        })
    }

    render() {
        return(
            <Container>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 15, backgroundColor: "#fff"}}>
                    <Modal
                    animationType="none"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 15, backgroundColor: "#fafafa", opacity: 0.5}}>
                            <View>
                                <Spinner color='blue' />
                                <Text>Loading...</Text>
                            </View>
                        </View>
                    </Modal>
                </View>
            </Container>
        )
    }
}

export default Start;