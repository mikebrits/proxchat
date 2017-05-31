/**
 *
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export default class Place extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.place.name}`,
    });

    render() {
        return (
            <View>
                <Text>
                    Place
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
});
