## :warning: This repo is no longer maintained

# Preact with JWT and Apollo boilerplate

This is a boilerplate/starter pack for a Preact CLI based single page application with a focus on authentication with the use of JSON Web Tokens, including using a custom system for handling access tokens and refresh tokens.

> Please note: although this repo has recently been updated to look at some security concerns, it's still not production ready. Please be careful where tokens are stored, how they are transmitted to the server, and the expiry times of access and refresh tokens.

Update March 2018 - I've purposely not updated to Apollo Client 2.1 as I'm not a fan of the `<Query />` and `<Mutation />` component architecture in the latest version.

## Features

- Separated file structure to keep the following in different directories:
  - Each route
  - Each component inside a route
  - Reducers and services (utility functions, reducers and actions in one place)
  - Styles (both global styling and per-route/per-component styling separated)
  - Assets
  - Errors
- User receives a JWT access token and refresh token when:
  - User signs up to the system.
  - User refreshes their browser (tokens are retrieved from localStorage).
- The JWT access token contains the users name and email so details about the user and is used for personalisation without doing a server request (when the user registers, logs in or does a page refresh).
- The JWT is used to verify the user on the server side using the Apollo `context` middleware.
- There are 2 ways to communicate with the server, both of which are left in the repo so they can easily be compared. These are:
  - URL endpoints - a REST-style setup whereby endpoints of the Node/Express application are hit to return data. Some endpoints are protected with the use of the `jsonwebtoken` module which uses Express middleware to verify the JWT sent in the header of the requests.
  - GraphQL - the server-side implementation of GraphQL by Apollo uses a single entry point url (/graphql) alongside the `express-jwt` module which uses Express middleware to check and verify the JWT sent in the header.

## Security concerns

At it's core, the idea of using JSON Web Tokens and refresh tokens together helps reduce the number of session auth hits to the database whilst giving control to the admins over revoking access if something was to potentially go wrong such as an unauthorized account access.

With SPA's, this approah is **far from ideal** from a security standpoint because we're storing the tokens in the browser. There are ways around this by upgrading the security around the application such as using [silent authentication](https://auth0.com/docs/api-auth/tutorials/silent-authentication), which I'll include at some point soon. Bear in mind that this **should not be used in production**, but is great for getting familiar with the workings of a stateless authentication approach, and using refresh tokens.

## Apollo's GraphQL for server

The server side GraphQL setup uses resolvers to process the `query` and `mutation` requests sent from with GraphiQL, or the front end Preact application. The GraphQL related information is in the following directories on the server:

- `server/config/graphql.js` for the initial setup and introducing the `context` middleware using `graphqlExpress`.
- `server/resolvers/index.js` for the setup of a basic resolver.
- `server/schema/gqlSchema.js` for the setup of a basic schema.

The server uses GraphQL to process the following requests to the server:

- `Query` all users in order to return the currently active refresh tokens in the database, along with their expire times. This query is protected using JWT validation middleware.
- `Mutation` to handle user registrations.

## Apollo's GraphQL for client (Preact)

The client side implements the `graphql()` function from Apollo Client instead of updating to the new component based architecture in version 2.1. The GraphQL related information is in the following directories on the client:

- `app/src/routes/register/index.js` for the Apollo mutation for registering the user. This implements a HoC for providing a "loading" state.
- `app/src/routes/admin/index.js` for the Apollo query to bring in all user and associated JWT information.

## Keeping legacy code

I've kept the legacy code which used Redux on the front end in order to show the difference between Redux and Apollo based basic functionality. The Redux based client side code uses code inside the `app/src/reducers/` directory with Redux Thunk and `fetch` to connect with the server.

The Apollo code logic is all held in the page that the queries and mutations are used, keeping the code declarative and easier to follow. I've also tried to keep as much functionality out of the UI as possible by writing as much as I can in the `graphql()` function.
