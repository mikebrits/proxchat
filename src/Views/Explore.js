/**
 *
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native';

export default class Explore extends Component {

    static navigationOptions = {
        title: 'Explore'
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Button
                    onPress={() => navigate('Place', {placeID : 321})}
                    title="Go to place"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({});
