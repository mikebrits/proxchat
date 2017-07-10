/**
 *
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView
} from 'react-native';
import _ from 'lodash';
import SwipableListItem from '../Components/SwipableListItem';
import IconGrid from '../Components/IconGrid/IconGrid';


class Settings extends Component {

    componentWillMount() {
        this.state = {
            listItems: [
                {
                    id: '1',
                    text: "Uno"
                },
                {
                    id: '2',
                    text: "Dose"
                },
                {
                    id: '3',
                    text: "Trex"
                },

            ]
        };
    }

    removeItemFromList(id) {
        this.setState({
            listItems: _.filter(this.state.listItems, item => item.id !== id)
        });

    }

    duplicateItem(id) {
        let toClone = _.find(this.state.listItems, {id: id});
        this.setState({
            listItems: [...this.state.listItems, {...toClone, id: _.now()}]
        });
    }


    render() {

        return (
            <View>
                <ScrollView style={styles.container}>
                    {_.map(this.state.listItems, (item, index) => {
                        return (
                            <SwipableListItem
                                key={item.id}
                                text={item.text}
                                onSwipeRight={() => this.removeItemFromList(item.id)}
                                onSwipeLeft={() => this.duplicateItem(item.id)}
                            />
                        );
                    })}
                </ScrollView>
                <IconGrid size={5}/>
            </View>
        )
    }
}

Settings.defaultProps = {
    userID: 2
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        height: '50%',
        padding: 10,
    },
    slideItem: {
        padding: 20,
        backgroundColor: 'white',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
    }
});
