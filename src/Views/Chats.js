/**
 *
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    ScrollView
} from 'react-native';
import _ from 'lodash';

import Chat from '../Components/ChatComponent';


export default class Chats extends Component {

    static navigationOptions = {
        title: 'Chats'
    };

    chats = [
        {
            id : 123,
            title : "Some Chat Title",
            thumbnail : "https://s3-eu-west-1.amazonaws.com/gastag/RefImages/Emails/John+Roche.jpg"
        },
        {
            id : 345,
            title : "Another Chat Title",
            thumbnail : "https://s3-eu-west-1.amazonaws.com/gastag/RefImages/Emails/John+Roche.jpg"
        },

    ]

    render() {
        return (
            <ScrollView>
                {_.map(this.chats, (chat, index) => {
                    return <Chat key={index}
                                 id={chat.id}
                                 title={chat.title}
                                 thumbnail={chat.thumbnail}
                                 onPress={() => this.navigateToChat(chat.id)}
                            />;
                })}
            </ScrollView>
        );
    }

    navigateToChat = (chatID) => {
        this.props.navigation.navigate('Chat', {chatID : chatID})
    }
}

const styles = StyleSheet.create({
});
