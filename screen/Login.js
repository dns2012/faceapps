import React, { Component } from 'react';

import { Container, Header, Body, Left, Right, List, ListItem, Thumbnail, Title, Content, Form, Item, Input, Label, Button, Text } from 'native-base';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thumbnail : "default.png"
        }
    }

    componentDidMount() {
        this.setState({
            thumbnail : this.props.navigation.state.params.link
        })
    }

    render() {
        return (
        <Container>
            <Header>
                <Body style={{alignItems: "center"}}>
                    <Title>Face Detected</Title>
                </Body>
            </Header>
            <Content>
                <List>
                    <ListItem thumbnail>
                    <Left>
                        <Thumbnail square source={{ uri: this.state.thumbnail }} />
                    </Left>
                    <Body>
                        <Text>Achmad Rivaldi</Text>
                        <Text note numberOfLines={1}>Accuration : 75%</Text>
                    </Body>
                    <Right>
                        <Button transparent>
                        <Text>DETAIL</Text>
                        </Button>
                    </Right>
                    </ListItem>
                </List>
                <Form>
                    <Item stackedLabel>
                        <Label>Password</Label>
                        <Input />
                    </Item>
                </Form>
                <Button block primary rounded style={{marginTop: 10, marginLeft: 10, marginRight: 10}}>
                    <Text>SIGN IN</Text>
                </Button>
                <Text style={{alignSelf: "center", marginTop: 10}}>
                    OR
                </Text>
                <Button block danger rounded style={{marginTop: 10, marginLeft: 10, marginRight: 10}}>
                    <Text>FORGET PASSWORD</Text>
                </Button>
            </Content>
        </Container>
        );
    }
}