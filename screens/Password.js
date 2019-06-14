import React, { Component } from 'react';

import { BackHandler, Alert} from 'react-native';

import { Root, Container, Header, Left, Body, Right, Title, Content, Thumbnail, Form, Item, Label, Input, Textarea, Footer, FooterTab, Button, Icon, Text, Drawer, Toast, Spinner } from 'native-base';

import SharedPreferences from 'react-native-shared-preferences';

import md5 from 'md5';

export default class Password extends Component {

  constructor() {
    super();
    this.state = {
      backed : 0,
      userId : 0,
      oldPassword : "",
      oldConfirm : "",
      newPassword : "",
      newConfirm : ""
    }
    this.submitProfile = this.submitProfile.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    let which = this;
    SharedPreferences.getItem("userId", function(value) {
      let userId = parseInt(value);
      fetch("http://117.53.47.77:3000/profile/" + userId, {
          method: "GET"
      })
      .then(response => response.json())
      .then(response => {
        which.setState({
          userId : response.Profile.id,
          oldPassword : response.Profile.password
        })
      })
      .catch(error => {
        console.log(error)
      })
    })
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

  submitProfile() {
    let newPassword = this.state.newPassword;
    let newConfirm = this.state.newConfirm;
    let oldPassword = this.state.oldPassword;
    let oldConfirm = this.state.oldConfirm;
    let arrayStateValue = [newPassword, newConfirm, oldConfirm];
    let arrayStateLabel = ["Kata sandi baru tidak boleh kosong", "Konfirmasi kata sandi baru tidak boleh kosong", "Kata sandi lama tidak boleh kosong"]
    let arrayStateWatch = 0;
    for(var i in arrayStateValue) {
        if(arrayStateValue[i] === "") {
            Alert.alert(
                "Peringatan",
                arrayStateLabel[i],
                [
                    {text: 'OK', onPress: () => ""},
                ],
                {cancelable: true},
            )
            arrayStateWatch += 1;
            break;
        }
    }
    if(arrayStateWatch === 0) {
        if(newPassword === newConfirm) {
            if(oldPassword === md5(oldConfirm)) {
                const form_password = {
                    password : md5(newPassword)
                }
                fetch("http://117.53.47.77:3000/profile/password/" + this.state.userId, {
                    method: "PUT",
                    body: JSON.stringify(form_password),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(response => response.json())
                .then(response => {
                    if(response.message == "completed") {
                        Alert.alert(
                            "Pemberitahuan",
                            "Kata sandi berhasil dirubah",
                            [
                                {text: 'OK', onPress: () => this.props.navigation.navigate("Profile")},
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
                    "Peringatan",
                    "Kata sandi lama salah",
                    [
                        {text: 'OK', onPress: () => ""},
                    ],
                    {cancelable: true},
                )
            }
        } else {
            Alert.alert(
                "Peringatan",
                "Konfirmasi kata sandi baru tidak sama",
                [
                    {text: 'OK', onPress: () => ""},
                ],
                {cancelable: true},
            )
        }
    } else {
        console.log("stuck");
    }
  }

  goBack() {
      this.props.navigation.goBack();
  }

  render() {
    return (
        <Root>
          <Container>
            <Header>
                <Left>
                  <Button onPress={this.goBack} transparent>
                    <Icon name='arrow-back' />
                  </Button>
                </Left>
                <Body>
                    <Title>UBAH KATA SANDI</Title>
                </Body>
            </Header>
            <Content>
              <Form>
                <Item inlineLabel>
                  <Label>Kata Sandi Baru</Label>
                  <Input secureTextEntry={true} onChangeText={(text) => this.setState({newPassword: text})}/>
                </Item>
                <Item inlineLabel>
                  <Label>Konfirmasi Ulang</Label>
                  <Input secureTextEntry={true} onChangeText={(text) => this.setState({newConfirm: text})}/>
                </Item>
                <Item inlineLabel>
                  <Label>Kata Sandi Lama</Label>
                  <Input secureTextEntry={true} onChangeText={(text) => this.setState({oldConfirm: text})}/>
                </Item>
                <Button onPress={this.submitProfile} block primary rounded style={{marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 50}}>
                    <Text>SIMPAN</Text>
                </Button>
              </Form>
            </Content>
          </Container>
        </Root>
    );
  }
}