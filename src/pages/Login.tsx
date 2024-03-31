/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Form, Input, Button, message } from "antd";
import { authServices } from "../api/auth/auth.service";
import { useNavigate } from "react-router-dom";
import { path } from "../utils/path";

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: LoginFormValues) => {
    authServices
      .login(values)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate(path.commonUserPage);
      })
      .catch((error) => {
        if (error.response.data.statusCode === 401) {
          message.error("Credenciais inválidas");
        }
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#04115a",
      }}
    >
      <div
        style={{ backgroundColor: "white", padding: "2rem", borderRadius: 5 }}
      >
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          style={{ width: "25rem" }}
        >
          <h1 style={{ textAlign: "center" }}>LOGIN</h1>
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor, insira seu e-mail!",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[
              { required: true, message: "Por favor, insira sua senha!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
