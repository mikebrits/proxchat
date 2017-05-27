import { StackNavigator } from 'react-navigation';
import Chats from '../Views/Chats';
import Chat from '../Views/Chat';
import ChatOptions from '../Views/ChatOptions';


export const AppNavigation = StackNavigator({
    Chats: { screen: Chats },
    Chat : { screen : Chat },
    ChatOptions : { screen : ChatOptions },
});