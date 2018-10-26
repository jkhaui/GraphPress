import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { graphql } from 'react-apollo'
import { getMainDefinition } from 'apollo-utilities'
import { WebSocketLink } from 'apollo-link-ws'
import { HttpLink, InMemoryCache, ApolloClient } from 'apollo-client-preset'
import { ApolloLink, split } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
import  { gql } from 'apollo-boost'
import { AUTH_TOKEN } from './constant'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const httpLink = new HttpLink({ uri: 'https://yourwpsite.com/graphql' })

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
  uri: `ws://yourwpsite.com/graphql`,
  options: {
    /* Websockets creates a seriously annoying issue where it fails to reconnect. Editing out
    the line below is a temporary fix. */
    // reconnect: true,
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



class LoginPage extends React.Component {
  state = {
    username: '',
    password: '',
  }

    render() {
        return (
     
        <div>
          <h3>
            Don't have an account? <a href="/signup">Signup</a>
          </h3>
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            placeholder="Username"
            type="text"
            onChange={e => this.setState({ username: e.target.value })}
            value={this.state.username}
          />
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            placeholder="Password"
            type="password"
            onChange={e => this.setState({ password: e.target.value })}
            value={this.state.password}
          />
          {this.state.username &&
            this.state.password && (
              <button
                className="pa3 bg-black-10 bn dim ttu pointer"
                onClick={this._login}
              >
                Log in
              </button>
            )}
        </div>
               
        )
      }    
      _login = async e => {
        const { username, password } = this.state
        this.props
          .loginMutation({
            variables: {
              username,
              password,
            },
          })
          .then(result => {
            const token = result.data.login.authToken
    
            this.props.refreshJwtAuthToken &&
              this.props.refreshJwtAuthToken({
                [AUTH_TOKEN]: token,
              })
            this.props.history.replace('/')
            window.location.reload()
          })
          .catch(err => {
            console.log('error')
          })
      }
}

const LOGIN_USER_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login (input: {
      username: $username
      password: $password
      clientMutationId: ""
    }) {
      authToken
    }
}
`

export default LoginPage;
