# Preact with JWT and Apollo boilerplate

This is a boilerplate/starter pack for a Preact CLI based single page application with a focus on authentication with the use of JSON Web Tokens, including using a custom system for handling access tokens and refresh tokens.

> Please note: although this repo has recently been updated to look at some security concerns, it's still not production ready. Please be careful where tokens are stored, how they are transmitted to the server, and the expiry times of access and refresh tokens.

## Features

* Separated file structure to keep the following in different directories:
  * Each route
  * Each component inside a route
  * Reducers and services (utility functions, reducers and actions in one place)
  * Styles (both global styling and per-route/per-component styling separated)
  * Assets
  * Errors
* User receives a JWT access token and refresh token when:
  * User signs up to the system.
  * User refreshes their browser (tokens are retrieved from localStorage).
* The JWT access token contains the users name and email so details about the user and is used for personalisation without doing a server request (when the user registers, logs in or does a page refresh).
* There are 2 ways to communicate with the server, both of which are left in the repo so they can easily be compared. These are:
  * URL endpoints - a REST-style setup whereby endpoints of the Node/Express application are hit to return data. Some endpoints are protected with the use of the `jsonwebtoken` module which uses Express middleware to verify the JWT sent in the header of the requests.
  * GraphQL - the server-side implementation of GraphQL by Apollo uses a single entry point url (/graphql) alongside the `express-jwt` module which uses Express middleware to check and verify the JWT sent in the header.

## Security concerns

At it's core, the idea of using JSON Web Tokens and refresh tokens together helps reduce the number of session auth hits to the database whilst giving control to the admins over revoking access if something was to potentially go wrong such as an unauthorized account access.

With SPA's, this approah is **far from ideal** from a security standpoint because we're storing the tokens in the browser. There are ways around this by upgrading the security around the application such as using [silent authentication](https://auth0.com/docs/api-auth/tutorials/silent-authentication), which I'll include at some point soon. Bear in mind that this **should not be used in production**, but is great for getting familiar with the workings of a stateless authentication approach, and using refresh tokens.

## Apollo's GraphQL for server

The server side GraphQL setup uses resolvers to process the `query` and `mutation` requests sent from with GraphiQL, or the front end Preact application. The GraphQL related information has been placed in the same directory so it's easy to follow. This is all in `server/models/gql/` directory.

I've used a loose implementation of the "models" and "connectors" setup recommended by Apollo in order to abstract some logic and database queries. These live in the following locations:

* `server/controllers/auth.js` (which is the "connectors"). These handle running a query against a DB connection, or passing credentials to an API. You don't expect to change your connectors very often, and eventually they can be on npm for a variety of backends.
* `server/models/gql/modelAuth.js` (which is the "models"). These are application-specific logic: which query to run, and which endpoint to call. These will change all the time as you add more functionality to the API.

> At this point the client side implementation of GraphQL has not been utilised properly on the front end, as this is being developed for a future release.
