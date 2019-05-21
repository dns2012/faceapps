import React, { Component } from 'react';

import { Image, Alert, View, StyleSheet } from 'react-native';

import { Container, Header, Body, Left, Card, CardItem, Thumbnail, Title, Button, Icon,  Content, Text } from 'native-base';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 300,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        position: 'absolute'
    },
});

export default class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presentId : props.navigation.state.params.presentId,
            name : "",
            accuration : 0,
            latitude : 0,
            longitude : 0,
            userimage : "",
            created : ""
        }
        this.goFriends = this.goFriends.bind(this);
    }
    
    goFriends() {
        this.props.navigation.navigate("Friends");
    }

    componentWillMount() {
        fetch("http://117.53.47.77:3000/present/" + this.state.presentId, {
            method: "GET"
        })
        .then(response => response.json())
        .then(response => {
            this.setState({
                name : response.Present.name,
                accuration : response.Present.similiar,
                latitude : parseFloat(response.Present.latitude),
                longitude : parseFloat(response.Present.longitude),
                userimage : response.Present.userimage,
                created : response.Present.created_at
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button onPress={this.goFriends} transparent>
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
                                <Thumbnail source={{uri: "http://117.53.47.77:3000/upload/" + this.state.userimage}} />
                                <Body>
                                    <Text>{this.state.name}</Text>
                                    <Text note>{this.state.created}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body style={styles.container}>
                                <MapView
                                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                    style={styles.map}
                                    region={{
                                        latitude: this.state.latitude,
                                        longitude: this.state.longitude,
                                        latitudeDelta: 1,
                                        longitudeDelta: 0,
                                    }}
                                    >
                                         <Marker
                                            coordinate={{
                                                latitude: this.state.latitude,
                                                longitude: this.state.longitude
                                            }}
                                            title="My mark"
                                            description="My mark desc"
                                        />
                                </MapView>
                            </Body>
                        </CardItem>
                    </Card>
                    <View>
                        <Text>
                            Face accuration : {this.state.accuration}%
                        </Text>
                        <Text>
                            Latitude : {this.state.latitude}
                        </Text>
                        <Text>
                            Longitude : {this.state.longitude}
                        </Text>
                    </View>
                </Content>
            </Container>
        );
    }
}