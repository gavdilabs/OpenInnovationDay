export interface IRoles {
  userId: string;
  roles: unknown[];
}

export interface IPermissions {
  userId: string;
  roles: unknown[];
}

export interface IUser {
  userId: string;
  firstName: string;
  lastName: string;
}

export interface IPhoto {
  userId: string;
  photoType: number;
  photo: Buffer;
}

export enum Entity {
  Roles = "EasyPermissionService.Roles",
  Permissions = "EasyPermissionService.Permissions",
  User = "EasyPermissionService.User",
  Photo = "EasyPermissionService.Photo",
}

export enum SanitizedEntity {
  Roles = "Roles",
  Permissions = "Permissions",
  User = "User",
  Photo = "Photo",
}
