import React, { Component } from 'react';

import { Alert } from 'react-native';

import { Root, Container, Header, Body, Left, Icon, Title, Content, Form, Item, Input, Label, Button, Text, Toast } from 'native-base';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email : ""
    }
    this.submitEmail = this.submitEmail.bind(this);
    this.goLogin = this.goLogin.bind(this);
  }

  goLogin() {
    this.props.navigation.navigate('Login')
  }

  submitEmail() {
      if(!this.state.email) {
          Toast.show({
              text: "Email tidak boleh kosong !",
              type: "danger",
              position: "top"
          })
      } else {
          Alert.alert(
            "Pemberitahuan",
            "Kata sandi baru telah dikirim melalui email",
            [
              {text: 'GOT IT', onPress: () => this.props.navigation.navigate("Login")},
            ]
          )
      }
  }

  render() {
    return (
      <Root>
          <Container>
            <Header>
                <Left>
                  <Button onPress={this.goLogin} transparent>
                      <Icon name='arrow-back' />
                  </Button>
                </Left>
                <Body>
                    <Title>Atur Kata Sandi</Title>
                </Body>
            </Header>
            <Content>
                <Form>
                    <Item stackedLabel>
                        <Label>Email</Label>
                        <Input onChangeText={(text) => this.setState({email: text})}/>
                    </Item>
                </Form>
                <Button onPress={this.submitEmail} block danger rounded style={{marginTop: 10, marginLeft: 10, marginRight: 10}}>
                    <Text>KIRIM EMAIL</Text>
                </Button>
                <Text style={{alignSelf: "center", marginTop: 10, marginRight: 10}}>
                    Harap memasukkan email yang telah terdaftar
                </Text>
            </Content>
          </Container>
      </Root>
      
    );
  }
}