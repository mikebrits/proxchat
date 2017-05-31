/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React from 'react';

import {AppNavigation} from './Http/Routes';
import {ApolloClient, ApolloProvider, createNetworkInterface} from 'react-apollo';

const networkInterface = createNetworkInterface({
    uri: 'http://192.168.1.136:8000/graphql'
});

const client = new ApolloClient({
    networkInterface: networkInterface
});

class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <AppNavigation/>
            </ApolloProvider>
        );
    }
}

export default App;

