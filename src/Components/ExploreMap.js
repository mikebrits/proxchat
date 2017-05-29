/**
 *
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

class ExploreMap extends Component {

    map = null;
    markerRefs = {};

    componentWillMount() {
        this.state = {
            activePlaceID: this.props.activePlaceID
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let myLocation = {latitude: position.coords.latitude, longitude: position.coords.longitude};
                console.log('location', myLocation);
                this.setState({myLocation});

                if (this.props.activePlaceID) {
                    this.focusMarkerRelativeToSelf(this.props.activePlaceID)
                }
                else {
                    this.focusAllMarkers();
                }

            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
        );
    }

    componentWillReceiveProps(nextProps) {

        if (!nextProps.activePlaceID != this.props.activePlaceID) {
            if (nextProps.activePlaceID) {
                //console.log(this.markerRefs);
                this.focusMarkerRelativeToSelf(nextProps.activePlaceID)
                //this.markerRefs[nextProps.activePlaceID].showCallout();
            }
            else {
                this.focusAllMarkers();
            }
        }
    }

    focusAllMarkers() {
        setTimeout(() => {
            this.map.fitToSuppliedMarkers(['me', ..._.map(this.props.places, place => `${place.id}`)], true);
        }, 50);
    }

    focusMarkerRelativeToSelf(markerID) {
        setTimeout(() => {
            this.markerRefs[markerID].showCallout();
            this.map.fitToSuppliedMarkers(['me', `${markerID}`], true);
        }, 50);
    }

    handleMarkerPressed(place) {
        if (this.props.onMarkerPress) {
            this.props.onMarkerPress(place)
        }
    }


    render() {

        const activePlace = this.props.activePlaceID ? _.find(this.props.places, {id: this.props.activePlaceID}) : null;
        console.log(activePlace);
        if (this.state.myLocation)
            return (

                <MapView
                    style={styles.map}
                    ref={ref => {
                        this.map = ref;
                    }}
                    initialRegion={{
                        latitude: this.state.myLocation.latitude,
                        longitude: this.state.myLocation.longitude,
                        latitudeDelta: 0.11,
                        longitudeDelta: 0.01,
                    }}
                >

                    <MapView.Marker
                        identifier={"me"}
                        coordinate={this.state.myLocation}
                        pinColor="#4F93FF"
                        style={styles.me}

                        //description={marker.description}
                    >
                        <Icon name="md-person" size={25} color={"#4F93FF"}/>
                    </MapView.Marker>


                    {_.map(this.props.places, (place, index) => {
                        let isActiveMarker = place.id == this.props.activePlaceID;
                        return (
                            <View key={index}>
                                <MapView.Marker

                                    identifier={`${place.id}`}
                                    coordinate={place.location}
                                    title={place.name}
                                    pinColor={isActiveMarker ? "green" : "red"  }
                                    style={styles.marker}
                                    ref={ref => {
                                        this.markerRefs[place.id] = ref;
                                    }}
                                >
                                    <View>
                                        <TouchableOpacity onPress={() => this.handleMarkerPressed(place)}>
                                            <Icon name="md-home" size={isActiveMarker ? 35 : 25}
                                                  color={isActiveMarker ? "green" : "red"}/>
                                        </TouchableOpacity>
                                    </View>
                                </MapView.Marker>
                            </View>
                        );
                    })}
                    {
                        activePlace &&
                        <MapView.Circle
                            key={activePlace.location.latitude + activePlace.location.longitude}
                            center={activePlace.location}
                            radius={300}
                            fillColor={"rgba(5, 165, 209, 0.2)"}
                            strokeColor={"rgba(5, 165, 209, 0.5)"}
                            strokeWidth={1}
                        />
                    }
                </MapView>
            );
        return (
            <View>
                <Text>
                    Finding you...
                </Text>
            </View>
        )
    }
}

export default ExploreMap;

ExploreMap.propTypes = {
    places: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string,
            location: PropTypes.shape(
                {
                    latitude: PropTypes.number.isRequired,
                    longitude: PropTypes.number.isRequired
                }
            ).isRequired
        })
    ).isRequired,
    activePlaceID: PropTypes.number,
    onMarkerPress: PropTypes.func
}

const styles = StyleSheet.create({
    map: {
        height: 200
    },
});
