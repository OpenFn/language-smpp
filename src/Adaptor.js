import { execute as commonExecute, expandReferences } from 'language-common';
import request from 'request';
import { resolve as resolveUrl } from 'url';

/** @module Adaptor */

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for http.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @constructor
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null
  }

  return state => {
    return commonExecute(...operations)({ ...initialState, ...state })
  };

}


export function send(params) {

  return state => {

    function assembleError({ response, error }) {
      if (response && ([200,201,202,204].indexOf(response.statusCode) > -1)) return false;
      if (error) return error;
      return new Error(`Server responded with ${response.statusCode}`)
    }

    const { resource, accessToken, apiVersion } = state.configuration;

    const { entityName, body } = expandReferences(params)(state);

    const url = `${resource}/api/data/v${apiVersion}/${entityName}`;

    const headers = {
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0',
      'Content-Type': 'application/json',
      'Authorization': accessToken
    };

    console.log("Posting to url: " + url);
    console.log("With body: " + JSON.stringify(body, null, 2));


    return new Promise((resolve, reject) => {
      request.post ({
        url: url,
        json: body,
        headers
      }, function(error, response, body){
        error = assembleError({response, error})
        if(error) {
          reject(error);
        } else {
          console.log("Create entity succeeded.");
          console.log(body)
          resolve(body);
        }
      })
    }).then((data) => {
      const nextState = { ...state, response: { body: data } };
      return nextState;
    })

  };

};

export {
  field, fields, sourceValue, alterState, each,
  merge, dataPath, dataValue, lastReferenceValue
} from 'language-common';
