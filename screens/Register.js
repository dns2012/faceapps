import React, { Component } from 'react';

import { BackHandler, Alert, Modal, View } from 'react-native';

import { Root, Container, H1, Content, Thumbnail, Form, Item, Label, Input, Textarea, Footer, FooterTab, Button, Icon, Text, Drawer, Toast, Spinner } from 'native-base';

import md5 from 'md5';

import ImagePicker from 'react-native-image-picker';

const options = {};

export default class Register extends Component {

  constructor() {
    super();
    this.state = {
      backed : 0,
      name  : "",
      email : "",
      username  : "",
      password : "",
      phone : "",
      address : "",
      image : "",
      defaulImage : "default-user.png",
      modalVisible: false,
    }
    this.submitProfile = this.submitProfile.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  componentDidMount() {
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

  submitProfile() {
    const form = {
      name : this.state.name,
      email : this.state.email,
      username : this.state.username,
      password : md5(this.state.password),
      phone : this.state.phone,
      address : this.state.address,
      image : this.state.image
    }

    let arrayStateValue = [this.state.image, this.state.name, this.state.email, this.state.username, this.state.password, this.state.phone, this.state.address];
    let arrayStateLabel = ["Image", "Name", "Email", "Username", "Password", "Phone", "Address"];
    var arrayStateWatch = 0;
    for(var i in arrayStateValue) {
        if(arrayStateValue[i] === "") {
            Alert.alert(
                "Warning",
                arrayStateLabel[i] + " is required !",
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
      fetch("http://117.53.47.77:3000/profile", {
          method: "POST",
          body: JSON.stringify(form),
          headers: { 'Content-Type': 'application/json' },
      })
      .then(response => response.json())
      .then(response => {
          if(response.message === "completed") {
            Alert.alert(
                "Notification",
                "Registered successfully !",
                [
                    {text: 'OK', onPress: () => this.props.navigation.navigate("Present")},
                ],
                {cancelable: true},
            )
          } else {
            Alert.alert(
                "Warning",
                "User already registered !",
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
        console.log("stuck");
    }
  }

  changeImage() {
    ImagePicker.showImagePicker(options, (response) => {
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
        fetch("http://117.53.47.77:3000/image/verify", {
            method: "POST",
            body: form
        })
        .then(response => response.json())
        .then(response => {
            if(response.status === 1) {
              this.setState({
                image : response.image
              })
            } else {
              Alert.alert(
                  "Warning",
                  "Failed capturing face, try again !",
                  [
                      {text: 'OK', onPress: () => ""},
                  ],
                  {cancelable: true},
              )
            }
            this.setModalVisible(false);
        }).catch(error => {
            console.log(error)
        })
      }
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  
  
  render() {
    return (
        <Root>
          <Container>
            <Content>
              <H1 style={{alignSelf:"center", marginTop: 20, color: "#3F51B5"}}>REGISTER</H1>
              {this.state.image ?
                <Thumbnail large source={{uri: "http://117.53.47.77:3000/static/upload/" + this.state.image}} style={{alignSelf: "center", marginTop: 20, width: 150, height: 150, borderRadius: 100, borderWidth: 1, borderColor: "#eee"}} />
                :
                <Thumbnail large source={{uri: "http://117.53.47.77:3000/static/upload/" + this.state.defaulImage}} style={{alignSelf: "center", marginTop: 20, width: 150, height: 150, borderRadius: 100, borderWidth: 1, borderColor: "#eee"}} />
              }
              
              <Icon name='camera' style={{alignSelf: "center", fontSize: 40, color: "#3F51B5"}} onPress={this.changeImage}/>
              <Form>
                <Item inlineLabel>
                  <Label>Name</Label>
                  <Input value={this.state.name} onChangeText={(text) => this.setState({name: text})}/>
                </Item>
                <Item inlineLabel>
                  <Label>Email</Label>
                  <Input value={this.state.email} onChangeText={(text) => this.setState({email: text})}/>
                </Item>
                <Item inlineLabel>
                  <Label>Username</Label>
                  <Input value={this.state.username} onChangeText={(text) => this.setState({username: text})}/>
                </Item>
                <Item inlineLabel>
                  <Label>Password</Label>
                  <Input value={this.state.password} secureTextEntry={true} onChangeText={(text) => this.setState({password: text})}/>
                </Item>
                <Item inlineLabel>
                  <Label>Phone</Label>
                  <Input keyboardType="numeric" value={this.state.phone} onChangeText={(text) => this.setState({phone: text})}/>
                </Item>
                <Textarea rowSpan={5} bordered placeholder="Address" style={{marginLeft: 14}} value={this.state.address} onChangeText={(text) => this.setState({address: text})}/>
                <Button onPress={this.submitProfile} block primary rounded style={{marginTop: 10, marginLeft: 10, marginRight: 10}}>
                    <Text>SUBMIT</Text>
                </Button>
                <Button onPress={() => {this.props.navigation.navigate("Present")}} block light rounded style={{marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 50}}>
                    <Text>CANCEL</Text>
                </Button>
              </Form>
            </Content>
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
                          <Text>Verifying...</Text>
                      </View>
                  </View>
            </Modal>
          </Container>
        </Root>
    );
  }
}