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

export interface IRule {
  createdAt?: Date;
  createdBy?: string;
  modifiedAt?: Date;
  modifiedBy?: string;
  ID: string;
  name: string;
  rulesets?: IRulesSet[];
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

export enum FuncGetCountryGroup {
  name = "GetCountryGroup",
  paramCountryID = "countryID",
}

export interface IFuncGetCountryGroupParams {
  countryID: string;
}

export type FuncGetCountryGroupReturn = string[];

export enum Entity {
  User = "BasicService.User",
  Country = "BasicService.Country",
  Group = "BasicService.Group",
  CountryToGroup = "BasicService.CountryToGroup",
  RulesSet = "BasicService.RulesSet",
  Rule = "BasicService.Rule",
  RulesEntry = "BasicService.RulesEntry",
}

export enum SanitizedEntity {
  User = "User",
  Country = "Country",
  Group = "Group",
  CountryToGroup = "CountryToGroup",
  RulesSet = "RulesSet",
  Rule = "Rule",
  RulesEntry = "RulesEntry",
}
