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

export default class IconGridItem extends Component {
    render() {
        return (
            <View
                style={{
                    width : 100,
                    height : 100,
                    margin : 8,
                    borderWidth : 1,
                    borderRadius : 5,
                    borderColor : '#778e9f',
                    borderStyle : 'dashed'
                }}
                onLayout={(event) => {this.props.registerPosition(event.nativeEvent.layout, this.props.id)}}
            >
            </View>
        );
    }
}

const styles = StyleSheet.create({
});
