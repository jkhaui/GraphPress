import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'
import { AUTH_TOKEN } from '../constant'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  }

  render() {
    return (
      <div className="pa4 flex justify-center bg-white">
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

export default graphql(LOGIN_USER_MUTATION, { name: 'loginMutation' })(
  withRouter(LoginPage),
)
