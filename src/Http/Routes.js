import { StackNavigator, TabNavigator } from 'react-navigation';
import Chats from '../Views/Chats';
import Chat from '../Views/Chat';
import ChatOptions from '../Views/ChatOptions';
import Explore from '../Views/Explore';
import Settings from '../Views/Settings';
import Place from '../Views/Place';

export const Tabs = TabNavigator({
    Chats: { screen: Chats },
    Explore: { screen: Explore },
    Settings: { screen: Settings },
});

export const AppNavigation = StackNavigator({
    Home: { screen: Tabs },
    Chat : { screen : Chat },
    ChatOptions : { screen : ChatOptions },
    Explore: { screen: Explore },
    Place: { screen: Place },
});
