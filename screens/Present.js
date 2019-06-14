import React, { Component } from 'react';

import {Modal, View, Alert, BackHandler} from 'react-native';

import { Root, Container, Icon, Text, Button, Thumbnail, Spinner, Toast, Form, Item, Label, Input } from 'native-base';

import ImagePicker from 'react-native-image-picker';

const options = {};

class Present extends Component {
    constructor() {
        super();
        this.state = {
            modalVisible : false,
            backed : 0,
            latitude : "",
            longitude : "",
            username : ""
        }
        this.present = this.present.bind(this);
        this.checkUser = this.checkUser.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    checkUser() {
        if(this.state.username) {
            let form = {
                username : this.state.username
            }
            fetch("http://117.53.47.77:3000/profile/username", {
                method: "POST",
                body: JSON.stringify(form),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => response.json())
            .then(response => {
                if(response.message === "registered") {
                    this.present(response.profile.id)
                } else {
                    Alert.alert(
                        "Warning",
                        "User not found !",
                        [
                            {text: 'OK', onPress: () => ""},
                        ],
                        {cancelable: true},
                    )
                }
            })
            .catch(error => {
                console.log(error)
            })
        } else {
            Alert.alert(
                "Warning",
                "Username is required !",
                [
                    {text: 'OK', onPress: () => ""},
                ],
                {cancelable: true},
            )
        }
    }

    present(id) {
        ImagePicker.launchCamera(options, (response) => {
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
                fetch("http://117.53.47.77:3000/present/" + id, {
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
                        this.setModalVisible(false);
                        this.props.navigation.navigate('Login', response)
                    } else {
                        Alert.alert(
                            "Warning",
                            "You are not registered !",
                            [
                                {text: 'GOT IT', onPress: () => this.setModalVisible(false)},
                            ]
                        )
                    }
                    
                }).catch(error => {
                    console.log(error)
                    Alert.alert(
                        "Warning",
                        "Make sure you are capturing face !",
                        [
                            {text: 'GOT IT', onPress: () => this.setModalVisible(false)},
                        ]
                    )
                })
            }
        });
    }

    componentWillMount() {
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
                text: "Tekan lagi untuk keluar.",
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
                        <Item inlineLabel style={{marginBottom: 10}} bordered rounded>
                            <Input value={this.state.username} onChangeText={(text) => this.setState({username: text})} placeholder="Nama Pengguna" style={{textAlign: "center"}} />
                        </Item>
                        <Button bordered block primary rounded iconLeft onPress={this.checkUser}>
                            <Icon name='person' />
                            <Text>ABSEN SEKARANG</Text>
                        </Button>
                        <Text style={{marginTop: 10}}>
                            Belum punya akun? <Text style={{textDecorationLine: "underline", color: "#3F51B5"}} onPress={() => {this.props.navigation.navigate("Register")}}>Daftar</Text>
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
                                    <Text>Merender...</Text>
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