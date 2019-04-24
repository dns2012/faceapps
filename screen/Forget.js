import React, { Component } from 'react';
import { Container, Header, Body, Title, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
export default class Login extends Component {
  render() {
    return (
      <Container>
        <Header>
            <Body style={{alignItems: "center"}}>
                <Title>Reset Password</Title>
            </Body>
        </Header>
        <Content>
            <Form>
                <Item stackedLabel>
                    <Label>Email</Label>
                    <Input />
                </Item>
            </Form>
            <Button block danger rounded style={{marginTop: 10, marginLeft: 10, marginRight: 10}}>
                <Text>SEND EMAIL</Text>
            </Button>
            <Text style={{alignSelf: "center", marginTop: 10, marginRight: 10}}>
                Please enter your registered email
            </Text>
        </Content>
      </Container>
    );
  }
}