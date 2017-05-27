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

export default class Chats extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Chat Options`,
    });

    render() {
        return (
            <View>
                <Text>Chat Options</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
});
