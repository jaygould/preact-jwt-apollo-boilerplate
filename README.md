# Preact with JWT and Apollo boilerplate


## Features:
* Well separated file structure to keep the following bits in different directories:
  * Each route
  * Each component inside a route
  * Reducers and services (utility functions, reducers and actions in one place)
  * Styles (both global styling and per-route/per-component styling separated)
  * Assets
  * Errors
* User receives a JWT access token and refresh token when:
  * User signs up to the system.
  * User logs in to their account.
  * User refreshes their browser (tokens are retrieved from localStorage).
* The JWT access token contains the users name and email so details about the user and is used for personalisation without doing a server request (when the user registers, logs in or does a page refresh).

## Security

* A main focus when dealing with authentication is security. This boilerplate hashes passwords, and levereges features from Preact built in security, as well as Node Express security features. However the auth token and refresh token is stored in local storage. Please review this before considering in a production project as access to a refresh token gives full access to a user account.

TODO
* Show error and success messages on sign in
Update styling for login and profile page
* Check JWTs on front end for validity before using front end routes (otherwise any route will be easily accessible)
* Add encryption to Node password storage
* Add more complex bits to Apollo server such as mutations
* Start Apollo client and transfer existng functionality to it (getting and putting data)
* Decide whether to use Redux along-side and potentially re-write the login process in Redux
