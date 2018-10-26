import React from 'react'
import ReactDOM from 'react-dom'
import { HttpLink, InMemoryCache, ApolloClient } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloLink, split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { AUTH_TOKEN } from './constant'
import RootContainer from './components/RootContainer'
import { ApolloProvider } from 'react-apollo'
import './index.css'

// Change the URL to your own WordPress GraphQL endpoint.
const httpLink = new HttpLink({ uri: 'https://YOURWORDPRESSURL.com/graphql' })

const middlewareLink = new ApolloLink((operation, forward) => {
  // get the authentication token from local storage if it exists
  const tokenValue = localStorage.getItem(AUTH_TOKEN)
  // return the headers to the context so httpLink can read them
  operation.setContext({
    headers: {
      Authorization: tokenValue ? `Bearer ${tokenValue}` : '',
    },
  })
  return forward(operation)
})

// authenticated httplink
const httpLinkAuth = middlewareLink.concat(httpLink)

const wsLink = new WebSocketLink({
  // Enter your URL here (again). Should be the same WordPress URL except with ws:// appended.
  uri: `ws://YOURWORDPRESSURL.com/graphql`,
  options: {
    /* Commenting out line below as it causes reconnection errors to be constantly displayed in the the console. Need to find the actual issue
    and a proper solution for it. */
  
    //reconnect: true,
    
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  },
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLinkAuth,
)

// apollo client setup
const client = new ApolloClient({
  link: ApolloLink.from([link]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

const token = localStorage.getItem(AUTH_TOKEN)

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootContainer token={token} />
  </ApolloProvider>,
  document.getElementById('root'),
)
