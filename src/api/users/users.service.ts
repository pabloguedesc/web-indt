import { AxiosResponse } from "axios";
import { axiosInstance } from "../axios-config";
import { IUser } from "./users.interface";
import {
  CreateUserDto,
  ICountUsersResponseDto,
  UpdateUserDto,
} from "./users.dto";
const baseURL = "/users";

class UsersServices {
  async listUsers(): Promise<AxiosResponse<IUser[]>> {
    return axiosInstance.get(baseURL);
  }

  async countUsers(): Promise<AxiosResponse<ICountUsersResponseDto>> {
    return axiosInstance.get(`${baseURL}/count`);
  }

  async createNewUser(
    createUserDto: CreateUserDto
  ): Promise<AxiosResponse<IUser>> {
    return axiosInstance.post(baseURL, createUserDto);
  }

  async updateUser(
    updateUserDto: UpdateUserDto
  ): Promise<AxiosResponse<IUser>> {
    return axiosInstance.put(baseURL, updateUserDto);
  }

  async deleteUser(id: string): Promise<AxiosResponse<IUser>> {
    return axiosInstance.delete(`${baseURL}/${id}`);
  }
}

const usersService = new UsersServices();

export { usersService };
