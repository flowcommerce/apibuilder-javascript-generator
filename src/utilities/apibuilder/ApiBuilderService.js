const find = require('lodash/find');
const flatMap = require('lodash/flatMap');
const map = require('lodash/map');
const matchesProperty = require('lodash/matchesProperty');
const memoize = require('lodash/memoize');
const overSome = require('lodash/overSome');
const property = require('lodash/property');

const ApiBuilderEnum = require('./ApiBuilderEnum');
const ApiBuilderModel = require('./ApiBuilderModel');
const ApiBuilderUnion = require('./ApiBuilderUnion');
const ApiBuilderImport = require('./ApiBuilderImport');

const mapToEnumType = memoize((schema, service, namespace) =>
  ApiBuilderEnum.fromSchema(schema, service, namespace));

const mapToModelType = memoize((schema, service, namespace) =>
  ApiBuilderModel.fromSchema(schema, service, namespace));

const mapToUnionType = memoize((schema, service, namespace) =>
  ApiBuilderUnion.fromSchema(schema, service, namespace));

function findTypeByName(types, name) {
  return find(types, overSome([
    matchesProperty('shortName', name),
    matchesProperty('baseType', name),
  ]));
}

/**
 * @class ApiBuilderService
 * Wraps an apibuilder service definition and provides utilities for interacting with it.
 */
class ApiBuilderService {
  constructor({ service: schema }) {
    this.schema = schema;
  }

  get name() {
    return this.schema.name;
  }

  get namespace() {
    return this.schema.namespace;
  }

  get version() {
    return this.schema.version;
  }

  get applicationKey() {
    return this.schema.application.key;
  }

  get organizationKey() {
    return this.schema.organization.key;
  }

  get imports() {
    return map(this.schema.imports, schema =>
      ApiBuilderImport.fromSchema(schema, this));
  }

  get enums() {
    return [
      ...this.internalEnums,
      ...this.externalEnums,
    ];
  }

  get models() {
    return [
      ...this.internalModels,
      ...this.externalModels,
    ];
  }

  get unions() {
    return [
      ...this.internalUnions,
      ...this.externalUnions,
    ];
  }

  get types() {
    return [
      ...this.internalTypes,
      ...this.externalTypes,
    ];
  }

  get internalEnums() {
    return map(this.schema.enums, enumeration =>
      mapToEnumType(enumeration, this));
  }

  get internalModels() {
    return map(this.schema.models, model =>
      mapToModelType(model, this));
  }

  get internalUnions() {
    return map(this.schema.unions, union =>
      mapToUnionType(union, this));
  }

  get internalTypes() {
    return [
      ...this.internalEnums,
      ...this.internalModels,
      ...this.internalUnions,
    ];
  }

  get externalEnums() {
    return flatMap(this.imports, property('enums'));
  }

  get externalModels() {
    return flatMap(this.imports, property('models'));
  }

  get externalUnions() {
    return flatMap(this.imports, property('unions'));
  }

  get externalTypes() {
    return [
      ...this.externalEnums,
      ...this.externalModels,
      ...this.externalUnions,
    ];
  }

  findModelByName(name) {
    return findTypeByName(this.models, name);
  }

  findEnumByName(name) {
    return findTypeByName(this.enums, name);
  }

  findUnionByName(name) {
    return findTypeByName(this.unions, name);
  }

  toString() {
    return `${this.applicationKey}@${this.version}`;
  }
}

module.exports = ApiBuilderService;
