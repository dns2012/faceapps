import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Body, Left, Card, CardItem, Thumbnail, Title, Button, Icon,  Content, Text } from 'native-base';
export default class Location extends Component {
  render() {
    return (
      <Container>
        <Header>
            <Left>
                <Button transparent>
                    <Icon name='arrow-back' />
                </Button>
            </Left>
            <Body>
                <Title>Location</Title>
            </Body>
        </Header>
        <Content>
            <Card style={{flex: 0}}>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: 'http://www.pngall.com/wp-content/uploads/2016/04/Happy-Person-Free-Download-PNG.png'}} />
                        <Body>
                            <Text>Fadilatur</Text>
                            <Text note>2019-03-23 07:20</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Body>
                        <Image source={{uri: 'https://cmxpv89733.i.lithium.com/t5/image/serverpage/image-id/82937i163CEC7FAC876446/image-size/medium?v=1.0&px=999'}} style={{height: 200, width: '100%', flex: 1}}/>
                        <Text>
                            Face accuration : 75%
                        </Text>
                        <Text>
                            Latitude : -7.7868108
                        </Text>
                        <Text>
                            Longitude : 113.1858074
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        </Content>
      </Container>
    );
  }
}