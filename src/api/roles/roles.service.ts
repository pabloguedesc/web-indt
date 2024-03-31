import { AxiosResponse } from "axios";
import { axiosInstance } from "../axios-config";
import { IRole } from "./roles.interface";
const baseURL = "/roles";

class RolesServices {
  async listRoles(): Promise<AxiosResponse<IRole[]>> {
    return axiosInstance.get(baseURL);
  }
}

const rolesService = new RolesServices();

export { rolesService };
