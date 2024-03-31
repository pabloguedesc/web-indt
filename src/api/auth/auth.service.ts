import { AxiosResponse } from "axios";
import { axiosInstance } from "../axios-config";
import { IAuthDto } from "./auth.dto";

const baseURL = "/auth";

class AuthServices {
  async login(authDto: IAuthDto): Promise<AxiosResponse<{ token: string }>> {
    return axiosInstance.post(baseURL, authDto);
  }

  async validateToken(token: string): Promise<
    AxiosResponse<{
      email: string;
      role: {
        id: string;
        description: string;
      };
      sub: string;
      iat: number;
      exp: number;
    }>
  > {
    return axiosInstance.post(`${baseURL}/validate`, { token });
  }
}

const authServices = new AuthServices();

export { authServices };
