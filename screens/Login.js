import React, { Component } from 'react';

import { Alert } from 'react-native';

import { Container, Header, Body, Left, Right, List, ListItem, Thumbnail, Title, Content, Form, Item, Input, Label, Button, Text} from 'native-base';

import md5 from 'md5';

import SharedPreferences from 'react-native-shared-preferences';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thumbnail : "default.png",
            password : "",
            required : "none",
            distance : 0,
            name : ""
        }
        this.submitLogin = this.submitLogin.bind(this);
        this.goForget = this.goForget.bind(this);
    }

    componentDidMount() {
        this.setState({
            thumbnail : "http://117.53.47.77:3000/upload/" + this.props.navigation.state.params.Profile.image,
            distance : this.props.navigation.state.params.Distance,
            name : this.props.navigation.state.params.Profile.name
        })
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
            let password = md5(this.state.password);
            if(password == this.props.navigation.state.params.Profile.password) {
                let userId = this.props.navigation.state.params.Profile.id.toString();
                SharedPreferences.setItem("userId", userId);
                const form_present = {
                    userId : userId,
                    image : this.props.navigation.state.params.Image,
                    similiar : this.props.navigation.state.params.Distance,
                    latitude : this.props.navigation.state.params.Latitude,
                    longitude : this.props.navigation.state.params.Longitude
                }
                fetch("http://117.53.47.77:3000/present/add", {
                    method: "POST",
                    body: JSON.stringify(form_present),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
                
                this.props.navigation.navigate('Profile')
            } else {
                Alert.alert(
                    "Alert",
                    "Wrong password !",
                    [
                        {text: 'OK', onPress: () => ""},
                    ],
                    {cancelable: true},
                )
            }
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
                            <Text>{this.state.name}</Text>
                            <Text note numberOfLines={1}>Accuration : {this.state.distance}%</Text>
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