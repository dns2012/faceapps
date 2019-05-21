import React, { Component } from 'react';

import {Modal, TouchableHighlight, View, Alert, BackHandler} from 'react-native';

import { Root, Container, Icon, Text, Button, Thumbnail, Spinner, Toast } from 'native-base';

import ImagePicker from 'react-native-image-picker';

const options = {};

class Present extends Component {
    constructor() {
        super();
        this.state = {
            modalVisible : false,
            backed : 0,
            latitude : "",
            longitude : ""
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
                    if(response.Distance) {
                        let coords = {
                            Latitude : this.state.latitude,
                            Longitude : this.state.longitude
                        }
                        let result = Object.assign(response, coords);
                        console.log(result)
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

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    latitude : position.coords.latitude,
                    longitude : position.coords.longitude
                })
                console.log(position)
            },
            error => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    
    handleBackPress = () => {
        let backed = this.state.backed + 1;
        if(backed == 1) {
            this.setState({
                backed : backed
            })
            Toast.show({
                text: "Press back again to exit.",
                type: "default",
                position: "bottom"
            })
            setTimeout(() => {
            this.setState({
                backed : 0
            })
            }, 3000);
        } else if(backed == 2) {
            BackHandler.exitApp();
        }
        return true;
    }

    render() {
        return(
            <Root>
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
            </Root>
        )
    }
}

export default Present;