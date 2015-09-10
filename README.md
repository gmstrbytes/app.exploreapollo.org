# app.exploreapollo.org [![Build Status](https://travis-ci.org/UTD-CRSS/app.exploreapollo.org.svg?branch=master)](https://travis-ci.org/UTD-CRSS/app.exploreapollo.org)

Apollo Project Single Page App (repo name still up in the air)

## Development

This project requires Node `^4.0.0`. You should be install
node using [nvm][].

To start hacking:

1. `npm install` to grab all the goodies
2. `npm run dev` to start a hot-reloading development server
3. No step 3

Other useful commands:

* `npm test` to run the tests
* `npm run lint` to check your changes against the linting guidelines

**Note about HTTPS and the development server:** the development sever uses a
self-signed SSL certificate. When you open the development server for the first
time it will squawk about the certificate being invalid. The certificate is not
invalid or insecure, it is just self-signed.

[nvm]: https://github.com/creationix/nvm
[jest]: https://facebook.github.io/jest/
