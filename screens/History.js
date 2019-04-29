import React, { Component } from 'react';

import { Container, Header, Body, Title, Content, List, ListItem, Left, Right, Footer, FooterTab, Button, Icon, Text, Drawer } from 'native-base';

import Sidebar from '../components/Sidebar';

export default class History extends Component {

  constructor() {
    super();
    this.goProfile = this.goProfile.bind(this);
    this.goFriends = this.goFriends.bind(this);
  }

  openDrawer = () => { this.drawer._root.open() };

  goProfile() {
    this.props.navigation.navigate("Profile");
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
                  <Title>MY HISTORY</Title>
              </Body>
              <Right>
                <Button transparent>
                  <Text></Text>
                </Button>
              </Right>
          </Header>
          <Content>
          <List>
              <ListItem>
                <Body>
                  <Text>2019-04-23</Text>
                  <Text note>Your face accuration : 69%</Text>
                </Body>
                <Right>
                  <Text note>06:09 pm</Text>
                </Right>
              </ListItem>
              <ListItem>
                <Body>
                  <Text>2019-04-23</Text>
                  <Text note>Your face accuration : 69%</Text>
                </Body>
                <Right>
                  <Text note>06:09 pm</Text>
                </Right>
              </ListItem>
              <ListItem>
                <Body>
                  <Text>2019-04-23</Text>
                  <Text note>Your face accuration : 69%</Text>
                </Body>
                <Right>
                  <Text note>06:09 pm</Text>
                </Right>
              </ListItem>
              <ListItem>
                <Body>
                  <Text>2019-04-23</Text>
                  <Text note>Your face accuration : 69%</Text>
                </Body>
                <Right>
                  <Text note>06:09 pm</Text>
                </Right>
              </ListItem>
              <ListItem>
                <Body>
                  <Text>2019-04-23</Text>
                  <Text note>Your face accuration : 69%</Text>
                </Body>
                <Right>
                  <Text note>06:09 pm</Text>
                </Right>
              </ListItem>
              <ListItem>
                <Body>
                  <Text>2019-04-23</Text>
                  <Text note>Your face accuration : 69%</Text>
                </Body>
                <Right>
                  <Text note>06:09 pm</Text>
                </Right>
              </ListItem>
            </List>
          </Content>
          <Footer>
            <FooterTab>
              <Button onPress={this.goProfile} vertical>
                <Icon name="person" />
                <Text>Profile</Text>
              </Button>
              <Button active vertical>
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