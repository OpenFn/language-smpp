Danguage SMPP [![Build Status](https://travis-ci.org/OpenFn/language-smpp.svg?branch=master)](https://travis-ci.org/OpenFn/language-smpp)
=============

Language Pack for building expressions and operations to make calls to an OpenFn SMPP client API.

Documentation
-------------

#### sample configuration
```js
{
  "configuration": {
    "resource": "https://openfn.crm2.smpp.com",
    "apiVersion": "8.2.0",
    "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjlGWERwYmZNRlQyU3ZRdVhoODQ2WVR3RUlCdyIsI"
  }
}
```

#### sample send expression
```js
send({
  entityName: "accounts",
  body: {
        "name": "Open Function",
        "creditonhold": false,
        "address1_latitude": 47.639583,
        "description": "This is the description of the sample account",
        "revenue": 5000000,
        "accountcategorycode": 1
  }
});
```

[Docs](docs/index)


Development
-----------

Clone the repo, run `npm install`.

Run tests using `npm run test` or `npm run test:watch`

Build the project using `make`.
