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

export default class Chat extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Chat with ${navigation.state.params.chatID}`,
        headerRight: <Button title="Settings" onPress={() => {navigation.navigate('ChatOptions', {chatID : navigation.state.params.chatID})}} />,
    });

    render() {

        return (
            <View>
                <Text>
                    Messages
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
});
