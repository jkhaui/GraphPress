<h1 align="center"><strong>GraphPress: A GraphQL Boilerplate Using WordPress as a User Authentication System</strong></h1>

<br />

<div align="center"><img src="https://s3.amazonaws.com/codelize/GraphPress.png" /></div></center>

<div align="center"><strong>Based off (https://github.com/graphql-boilerplates/react-fullstack-graphql).</strong></div>
<div align="center">This boilerplate has been slightly modified to integrate with an existing WordPress setup that has both the GraphQL and GraphQL JWT plugins installed. It should work by using the JWTs to authenticate a user's login.</div>

<br />

## Requirements
-- Must have an existing WordPress site with WP-GraphQL (https://github.com/wp-graphql/wp-graphql) and WP-GraphQL-JWT-Auth (https://github.com/wp-graphql/wp-graphql-jwt-authentication) plugins installed and activated.

## Quickstart

1. Git clone https://github.com/jkhaui/GraphPress
2. Change the URLs in the index.js file (note that there are two URLs to change: 1) the graphQL endpoint and 2) the websockets URL (which is ws://yourWPsite.com/graphql).
3. yarn install && yarn start

**Work in progress.. Next up is integrating feeds from the WordPress API.

**You need a websockets connection for authentication to work. If you are on shared hosting (e.g. GoDaddy), this probably won't work. But there's likely other ways of authenticating without opening a websocket.
