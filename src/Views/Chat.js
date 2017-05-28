/**
 *
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Button,
    ListView,
    Dimensions,
    KeyboardAvoidingView
} from 'react-native';

import Message from '../Components/Message';
import MessageInput from '../Components/MessageContentInput';
import InvertibleScrollView from 'react-native-invertible-scroll-view';


export default class Chat extends Component {

    static navigationOptions = ({navigation}) => ({
        title: `Chat with ${navigation.state.params.chatID}`,
        headerRight: <Button title="Settings"
                             onPress={() => {
                                 navigation.navigate('ChatOptions', {chatID: navigation.state.params.chatID})
                             }}/>,
    });

    user = {
        id: 111,
        name: 'Mike B'
    };
    dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    messages = [
        {
            author: {
                id: 111,
                name: "Mike B"
            },
            contents: {
                text: "My Message Text that is a lot longer and hopefully goes onto the next line ",
            },
            timestamp: '1234'
        },
        {
            author: {
                id: 122,
                name: "Mike C"
            },
            contents: {
                text: "Echo park keytar trust fund drinking vinegar man braid pork belly, crucifix fap etsy craft beer gentrify farm-to-table. Lomo tilde man bun blog williamsburg pinterest. Kitsch ethical tumblr lyft, pour-over locavore pop-up. Hexagon cray pug, meggings health goth williamsburg raclette gochujang tbh. Jean shorts cred freegan YOLO. Bicycle rights small batch tumeric, art party roof party gochujang asymmetrical distillery humblebrag neutra fam. YOLO hammock glossier, celiac chartreuse photo booth cliche thundercats hexagon polaroid chicharrones gentrify.",
            },
            timestamp: '1235'
        },
        {
            author: {
                id: 111,
                name: "Mike B"
            },
            contents: {
                text: `Tumblr fam twee mustache, blue bottle typewriter four loko gluten-free chicharrones lomo. Photo booth bespoke squid typewriter, cloud bread distillery jianbing swag skateboard dreamcatcher cred lomo quinoa. Kickstarter asymmetrical listicle keytar, wayfarers semiotics intelligentsia cred poutine neutra brunch butcher try-hard. Yuccie affogato pabst, cornhole lo-fi poke leggings. Typewriter ethical knausgaard before they sold out gochujang, lumbersexual polaroid vice. Whatever small batch taxidermy meditation health goth, authentic PBR&B raw denim twee pabst art party copper mug adaptogen bitters YOLO. Master cleanse tofu put a bird on it, portland XOXO meditation lomo gluten-free jianbing brunch shaman keffiyeh intelligentsia pug godard.                Blue bottle pitchfork yr, pickled tacos live-edge asymmetrical heirloom dreamcatcher tousled food truck. Hashtag farm-to-table hell of, authentic beard wolf banh mi fixie kitsch XOXO chambray pinterest freegan street art. Organic copper mug photo booth locavore freegan. Vaporware pinterest kombucha bushwick four dollar toast. Tattooed kickstarter 8-bit butcher humblebrag vinyl. Subway tile hexagon before they sold out gastropub chillwave offal, pug selfies craft beer neutra food truck put a bird on it meggings. Hoodie celiac tattooed yr.`,
            },
            timestamp: '1234'
        },
        {
            author: {
                id: 122,
                name: "Mike C"
            },
            contents: {
                text: "My Message Text that is a lot longer and hopefully goes onto the next line ",
            },
            timestamp: '1235'
        }
    ];

    componentWillMount() {

        this.state = {
            messages: this.messages,
            messageContents: {}
        }
    }


    sendMessage = () => {
        const message = {
            author: this.user,
            contents: this.state.messageContents,
            timestamp: '1234566'
        };

        this.messages.unshift(message);

        this.setState({messages: this.messages, messageContents: {}})
    };

    updateMessageText = (text) => {
        this.setState({messageContents: {...this.state.messageContents, text: text}})
    };

    render() {

        const user = this.user;
        const messages = this.dataSource.cloneWithRows(this.messages);

        return (
            <KeyboardAvoidingView behavior={'position'} contentContainerStyle={[styles.container]} keyboardVerticalOffset={60}>
                <ListView
                    renderScrollComponent={() => <InvertibleScrollView style={styles.messageList} inverted/>}
                    dataSource={messages}
                    renderRow={(message) => <Message {...message} userIsAuthor={message.author.id === user.id}/>}
                />
                <MessageInput
                    onChangeText={(text) => {
                        this.updateMessageText(text)
                    }}
                    onSendMessage={() => {
                        this.sendMessage()
                    }}
                    canSendMessage={!!this.state.messageContents.text}
                    textValue={this.state.messageContents.text}
                    canTypeMessage
                    canSendImage
                />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        //padding: 5,
        //alignContent: 'flex-end',
        height: Dimensions.get('window').height - 60
    },
    messageList: {
        padding: 5,
        paddingBottom: 20
    },
});
