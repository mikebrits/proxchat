/**
 *
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    ListView,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Keyboard,
    Animated,
    Easing
} from 'react-native';

import Message from '../Components/Message';
import MessageInput from '../Components/MessageContentInput';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';


export default class Chat extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Chat with ${navigation.state.params.chatID}`,
        headerRight: <Button title="Settings"
                             onPress={() => {navigation.navigate('ChatOptions', {chatID : navigation.state.params.chatID})}}/>,
    });

    user = {
        id: 111,
        name: 'Mike B'
    };
    dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    messages = [
        {
            author: {
                id: 111,
                name: "Mike B"
            },
            contents: {
                text: "My Message Text that is a lot longer and hopefully goes onto the next line ",
            },
            timestamp: '1234'
        },
        {
            author: {
                id: 122,
                name: "Mike C"
            },
            contents: {
                text: "My Message Text that is a lot longer and hopefully goes onto the next line ",
            },
            timestamp: '1235'
        }
    ];

    componentWillMount() {
        const self = this;

        this.state = {
            keyboardOffset : new Animated.Value(5),
            //keyboardOffset : 5,
            messages: this.messages,
            messageContents: {}
        }

        Keyboard.addListener('keyboardWillShow', e => {
            console.log('show off');
            Animated.timing(
                self.state.keyboardOffset,
                {
                    toValue: e.endCoordinates.height + 5,
                    duration: 200,
                    easing: Easing.bezier(.17,.59,.4,.77)
                }
            ).start();

        });

        Keyboard.addListener('keyboardWillHide', () => {
            Animated.timing(
                self.state.keyboardOffset,
                {
                    toValue: 5,
                    duration: 200,
                    easing: Easing.bezier(.17,.59,.4,.77)
                }
            ).start();
        });
    }


    sendMessage = () => {
        const message = {
            author: this.user,
            contents: this.state.messageContents,
            timestamp: '1234566'
        };

        this.messages.push(message);

        this.setState({messages: this.messages, messageContents: {}})
    };

    updateMessageText = (text) => {
        this.setState({messageContents: {...this.state.messageContents, text: text}})
    };

    render() {

        const user = this.user;
        const messages = this.dataSource.cloneWithRows(this.messages);

        return (
            <Animated.View style={[styles.container, {paddingBottom : this.state.keyboardOffset}]}>
                <ListView
                    style={styles.messageList}
                    dataSource={messages}
                    renderRow={(message) => <Message {...message} userIsAuthor={message.author.id === user.id} />}
                />
                <MessageInput
                    onChangeText={(text) => {this.updateMessageText(text)}}
                    onSendMessage={() => {this.sendMessage()}}
                    canSendMessage={!!this.state.messageContents.text}
                    textValue={this.state.messageContents.text}
                    canTypeMessage
                    canSendImage
                />
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        alignContent: 'flex-end',
        minHeight: '100%',
    },
    messageList: {
        flexDirection: 'column-reverse',
    },
});
