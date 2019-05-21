import React, { Component } from 'react';

import { BackHandler } from 'react-native';

import { Root, Container, Header, Body, Title, Content, List, ListItem, Thumbnail, Left, Right, Footer, FooterTab, Button, Icon, Text, Drawer, Toast } from 'native-base';

import Sidebar from '../components/Sidebar';

import SharedPreferences from 'react-native-shared-preferences';

export default class History extends Component {

    constructor(props) {
        super(props);
        this.state = {
            backed : 0,
            present : [],
            name : props.navigation.state.params.name,
            username : props.navigation.state.params.username,
            image : props.navigation.state.params.image
        }
        this.goProfile = this.goProfile.bind(this);
        this.goHistory = this.goHistory.bind(this);
        this.goLocation = this.goLocation.bind(this);
    }

    openDrawer = () => { this.drawer._root.open() };
    
    goProfile() {
        this.props.navigation.navigate("Profile");
    }

    goHistory() {
        this.props.navigation.navigate("History", {
            name : this.state.name,
            username : this.state.username,
            image : this.state.image
        });
    }

    goLocation(id) {
        let obj = {
            presentId : id
        }
        this.props.navigation.navigate("Location", obj);
    }

    componentDidMount() {
        let which = this;
        SharedPreferences.getItem("userId", function(value) {
            let userId = parseInt(value);
            fetch("http://117.53.47.77:3000/present/friends/" + userId, {
                method: "GET"
            })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                which.setState({
                    present : response.Present
                })
            })
            .catch(error => {
                console.log(error)
            })
        })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    
    handleBackPress = () => {
        let backed = this.state.backed + 1;
        if(backed == 1) {
            this.setState({
                backed : backed
            })
            Toast.show({
                text: "Press back again to exit.",
                type: "default",
                position: "bottom"
            })
            setTimeout(() => {
                this.setState({
                    backed : 0
                })
            }, 3000);
        } else if(backed == 2) {
            BackHandler.exitApp();
        }
        return true;
    }

    render() {
        return (
            <Drawer ref={(ref) => { this.drawer = ref; }} content={<Sidebar navigation={this.props.navigation} name={this.state.name} username={this.state.username} image={this.state.image}/>} >
                <Root>
                    <Container>
                        <Header>
                            <Left>
                                <Button onPress={this.openDrawer} transparent>
                                <Icon name='menu' />
                                </Button>
                            </Left>
                            <Body>
                                <Title>MY FRIENDS</Title>
                            </Body>
                            <Right>
                                <Button transparent>
                                <Text></Text>
                                </Button>
                            </Right>
                        </Header>
                        <Content>
                        <List>
                            {this.state.present.map((present, key) => 
                                <ListItem thumbnail key={present.id}>
                                    <Left>
                                        <Thumbnail square source={{ uri: "http://117.53.47.77:3000/upload/" + present.userimage }} />
                                    </Left>
                                    <Body>
                                        <Text>{present.name}</Text>
                                        <Text note numberOfLines={1}>{present.created_at}</Text>
                                    </Body>
                                    <Right>
                                        <Button onPress={()=> this.goLocation(present.id)} transparent>
                                        <Text>View</Text>
                                        </Button>
                                    </Right>
                                </ListItem>
                            )}
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
                </Root>
            </Drawer>
        );
    }
}