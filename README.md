Language SMPP [![Build Status](https://travis-ci.org/OpenFn/language-smpp.svg?branch=master)](https://travis-ci.org/OpenFn/language-smpp)
=============

Language Pack for building expressions and operations to make calls to an OpenFn SMPP client API.

Documentation
-------------

#### sample state
```json
{
  "configuration": {
    "system_id": "some_smpp_client_name",
    "password": "password",
    "clientHost": "http://localhost:4000",
    "inbox_uuid": "1c908151-8273-431c-b1d4-blah"
  },
  "data": {
    "from": "taylor",
    "to": "alexis",
    "text": "hi mom!",
    "message_uuid": "0001"
  }
}
```

#### sample send expression
```js
send({
  text: dataValue("text"),
  message_uuid: dataValue("message_uuid"),
  recipient: dataValue("to"),
  sender: dataValue("from")
});
```

[Docs](docs/index)


Development
-----------

Clone the repo, run `npm install`.

Run tests using `npm test` or `npm test watch`

Build the project using `make`.
