/**
 *
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import {gql, graphql} from 'react-apollo';
import _ from 'lodash';

const getUsers = gql`
query CurrentUser($userID: ID){ 
    users(id : $userID) {
        name
        id 
    }
    chats {
        chat_type{
            chat_type
        }
    }
}
`;


@graphql(getUsers, {options : ({userID}) => ({variables : {userID}})})
class Settings extends Component {
    render() {
        console.log(this.props.data);
        const {data} = this.props;
        return data.loading ?
            (
                <View>
                    <Text>
                       Loading...
                    </Text>
                </View>
            )
            :
            (
                <View>
                    {
                        _.map(data.users, (item, index) => {
                            return(
                                <Text key={index}>
                                    {item.id}: {item.name}
                                </Text>
                            );
                        })
                    }
                </View>
            )
    }
}

Settings.defaultProps = {
    userID : 2
};

export default Settings;

const styles = StyleSheet.create({});
