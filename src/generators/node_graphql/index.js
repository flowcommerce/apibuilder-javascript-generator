const log = require('debug')('apibuilder:graphql');

const { ApiBuilderService } = require('../../utilities/apibuilder');
const { generateFile: generateEnumFile } = require('./generators/enumeration');
const { generateFile: generateModelFile } = require('./generators/model');
const { generateFile: generateUnionFile } = require('./generators/union');
const { generateFile: generateSchemaFile } = require('./generators/schema');
const { generateFiles: generateScalars } = require('./generators/scalars');

function generate({ service: data }) {
  const service = new ApiBuilderService({ service: data });

  let files = [];

  // Generate GraphQL Schema Types
  files = files.concat(service.internalEnums.map(generateEnumFile));
  files = files.concat(service.internalModels.map(generateModelFile));
  files = files.concat(service.internalUnions.map(generateUnionFile));
  files = files.concat(generateSchemaFile(service));
  files = files.concat(generateScalars(service));

  files = files.filter(f => f != null);

  log('✅ done');

  return Promise.resolve(files);
}

module.exports = { generate };
