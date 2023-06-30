export interface IUser {
  createdAt?: Date;
  createdBy?: string;
  modifiedAt?: Date;
  modifiedBy?: string;
  ID: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
}

export interface ICountry {
  createdAt?: Date;
  createdBy?: string;
  modifiedAt?: Date;
  modifiedBy?: string;
  ID: string;
  name: string;
  countryCode: string;
  groups?: ICountryToGroup[];
  rulesets?: IRulesSet[];
}

export interface IGroup {
  createdAt?: Date;
  createdBy?: string;
  modifiedAt?: Date;
  modifiedBy?: string;
  ID: string;
  name: string;
  countries?: ICountryToGroup[];
  rulesets?: IRulesSet[];
}

export interface ICountryToGroup {
  createdAt?: Date;
  createdBy?: string;
  modifiedAt?: Date;
  modifiedBy?: string;
  ID: string;
  name: string;
  groupID: string;
  countryID: string;
  group?: IGroup;
  country?: ICountry;
}

export interface IRule {
  createdAt?: Date;
  createdBy?: string;
  modifiedAt?: Date;
  modifiedBy?: string;
  ID: string;
  name: string;
  rulesets?: IRulesSet[];
}

export interface IRulesSet {
  createdAt?: Date;
  createdBy?: string;
  modifiedAt?: Date;
  modifiedBy?: string;
  ID: string;
  ruleID: string;
  targetID: string;
  targetType: string;
  title: string;
  rule?: IRule;
  dataentries?: IRulesEntry[];
}

export interface IRulesEntry {
  createdAt?: Date;
  createdBy?: string;
  modifiedAt?: Date;
  modifiedBy?: string;
  ID: string;
  rulesetID: string;
  dataentry: string;
}

export enum Entity {
  User = "schema.User",
  Country = "schema.Country",
  Group = "schema.Group",
  CountryToGroup = "schema.CountryToGroup",
  Rule = "schema.Rule",
  RulesSet = "schema.RulesSet",
  RulesEntry = "schema.RulesEntry",
}

export enum SanitizedEntity {
  User = "User",
  Country = "Country",
  Group = "Group",
  CountryToGroup = "CountryToGroup",
  Rule = "Rule",
  RulesSet = "RulesSet",
  RulesEntry = "RulesEntry",
}
