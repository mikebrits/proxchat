/**
 *
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    Text,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const PlaceSelector = (props) => {

    const {place} = props;

    return (
        <TouchableWithoutFeedback
            onPress={props.onPress}
            onLayout={props.onLayout}
        >
            <View style={styles.container}>
                <View style={styles.leftHandContents}>
                <Image style={styles.thumbnail} source={{uri: place.thumbnail || "https://s3-eu-west-1.amazonaws.com/gastag/RefImages/Emails/John+Roche.jpg"}} />
                    <View>
                        <Text style={styles.chatTitle}>
                            {place.name}
                        </Text>
                        <Text style={styles.chatSubTitle}>
                            {place.status}
                        </Text>
                    </View>
                </View>
                <Icon name="ios-arrow-forward-outline" size={20} color="grey" />
            </View>
        </TouchableWithoutFeedback>
    );

}

PlaceSelector.propTypes = {
    place: PropTypes.shape(
        {
            id : PropTypes.number.isRequired,
            name : PropTypes.string,
            thumbnail : PropTypes.string,
            host : PropTypes.shape({
                id : PropTypes.number,
                name : PropTypes.string
            }),
            status : PropTypes.string,
            location : PropTypes.shape({
                latitude : PropTypes.number,
                longitude : PropTypes.number
            }),
            radius : PropTypes.number,
            score : PropTypes.number,
            users : PropTypes.arrayOf(PropTypes.shape({
                id : PropTypes.number,
                name : PropTypes.string,
            }))
        }
    ).isRequired,
    onPress: PropTypes.func
};

export default PlaceSelector;

const styles = StyleSheet.create({
    container : {
        padding: 16,
        backgroundColor : 'white',
        borderBottomColor : '#DDDDDD',
        borderBottomWidth : 1,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between'
    },
    leftHandContents : {
        flexDirection : 'row',
        alignItems : 'center',
    },
    chatTitle : {
        fontSize : 16,
        fontWeight : "500",
        marginBottom : 5
    },
    chatSubTitle : {
        fontSize : 12,
        color : 'grey'
    },
    thumbnail : {
        height : 50,
        width : 50,
        borderRadius : 5,
        marginRight: 16,
    }
});
