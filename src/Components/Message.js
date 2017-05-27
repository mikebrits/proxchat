/**
 *
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Animated,
    Easing
} from 'react-native';
import PropTypes from 'prop-types';

class Message extends Component{

    componentWillMount(){
        this.state = {
            opacity : new Animated.Value(0),
            bottomOffset : new Animated.Value(-50),

        }

        Animated.timing(
            this.state.opacity,
            {
                toValue: 1,
                duration: 400,
                easing: Easing.ease
            }
        ).start();

        Animated.timing(
            this.state.bottomOffset,
            {
                toValue: 0,
                duration: 200,
                easing: Easing.ease
            }
        ).start();


    }

    render(){
        const props = this.props;
        return (
            <Animated.View style={
                [
                    styles.container,
                    props.userIsAuthor && styles.userIsAuthor,
                    {
                        opacity: this.state.opacity,
                        marginTop : this.state.bottomOffset,
                        bottom : this.state.bottomOffset
                    }]}
            >
                {
                    props.author &&
                    <Text style={styles.author}>{props.author.name}</Text>
                }
                <Text>
                    {props.contents.text}
                </Text>
            </Animated.View>
        );
    }


}

Message.propTypes = {
    author: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    }).isRequired,
    contents: PropTypes.shape({
        text: PropTypes.string,
        mediaLink : PropTypes.string
    }).isRequired,
    timestamp: PropTypes.string.isRequired,
    userIsAuthor: PropTypes.bool.isRequired
};


const styles = StyleSheet.create({
    container: {
        padding: 5,
        marginBottom : 5,
        maxWidth: '80%',
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#DDDDDD',
        alignSelf : 'flex-start',
        paddingRight : 10,
        paddingLeft : 10,
    },
    userIsAuthor : {
        backgroundColor : '#B2DDBD',
        alignSelf : 'flex-end'
    },
    author : {
        fontWeight : '700'
    }
});

export default Message;