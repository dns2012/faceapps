import React, { Component } from 'react';

import {Modal, TouchableHighlight, View, Alert} from 'react-native';

import { Container, Icon, Text, Button, Thumbnail, Spinner } from 'native-base';

import ImagePicker from 'react-native-image-picker';

const options = {};

class Present extends Component {
    constructor() {
        super();
        this.state = {
            modalVisible: false,
        }
        this.alert = this.alert.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    alert() {
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setModalVisible(true);
                const form = new FormData();
                form.append('image', {
                    name : response.fileName,
                    type: response.type,
                    uri : response.uri
                });
                fetch("http://117.53.47.77:3000/present", {
                    method: "POST",
                    body: form
                })
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    if(response.Distance) {
                        this.setModalVisible(false);
                        this.props.navigation.navigate('Login', response)
                    } else {
                        Alert.alert(
                            "Not recognized !",
                            "You are not registered",
                            [
                                {text: 'GOT IT', onPress: () => this.setModalVisible(false)},
                            ]
                        )
                    }
                    
                }).catch(error => {
                    console.log(error)
                    Alert.alert(
                        "Not recognized !",
                        "Make sure you are capturing face",
                        [
                            {text: 'GOT IT', onPress: () => this.setModalVisible(false)},
                        ]
                    )
                })
            }
        });
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
                                <Text>Rendering...</Text>
                            </View>
                        </View>
                    </Modal>
                </View>
            </Container>
        )
    }
}

export default Present;