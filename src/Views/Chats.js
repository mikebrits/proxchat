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

export default class Chats extends Component {

    static navigationOptions = {
        title: 'Chats'
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Button
                    onPress={() => navigate('Chat', {chatID : '123'})}
                    title="Chat with Person"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
});
