const nodeZeroTwelve = require('./0_12');
const nodeFiveEs5 = require('./node_5_es5');
const nodeFiveEs6 = require('./node_5_es6');
const jsIsomorphic = require('./js_isomorphic');
const propTypes = require('./prop_types');
const nodeGraphQL = require('./node_graphql');
const tsConstants = require('./ts_constants');
const jsdoc = require('./jsdoc');

const generators = {
  node_0_12: {
    key: 'node_0_12',
    name: 'Node (0.12.x)',
    language: 'JavaScript',
    description: 'Node client using the request http lib',
    attributes: [],
    generator: nodeZeroTwelve,
  },

  node_5_es5: {
    key: 'node_5_es5',
    name: 'Node (5.x.x)',
    language: 'JavaScript',
    description: 'Node 5 client - compiled version of node_5_es6',
    attributes: [],
    generator: nodeFiveEs5,
  },

  node_5_es6: {
    key: 'node_5_es6',
    name: 'Node (5.x.x) ES6 / Babel',
    language: 'JavaScript',
    description: 'Node 5 client written in ES6 (requires babel or other compiler)',
    attributes: [],
    generator: nodeFiveEs6,
  },

  js_isomorphic: {
    key: 'js_isomorphic',
    name: 'Javascript (Isomorphic)',
    language: 'JavaScript',
    description: 'Node 6 client written in ES6 (requires babel or other compiler).',
    attributes: [],
    generator: jsIsomorphic,
  },

  prop_types: {
    key: 'prop_types',
    name: 'React PropTypes',
    language: 'JavaScript',
    description: 'React PropTypes using es2017. Utilizes the `prop-types` npm module',
    attributes: [],
    generator: propTypes,
  },

  ts_constants: {
    key: 'ts_constants',
    name: 'TypeScript Constants',
    description: 'Constant definitions using TypeScript',
    attributes: [],
    generator: tsConstants,
  },

  jsdoc: {
    key: 'jsdoc',
    name: 'JSDoc 3 Type Definitions',
    description: 'JSDoc 3 type definitions for your ApiBuilder entities',
    attributes: [],
    generator: jsdoc,
  },
};

module.exports = generators;
