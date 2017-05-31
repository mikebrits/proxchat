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

import Chat from '../Components/ChatSelector';


export default class Chats extends Component {

    static navigationOptions = {
        title: 'Chats'
    };

    chats = [
        {
            id : 123,
            title : "Some Chat Title",
            thumbnail : "https://s3-eu-west-1.amazonaws.com/gastag/RefImages/Emails/John+Roche.jpg",
            active : true,
            participants : [
                {
                    id : 123,
                    name : 'John Wilkes Booth',
                },
                {
                    id : 999,
                    name : 'Mike Brits',
                }
            ]
        },
        {
            id : 345,
            title : "Another Chat Title",
            thumbnail : "https://s3-eu-west-1.amazonaws.com/gastag/RefImages/Emails/John+Roche.jpg",
            active : false,
            participants : [
                {
                    id : 111,
                    name : 'Joe Joe Sampson',
                },
                {
                    id : 999,
                    name : 'Mike Brits',
                }
            ]
        },

    ]

    render() {
        return (
            <ScrollView>
                {_.map(this.chats, (chat, index) => {
                    return <Chat key={index}
                                 chat={chat}
                                 onPress={() => this.navigateToChat(chat)}
                            />;
                })}
            </ScrollView>
        );
    }

    navigateToChat = (chat) => {
        this.props.navigation.navigate('Chat', {chat : chat})
    }
}

const styles = StyleSheet.create({
});
