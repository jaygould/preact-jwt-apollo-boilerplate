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

## Security concerns

At it's core, the idea of using JSON Web Tokens and refresh tokens together helps reduce the number of session auth hits to the database whilst giving control to the admins over revoking access if something was to potentially go wrong such as an unauthorized account access.

With SPA's, this approah is **far from ideal** from a security standpoint because we're storing the tokens in the browser. There are ways around this by upgrading the security around the application such as using [silent authentication](https://auth0.com/docs/api-auth/tutorials/silent-authentication), which I'll include at some point soon. Bear in mind that this **should not be used in production**, but is great for getting familiar with the workings of a stateless authentication approach, and using refresh tokens.
