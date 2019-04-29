import React, { Component } from 'react';

import { Container, Header, Left, Body, Right, Title, Content, Thumbnail, Form, Item, Label, Input, Textarea, Footer, FooterTab, Button, Icon, Text, Drawer } from 'native-base';

import Sidebar from '../components/Sidebar';

export default class Profile extends Component {

  constructor() {
    super();
    this.goHistory = this.goHistory.bind(this);
    this.goFriends = this.goFriends.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
  }

  openDrawer = () => { this.drawer._root.open() };

  goHistory() {
    this.props.navigation.navigate("History");
  }

  goFriends() {
    this.props.navigation.navigate("Friends");
  }
  
  
  render() {
    return (
      <Drawer ref={(ref) => { this.drawer = ref; }} content={<Sidebar navigation={this.props.navigation}/>} >
        <Container>
          <Header>
              <Left>
                <Button onPress={this.openDrawer} transparent>
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                  <Title>MY PROFILE</Title>
              </Body>
              <Right>
                <Button transparent>
                  <Text></Text>
                </Button>
              </Right>
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
              <Button onPress={this.goHistory} vertical>
                <Icon name="paper" />
                <Text>History</Text>
              </Button>
              <Button onPress={this.goFriends} vertical>
                <Icon name="compass" />
                <Text>Friends</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </Drawer>
    );
  }
}