const schema = require('./fixtures/petstore.json');
const getRequestOptions = require('../');
const assert = require('assert');
const request = require('request');
let requestOptions;

describe('build options by endpoint', () => {
  it('body json', () => {
    const path = '/pet';
    const endpoint = schema.paths[path].post;
    const args = {
      body: {name: 'test'}
    };
    const options = {
      method: 'post',
      baseUrl: `http://${schema.host}${schema.basePath}`,
      path: path,
      args: args,
    };
    requestOptions = getRequestOptions(endpoint, options);
    assert.equal(requestOptions.url, 'http://petstore.swagger.io/v2/pet');
    assert.deepEqual(requestOptions.body, { name: 'test' });
  });

  it('test with request', (done) => {
    request(requestOptions, (err, data) => {
      if (err) return done(err);
      assert(typeof data.body, 'object');
      done();
    });
  });
});

