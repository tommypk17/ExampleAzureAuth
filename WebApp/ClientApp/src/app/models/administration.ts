export interface IRole {
  label: string;
  value: string;
}

export interface IUser {
  id: string;
  email: string;
  name: string;
}

export interface IUserRole {
  id: string;
  displayName: string;
  role: string;
}
