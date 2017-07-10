/**
 *
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    PanResponder,
    Animated,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import Interactable from 'react-native-interactable';
import Icon from 'react-native-vector-icons/Ionicons';


class SwipableListItem extends Component {

    componentWillMount() {
        this.state = {
            pan: new Animated.ValueXY(),
            opacity: 1,
        };

        this._deltaX = new Animated.Value(0);
    }


    render() {
        console.log(this.state.pan);
        return (

            <View>
                <Animated.View style={[styles.actions, {
                    backgroundColor: this._deltaX.interpolate({
                        inputRange: [-1, 0, 1],
                        outputRange: ['#D93737', 'rgba(0, 0, 0, 1)', '#24B4D9'],
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp'
                    })
                }]}>

                    <Animated.View
                        style={[
                            {
                                transform: [{
                                    scale: this._deltaX.interpolate({
                                        inputRange: [0, 65, 100],
                                        outputRange: [0, 1, 1.1],
                                        extrapolateLeft: 'clamp',
                                        extrapolateRight: 'clamp'
                                    })
                                }],
                                opacity: this._deltaX.interpolate({
                                    inputRange: [0, 45],
                                    outputRange: [0, 1],
                                    extrapolateLeft: 'clamp',
                                    extrapolateRight: 'clamp'
                                })
                            }
                        ]}
                    >
                        <TouchableOpacity
                            style={[styles.actionButton, {marginLeft : 7}]}
                            onPress={() => {
                                this.props.onSwipeLeft()
                            }}>
                            <Icon name="ios-copy-outline" size={40} color={'#fff'}/>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View
                        style={[
                            {
                                transform: [{
                                    scale: this._deltaX.interpolate({
                                        inputRange: [-100, -55, 0],
                                        outputRange: [1.1, 1, 0],
                                        extrapolateLeft: 'clamp',
                                        extrapolateRight: 'clamp'
                                    })
                                }],
                                opacity: this._deltaX.interpolate({
                                    inputRange: [-55, 0],
                                    outputRange: [1, 0],
                                    extrapolateLeft: 'clamp',
                                    extrapolateRight: 'clamp'
                                })
                            }
                        ]}
                    >
                        <TouchableOpacity
                            style={[styles.actionButton,  {marginRight : 7}]}
                            onPress={() => {
                                this.props.onSwipeRight()
                            }}>
                            <Icon name="ios-trash-outline" size={35} color={'#fff'}/>
                        </TouchableOpacity>
                    </Animated.View>

                </Animated.View>
                <Interactable.View
                    horizontalOnly={true}
                    snapPoints={[
                        {x: 55},
                        {x: 0},
                        {x: -55}
                    ]}
                    animatedValueX={this._deltaX}

                >
                    <View style={[styles.slideItem]}>
                        <Text>{this.props.text}</Text>
                    </View>
                </Interactable.View>
            </View>

        )
    }
}

SwipableListItem.propTypes = {
    onSwipeLeft: PropTypes.func,
    onSwipeRight: PropTypes.func,
}


export default SwipableListItem;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 10,
    },
    actions: {
        width: '100%',
        height: 60,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,

    },
    actionButton: {
        padding: 10,
    },
    slideItem: {
        padding: 20,
        backgroundColor: 'white',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        height : 60,
        marginBottom : 5
    }
});
