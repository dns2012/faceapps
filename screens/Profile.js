import React, { Component } from 'react';
import { Container, Header, Body, Title, Content, Thumbnail, Form, Item, Label, Input, Textarea, Footer, FooterTab, Button, Icon, Text } from 'native-base';
export default class Profile extends Component {
  render() {
    return (
      <Container>
        <Header>
            <Body style={{alignItems: "center"}}>
                <Title>Dashboard</Title>
            </Body>
        </Header>
        <Content>
          <Thumbnail large source={{uri: 'https://purepng.com/public/uploads/large/purepng.com-thinking-manthinking-manpersongentle-men-thinkingthinking-brain-1421526976436cflxw.png'}} style={{alignSelf: "center", marginTop: 20, width: 150, height: 150, borderRadius: 100, borderWidth: 1, borderColor: "#eee"}} />
          <Icon name='camera' style={{alignSelf: "center", fontSize: 40, color: "#3F51B5"}}/>
          <Form>
            <Item inlineLabel>
              <Label>Name</Label>
              <Input />
            </Item>
            <Item inlineLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item inlineLabel>
              <Label>Phone</Label>
              <Input />
            </Item>
            <Textarea rowSpan={5} bordered placeholder="Address" style={{marginLeft: 14}} />
            <Button block primary rounded style={{marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 50}}>
                <Text>SAVE</Text>
            </Button>
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button active vertical>
              <Icon name="person" />
              <Text>Profile</Text>
            </Button>
            <Button vertical>
              <Icon name="paper" />
              <Text>History</Text>
            </Button>
            <Button vertical>
              <Icon name="compass" />
              <Text>Friends</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}