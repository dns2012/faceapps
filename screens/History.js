import React, { Component } from 'react';

import { BackHandler } from 'react-native';

import { Root, Container, Header, Body, Title, Content, List, ListItem, Left, Right, Footer, FooterTab, Button, Icon, Text, Drawer, Toast } from 'native-base';

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
    this.goFriends = this.goFriends.bind(this);
  }

  openDrawer = () => { this.drawer._root.open() };

  goProfile() {
    this.props.navigation.navigate("Profile");
  }

  goFriends() {
    this.props.navigation.navigate("Friends", {
      name : this.state.name,
      username : this.state.username,
      image : this.state.image
    });
  }

  componentDidMount() {
    let which = this;
    SharedPreferences.getItem("userId", function(value) {
      let userId = parseInt(value);
      fetch("http://117.53.47.77:3000/present/user/" + userId, {
          method: "GET"
      })
      .then(response => response.json())
      .then(response => {
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
                {this.state.present.map((present, key) => 
                  <ListItem key={present.id}>
                    <Body>
                      <Text>{present.created_at}</Text>
                      <Text note>Your face accuration : {present.similiar}%</Text>
                    </Body>
                    <Right>
                      <Text note>VALID</Text>
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
        </Root>
      </Drawer>
    );
  }
}