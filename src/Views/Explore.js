/**
 *
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback
} from 'react-native';
import _ from 'lodash';
import ExploreMap from '../Components/ExploreMap';
import PlaceSelector from '../Components/PlaceSelector';

export default class Explore extends Component {

    static navigationOptions = {
        title: 'Explore'
    };

    places = [
        {
            id: 123,
            name: 'The Lodge',
            thumbnail : 'https://unsplash.it/300/300/?random',
            host : {
                id : 0,
                name : 'King Flippy Nips'
            },
            status : "It's oooon",
            radius : 300,
            score : 15,
            users : [
                {id : 222, name : 'MVB'}
            ],
            location: {
                latitude: 53.380611,
                longitude: -2.946611
            },

        },
        {
            id: 124,
            name: 'Maccies',
            thumbnail : 'https://unsplash.it/300/300/?random',
            host : {
                id : 0,
                name : 'King Flippy Nips'
            },
            status : "It's oooon",
            radius : 300,
            score : 15,
            users : [
                {id : 222, name : 'MVB'}
            ],
            location: {
                latitude: 53.381405,
                longitude: -2.954228
            }
        },
        {
            id: 125,
            name: 'Sefton Park',
            thumbnail : 'https://unsplash.it/300/300/?random',
            host : {
                id : 0,
                name : 'King Flippy Nips'
            },
            status : "It's oooon",
            radius : 300,
            score : 15,
            users : [
                {id : 222, name : 'MVB'}
            ],
            location: {
                latitude: 53.381571,
                longitude: -2.936461
            }
        },
        {
            id: 126,
            name: 'Elevator',
            thumbnail : 'https://unsplash.it/300/300/?random',
            host : {
                id : 0,
                name : 'King Flippy Nips'
            },
            status : "It's oooon",
            radius : 300,
            score : 15,
            users : [
                {id : 222, name : 'MVB'}
            ],
            location: {
                latitude: 53.394359,
                longitude: -2.979548
            }
        },
        {
            id: 127,
            name: 'The Quarter',
            thumbnail : 'https://unsplash.it/300/300/?random',
            host : {
                id : 0,
                name : 'King Flippy Nips'
            },
            status : "It's oooon",
            radius : 300,
            score : 15,
            users : [
                {id : 222, name : 'MVB'}
            ],
            location: {
                latitude: 53.400245,
                longitude: -2.970483
            }
        },
        {
            id: 128,
            name: 'Otterspool Prom',
            thumbnail : 'https://unsplash.it/300/300/?random',
            host : {
                id : 0,
                name : 'King Flippy Nips'
            },
            status : "It's oooon",
            radius : 300,
            score : 15,
            users : [
                {id : 222, name : 'MVB'}
            ],
            location: {
                latitude: 53.369673,
                longitude: -2.934207
            }
        },
        {
            id: 129,
            name: 'St Michael\'s',
            thumbnail : 'https://unsplash.it/300/300/?random',
            host : {
                id : 0,
                name : 'King Flippy Nips'
            },
            status : "It's oooon",
            radius : 300,
            score : 15,
            users : [
                {id : 222, name : 'MVB'}
            ],
            location: {
                latitude: 53.375429,
                longitude: -2.953561
            }
        },
    ];

    registeredPlaces = [];
    placesScrollView = null;

    componentWillMount() {
        this.state = {
            topPlace: null
        }
    }

    componentDidMount() {
        // navigator.geolocation.getCurrentPosition(
        //     (position) => {
        //         let myLocation = {latitude: position.coords.latitude, longitude: position.coords.longitude};
        //         this.setState({myLocation});
        //     },
        //     (error) => alert(JSON.stringify(error)),
        //     {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
        // );
    }


    getTopPlace(scrollPosition) {
        if (scrollPosition < 0) {
            return null;
        }
        else {
            //return this.places[Math.floor(scrollPosition / this.placeHeight)];
            //console.log(this.registeredPlaces);
            const regPlace = _.find(this.registeredPlaces, (place) => {
                return scrollPosition >= place.y && scrollPosition < place.y + place.height
            });
            return regPlace ? regPlace.place : null;

        }
    }

    handleScrollViewScroll = e => {
        const scrollPosition = e.nativeEvent.contentOffset.y;
        const topPlace = this.getTopPlace(scrollPosition);
        if (topPlace) {
            if ((!this.state.topPlace) || (topPlace.id !== this.state.topPlace.id)) {
                this.setState({topPlace: topPlace})
            }
        } else {
            this.setState({topPlace: null})
        }
    }

    scrollToPlace(place) {
        let regPlace = _.find(this.registeredPlaces, {id: place.id})
        this.placesScrollView.scrollTo({y: regPlace.y, animated: false});
    }

    registerPlaceInScrollView(place, layout) {
        this.registeredPlaces.push({
            id: place.id,
            place: place,
            ...layout
        })
    }

    navigateToPlace(place) {
        const {navigate} = this.props.navigation;
        navigate('Place', {place : place})
    }

    render() {

        return (
            <View>

                <ExploreMap
                    places={this.places}
                    activePlaceID={this.state.topPlace ? this.state.topPlace.id : null}
                    onMarkerPress={(place) => this.scrollToPlace(place)}
                />

                <ScrollView
                    ref={(scrollView) => {
                        this.placesScrollView = scrollView
                    }}
                    scrollEventThrottle={100}
                    onScroll={e => this.handleScrollViewScroll(e)}
                    //stickyHeaderIndices={[1,3,4]}
                >
                    <Text> Places near me now</Text>
                    {
                        _.map(this.places, (place, index) => {
                            return (
                                <PlaceSelector
                                    key={index}
                                    place={place}
                                    onPress={() => {}}
                                    onLayout={(event) => {
                                        this.registerPlaceInScrollView(place, event.nativeEvent.layout);
                                    }}
                                />
                            );
                        })
                    }
                    <View style={{height: 500}}>
                        <Text>
                            That's All folks
                        </Text>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    place: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        backgroundColor: 'white',
        //alignItems : 'center',
        height: 100,
        justifyContent: 'center',
        //zIndex : 1
    },
    me: {
        zIndex: 2
    },
    marker: {
        zIndex: 1
    }

});
