import { StackNavigator, TabNavigator } from 'react-navigation';
import Chats from '../Views/Chats';
import Chat from '../Views/Chat';
import ChatOptions from '../Views/ChatOptions';
import Explore from '../Views/Explore';
import Settings from '../Views/Settings';
import Place from '../Views/Place';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

export const Tabs = TabNavigator({
    Settings: {
        screen: Settings,
        navigationOptions : {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-finger-print-outline" size={25} color={tintColor}  />
            ),
        }
    },
    Explore: {
        screen: Explore,
        navigationOptions : {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-compass-outline" size={25} color={tintColor}  />
            ),
        }
    },
    Chats: {
        screen: Chats,
        navigationOptions : {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-chatbubbles-outline" size={25} color={tintColor} />
            ),
        }
    },
});

export const AppNavigation = StackNavigator({
    Home: { screen: Tabs },
    Chat : { screen : Chat },
    ChatOptions : { screen : ChatOptions },
    Explore: { screen: Explore },
    Place: { screen: Place },
});
