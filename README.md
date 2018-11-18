<h1 align="center"><strong>GraphPress: A GraphQL Boilerplate Using WordPress as a User Authentication System</strong></h1>

<br />

<div align="center"><img src="https://s3.amazonaws.com/codelize/GraphPress.png" /></div></center>

<div align="center"><strong>Based off (https://github.com/graphql-boilerplates/react-fullstack-graphql).</strong></div>
<div align="center">This boilerplate has been slightly modified to integrate with an existing WordPress setup that has both the GraphQL and GraphQL JWT plugins installed. It works by using JWTs to authenticate users' login.</div>

<br />

## Requirements
- Must have an existing WordPress site with the WP GraphQL (https://github.com/wp-graphql/wp-graphql) and WP GraphQL JWT-Auth (https://github.com/wp-graphql/wp-graphql-jwt-authentication) plugins installed and activated.

## Quickstart

1. Git clone https://github.com/jkhaui/GraphPress
2. Change the URLs in the index.js file. There are two URLs to change: 1) <strong>the graphQL endpoint</strong> <em>(https://yourWPsite.com/graphql)</em>, and 2) <strong>the websockets URL</strong> <em>(ws://yourWPsite.com/graphql)</em>.
3. yarn install && yarn start

<br />
**Work in progress.. Working on a much larger boilerplate which authenticates users and queries large amounts of data from a GraphQL API.
