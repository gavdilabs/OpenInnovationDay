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
  rulesets?: IRulesSetCountry[];
}

export interface IGroup {
  createdAt?: Date;
  createdBy?: string;
  modifiedAt?: Date;
  modifiedBy?: string;
  ID: string;
  name: string;
  countries?: ICountryToGroup[];
  rulesets?: IRulesSetGroup[];
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
}

export interface IRulesSetCountry {
  createdAt?: Date;
  createdBy?: string;
  modifiedAt?: Date;
  modifiedBy?: string;
  ID: string;
  ruleID: string;
  countryID: string;
  title: string;
  country?: ICountry;
  rule?: IRule;
  dataentries?: IRulesEntry[];
}

export interface IRulesSetGroup {
  createdAt?: Date;
  createdBy?: string;
  modifiedAt?: Date;
  modifiedBy?: string;
  ID: string;
  ruleID: string;
  groupID: string;
  title: string;
  group?: IGroup;
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
  RulesSetCountry = "schema.RulesSetCountry",
  RulesSetGroup = "schema.RulesSetGroup",
  RulesEntry = "schema.RulesEntry",
}

export enum SanitizedEntity {
  User = "User",
  Country = "Country",
  Group = "Group",
  CountryToGroup = "CountryToGroup",
  Rule = "Rule",
  RulesSetCountry = "RulesSetCountry",
  RulesSetGroup = "RulesSetGroup",
  RulesEntry = "RulesEntry",
}
