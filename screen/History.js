import React, { Component } from 'react';
import { Container, Header, Body, Title, Content, List, ListItem, Left, Right, Footer, FooterTab, Button, Icon, Text } from 'native-base';
export default class History extends Component {
  render() {
    return (
      <Container>
        <Header>
            <Body style={{alignItems: "center"}}>
                <Title>Dashboard</Title>
            </Body>
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
            <Button vertical>
              <Icon name="person" />
              <Text>Profile</Text>
            </Button>
            <Button active vertical>
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