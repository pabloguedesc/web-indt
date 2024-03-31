interface IUserRole {
  id: string;
  description: string;
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  lastName: string;
  role: IUserRole;
  isActivated: boolean;
}
