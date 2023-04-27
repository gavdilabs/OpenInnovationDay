export interface IUser {
  ID: string;
  createdAt?: Date;
  createdBy?: string;
  modifiedAt?: Date;
  modifiedBy?: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  stage: string;
  criticality: string;
}

export enum Entity {
  User = "schema.User",
}

export enum SanitizedEntity {
  User = "User",
}
