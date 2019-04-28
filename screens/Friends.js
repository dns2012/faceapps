import React, { Component } from 'react';
import { Container, Header, Body, Title, Content, List, ListItem, Thumbnail, Left, Right, Footer, FooterTab, Button, Icon, Text } from 'native-base';
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
            <ListItem thumbnail>
                <Left>
                    <Thumbnail square source={{ uri: 'http://www.pngall.com/wp-content/uploads/2016/04/Happy-Person-Free-Download-PNG.png' }} />
                </Left>
                <Body>
                    <Text>Fadilatur</Text>
                    <Text note numberOfLines={1}>2019-03-23 07:20</Text>
                </Body>
                <Right>
                    <Button transparent>
                    <Text>View</Text>
                    </Button>
                </Right>
            </ListItem>
            <ListItem thumbnail>
                <Left>
                    <Thumbnail square source={{ uri: 'http://www.pngall.com/wp-content/uploads/2016/04/Happy-Person-Free-Download-PNG.png' }} />
                </Left>
                <Body>
                    <Text>Fadilatur</Text>
                    <Text note numberOfLines={1}>2019-03-23 07:20</Text>
                </Body>
                <Right>
                    <Button transparent>
                    <Text>View</Text>
                    </Button>
                </Right>
            </ListItem>
            <ListItem thumbnail>
                <Left>
                    <Thumbnail square source={{ uri: 'http://www.pngall.com/wp-content/uploads/2016/04/Happy-Person-Free-Download-PNG.png' }} />
                </Left>
                <Body>
                    <Text>Fadilatur</Text>
                    <Text note numberOfLines={1}>2019-03-23 07:20</Text>
                </Body>
                <Right>
                    <Button transparent>
                    <Text>View</Text>
                    </Button>
                </Right>
            </ListItem>
            <ListItem thumbnail>
                <Left>
                    <Thumbnail square source={{ uri: 'http://www.pngall.com/wp-content/uploads/2016/04/Happy-Person-Free-Download-PNG.png' }} />
                </Left>
                <Body>
                    <Text>Fadilatur</Text>
                    <Text note numberOfLines={1}>2019-03-23 07:20</Text>
                </Body>
                <Right>
                    <Button transparent>
                    <Text>View</Text>
                    </Button>
                </Right>
            </ListItem>
            <ListItem thumbnail>
                <Left>
                    <Thumbnail square source={{ uri: 'http://www.pngall.com/wp-content/uploads/2016/04/Happy-Person-Free-Download-PNG.png' }} />
                </Left>
                <Body>
                    <Text>Fadilatur</Text>
                    <Text note numberOfLines={1}>2019-03-23 07:20</Text>
                </Body>
                <Right>
                    <Button transparent>
                    <Text>View</Text>
                    </Button>
                </Right>
            </ListItem>
            <ListItem thumbnail>
                <Left>
                    <Thumbnail square source={{ uri: 'http://www.pngall.com/wp-content/uploads/2016/04/Happy-Person-Free-Download-PNG.png' }} />
                </Left>
                <Body>
                    <Text>Fadilatur</Text>
                    <Text note numberOfLines={1}>2019-03-23 07:20</Text>
                </Body>
                <Right>
                    <Button transparent>
                    <Text>View</Text>
                    </Button>
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
            <Button vertical>
              <Icon name="paper" />
              <Text>History</Text>
            </Button>
            <Button active vertical>
              <Icon name="compass" />
              <Text>Friends</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}