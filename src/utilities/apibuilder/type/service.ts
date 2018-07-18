import { find, flatMap, map, matchesProperty, memoize, overSome, property } from 'lodash';
import {
  ApiBuilderEnum,
  ApiBuilderImport,
  ApiBuilderModel,
  ApiBuilderResource,
  ApiBuilderType,
  ApiBuilderUnion,
} from '.';

function findTypeByName(types: ApiBuilderType[], name: string) {
  return find(types, overSome([
    matchesProperty('shortName', name),
    matchesProperty('baseType', name),
  ]));
}

const mapToEnumType = memoize((schema, service) => {
  return ApiBuilderEnum.fromSchema(schema, service);
});

const mapToModelType = memoize((schema, service) => {
  return ApiBuilderModel.fromSchema(schema, service);
});

const mapToUnionType = memoize((schema, service) => {
  return ApiBuilderUnion.fromSchema(schema, service);
});

/**
 * Wraps an apibuilder service definition and provides utilities for
 * interacting with it.
 *
 * @prop {ApiBuilderResource[]} resources
 */
export class ApiBuilderService {
  schema: any;

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
    return map(this.schema.imports, (schema) =>
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
    return map(this.schema.enums, (enumeration) =>
      mapToEnumType(enumeration, this));
  }

  get internalModels() {
    return map(this.schema.models, (model) =>
      mapToModelType(model, this));
  }

  get internalUnions() {
    return map(this.schema.unions, (union) =>
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
    return flatMap(this.imports, (im) => im.enums);
  }

  get externalModels() {
    return flatMap(this.imports, (im) => im.models);
  }

  get externalUnions() {
    return flatMap(this.imports, (im) => im.unions);
  }

  get externalTypes() {
    return [
      ...this.externalEnums,
      ...this.externalModels,
      ...this.externalUnions,
    ];
  }

  get resources() {
    return map(this.schema.resources, (res) => new ApiBuilderResource(res, this));
  }

  get baseUrl() {
    return this.schema.base_url;
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
