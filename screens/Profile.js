import React, { Component } from 'react';

import { BackHandler, Alert, Modal, View } from 'react-native';

import { Root, Container, Header, Left, Body, Right, Title, Content, Thumbnail, Form, Item, Label, Input, Textarea, Footer, FooterTab, Button, Icon, Text, Drawer, Toast, Spinner } from 'native-base';

import Sidebar from '../components/Sidebar';

import SharedPreferences from 'react-native-shared-preferences';

import ImagePicker from 'react-native-image-picker';

const options = {};

export default class Profile extends Component {

  constructor() {
    super();
    this.state = {
      backed : 0,
      userId : 0,
      name  : "",
      email : "",
      username  : "",
      phone : "",
      address : "",
      image : "",
      modalVisible: false,
    }
    this.goHistory = this.goHistory.bind(this);
    this.goFriends = this.goFriends.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.submitProfile = this.submitProfile.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  openDrawer = () => { this.drawer._root.open() };

  goHistory() {
    this.props.navigation.navigate("History", {
      name : this.state.name,
      username : this.state.username,
      image : this.state.image
    });
  }

  goFriends() {
    this.props.navigation.navigate("Friends", {
      name : this.state.name,
      username : this.state.username,
      image : this.state.image
    });
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
          name : response.Profile.name,
          email : response.Profile.email,
          username : response.Profile.username,
          phone : response.Profile.phone.toString(),
          address : response.Profile.address,
          image : response.Profile.image
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
    const form = {
      name : this.state.name,
      email : this.state.email,
      username : this.state.username,
      phone : this.state.phone,
      address : this.state.address
    }
    console.log(form)
    fetch("http://117.53.47.77:3000/profile/" + this.state.userId, {
        method: "PUT",
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(response => {
      if(response.message == "completed") {
        Alert.alert(
            "Pemberitahuan",
            "Edit profil berhasil",
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
        fetch("http://117.53.47.77:3000/profile/photo/" + this.state.userId, {
            method: "PUT",
            body: form
        })
        .then(response => response.json())
        .then(response => {
            this.setState({
              image : response.image
            })
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
      <Drawer ref={(ref) => { this.drawer = ref; }} content={<Sidebar navigation={this.props.navigation} image={this.state.image} name={this.state.name} username={this.state.username}/>} >
        <Root>
          <Container>
            <Header>
                <Left>
                  <Button onPress={this.openDrawer} transparent>
                    <Icon name='menu' />
                  </Button>
                </Left>
                <Body>
                    <Title>PROFIL</Title>
                </Body>
                <Right>
                  <Button transparent>
                    <Text></Text>
                  </Button>
                </Right>
            </Header>
            <Content>
              <Thumbnail large source={{uri: "http://117.53.47.77:3000/static/upload/" + this.state.image}} style={{alignSelf: "center", marginTop: 20, width: 150, height: 150, borderRadius: 100, borderWidth: 1, borderColor: "#eee"}} />
              <Icon name='camera' style={{alignSelf: "center", fontSize: 40, color: "#808080"}} onPress={this.changeImage}/>
              <Form>
                <Item inlineLabel>
                  <Label>Nama Lengkap</Label>
                  <Input value={this.state.name} onChangeText={(text) => this.setState({name: text})}/>
                </Item>
                <Item inlineLabel>
                  <Label>Email</Label>
                  <Input value={this.state.email} onChangeText={(text) => this.setState({email: text})}/>
                </Item>
                <Item inlineLabel>
                  <Label>Nama Pengguna</Label>
                  <Input value={this.state.username} onChangeText={(text) => this.setState({username: text})}/>
                </Item>
                <Item inlineLabel>
                  <Label>No.HP/Telepon</Label>
                  <Input keyboardType="numeric" value={this.state.phone} onChangeText={(text) => this.setState({phone: text})}/>
                </Item>
                <Textarea rowSpan={5} bordered placeholder="Alamat" style={{marginLeft: 14}} value={this.state.address} onChangeText={(text) => this.setState({address: text})}/>
                <Button onPress={this.submitProfile} block primary rounded style={{marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 50}}>
                    <Text>SIMPAN</Text>
                </Button>
              </Form>
            </Content>
            <Footer>
              <FooterTab>
                <Button active vertical>
                  <Icon name="person" />
                  <Text>Profil</Text>
                </Button>
                <Button onPress={this.goHistory} vertical>
                  <Icon name="paper" />
                  <Text>Riwayat</Text>
                </Button>
                <Button onPress={this.goFriends} vertical>
                  <Icon name="compass" />
                  <Text>Teman</Text>
                </Button>
              </FooterTab>
            </Footer>
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
                          <Text>Mengupload...</Text>
                      </View>
                  </View>
            </Modal>
          </Container>
        </Root>
      </Drawer>
    );
  }
}