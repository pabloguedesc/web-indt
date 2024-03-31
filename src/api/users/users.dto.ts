export interface CreateUserDto {
  name: string;
  lastName: string;
  email: string;
  password: string;
  roleId: string;
}

export interface UpdateUserDto {
  id: string;
  name: string;
  lastName: string;
  email: string;
  roleId: string;
  isActivated: boolean;
}

interface ITotalPerRole {
  role: string;
  totalActivated: number;
  totalDeactivated: number;
}

export interface ICountUsersResponseDto {
  totalUsers: number;
  totalActivated: number;
  totalDeactivated: number;
  totalPerRole: ITotalPerRole[];
}
