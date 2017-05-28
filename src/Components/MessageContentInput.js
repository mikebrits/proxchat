/**
 *
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions

} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

const MessageContentInput = (props) =>{

    return (
        <View style={styles.container}>
            <View style={[styles.inputContainer, {backgroundColor : props.canTypeMessage ? 'white' : '#dddddd'}]}>
                <TextInput
                    style={styles.messageInput}
                    editable={props.canTypeMessage}
                    placeholder={props.placeholder || 'Send a message'}
                    onChangeText={(text) => props.onChangeText(text)}
                    value={props.textValue}
                    //returnKeyType="send"
                    //onSubmitEditing={() => props.canSendMessage && props.onSendMessage()}
                />
                <TouchableOpacity onPress={() => props.canSendImage && console.log('Camera')}
                                  style={styles.cameraButton}
                >
                    <Icon name="ios-camera-outline" size={30} color={'#0183E9'} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => props.canSendMessage && props.onSendMessage()}>
                <Icon name="ios-paper-plane-outline" size={30} color={props.canSendMessage ? '#0183E9' : '#AFAFAF'} />
            </TouchableOpacity>
        </View>
    );

}

export default MessageContentInput;

MessageContentInput.propTypes = {
    onChangeText : PropTypes.func.isRequired,
    onSendMessage: PropTypes.func.isRequired,
    canSendMessage : PropTypes.bool.isRequired,
    canTypeMessage : PropTypes.bool,
    canSendImage: PropTypes.bool,
    textValue : PropTypes.string
};

const styles = StyleSheet.create({
    inputContainer : {
        backgroundColor: 'white',
        marginRight : 10,
        borderColor: '#DDDDDD',
        borderRadius: 5,
        paddingRight : 30,
        paddingLeft : 10,
        flexDirection : 'row',
        alignItems : 'center',
        width: Dimensions.get('window').width - 50
    },
    messageInput: {
        height: 35,
        width : '100%'
    },
    container : {
        padding : 5,
        backgroundColor : 'white',
        borderTopWidth : 1,
        borderTopColor : '#DDDDDD',
        flexDirection : 'row',
        alignItems : 'center'
    },
    cameraButton : {
        //backgroundColor : 'white'
    }
});
