import React, { Component } from 'react';
import { Container, Header, Body, Title, Content, List, ListItem, Thumbnail, Left, Right, Footer, FooterTab, Button, Icon, Text } from 'native-base';
export default class History extends Component {

    constructor() {
        super();
        this.goProfile = this.goProfile.bind(this);
        this.goHistory = this.goHistory.bind(this);
        this.goLocation = this.goLocation.bind(this);
    }
    
    goProfile() {
        this.props.navigation.navigate("Profile");
    }

    goHistory() {
        this.props.navigation.navigate("History");
    }

    goLocation() {
        this.props.navigation.navigate("Location");
    }

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
                        <Button onPress={this.goLocation} transparent>
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
                    <Button onPress={this.goProfile} vertical>
                        <Icon name="person" />
                        <Text>Profile</Text>
                    </Button>
                    <Button onPress={this.goHistory} vertical>
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