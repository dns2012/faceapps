import React, { Component } from 'react';

import { Container, Header, Body, Left, Right, List, ListItem, Thumbnail, Title, Content, Form, Item, Input, Label, Button, Text} from 'native-base';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thumbnail : "default.png",
            password : "",
            required : "none"
        }
        this.submitLogin = this.submitLogin.bind(this);
        this.goForget = this.goForget.bind(this);
    }

    componentDidMount() {
        // this.setState({
        //     thumbnail : this.props.navigation.state.params.link
        // })
    }

    submitLogin() {
        this.setState({
            required: "none"
        })
        if(!this.state.password) {
            this.setState({
                required: "flex"
            })
        } else {
            this.props.navigation.navigate('Profile')
        }
    }

    goForget() {
        this.props.navigation.navigate('Forget')
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
                            <Text>John Doe</Text>
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
                            <Input secureTextEntry={true} onChangeText={(text) => this.setState({password: text})} />
                            <Text style={{color: "red", alignSelf: "flex-start", display: this.state.required}}>Password required</Text>
                        </Item>
                        <Button onPress={this.submitLogin} block primary rounded style={{marginTop: 10, marginLeft: 10, marginRight: 10}}>
                            <Text>SIGN IN</Text>
                        </Button>
                    </Form>
                    <Text style={{alignSelf: "center", marginTop: 10}}>
                        OR
                    </Text>
                    <Button onPress={this.goForget} block danger rounded style={{marginTop: 10, marginLeft: 10, marginRight: 10}}>
                        <Text>FORGET PASSWORD</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}