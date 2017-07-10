/**
 *
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Text
} from 'react-native';
import IconGridItem from './IconGridItem';
import _ from 'lodash';
import Interactable from 'react-native-interactable';

export default class IconGrid extends Component {

    componentWillMount() {
        this.gridItems = [];
        this.size = this.props.size || 5;
        for (let i = 0; i < this.size; i++) {
            this.gridItems.push(
                `gridItem${i}`
            )
        }
        this.snapPoints = [];
        this.state = {
            snapPoints : [],
            snappedPoint : null,
        }
        this._deltaX = new Animated.Value(0);
        this._deltaY = new Animated.Value(0);
        this.draggableLayout = {};
    }

    componentDidMount(){

    }

    registerPosition(position, id){
        this.snapPoints.push({x : position.x, y : position.y, id : id});
        if(this.snapPoints.length === this.size){
            this.setState({snapPoints : this.snapPoints})
        }
    }

    registerDraggableLayout(position){
        this.draggableLayout = {x : position.x, y : position.y};
        this.setState({snapPoints : [...this.state.snapPoints, this.draggableLayout]})

    }


    render() {
        return (
            <View style={styles.container}>
                {
                    _.map(this.gridItems, (item, index) => {
                        return (
                            <IconGridItem
                                ref={item}
                                key={item}
                                registerPosition = {(position, id) => {this.registerPosition(position, id)}}
                                id={item}
                            />
                        );
                    })
                }

                <Interactable.View
                    snapPoints={_.map(this.state.snapPoints, (item, index) => {
                        return({
                            x : item.x - this.draggableLayout.x - 8,
                            y : item.y - this.draggableLayout.y - 8,
                            id : item.id,
                            damping : 0.1,
                            tension: 8000
                        });
                    })}
                    onSnap={(event) => {this.setState({snappedPoint: event.nativeEvent})}}
                    animatedValueX={this._deltaX}
                    animatedValueY={this._deltaY}
                    onLayout={(event) => {this.registerDraggableLayout(event.nativeEvent.layout)}}
                >
                    <View style={[styles.icon]}>
                        <Text> {this.state.snappedPoint ?  this.state.snappedPoint.id : ''}</Text>
                    </View>
                </Interactable.View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        flexWrap : 'wrap',
    },
    icon : {
        width : 100,
        height : 100,
        margin : 8,
        borderWidth : 1,
        borderRadius : 5,
        borderColor : '#778e9f',
        backgroundColor : '#3d769f',
        alignItems : 'center',
        justifyContent : 'center',
    }

});
