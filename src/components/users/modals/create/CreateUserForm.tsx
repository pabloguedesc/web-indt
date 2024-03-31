/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import { IRole } from "../../../../api/roles/roles.interface";
import { rolesService } from "../../../../api/roles/roles.service";
import { usersService } from "../../../../api/users/users.service";

type FieldType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

type CreateUserFormComponentProps = {
  onUserCreationSuccess: () => void;
};

export const CreateUserFormComponent: React.FC<
  CreateUserFormComponentProps
> = ({ onUserCreationSuccess }) => {
  const [roles, setRoles] = useState<IRole[]>([]);

  useEffect(() => {
    rolesService
      .listRoles()
      .then((response) => setRoles(response.data))
      .catch((error) => console.log(error));
  }, []);

  const onFinish = (values: FieldType) => {
    const createUserDto = {
      name: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      roleId: values.role,
    };

    usersService
      .createNewUser(createUserDto)
      .then(() => {
        message.success("Usuário criado com sucesso!");
        onUserCreationSuccess();
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="createUser"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      style={{ maxWidth: 400, margin: "auto" }}
    >
      <Form.Item
        label="Nome"
        name="firstName"
        rules={[{ required: true, message: "Por favor, insira o nome!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Sobrenome"
        name="lastName"
        rules={[{ required: true, message: "Por favor, insira o sobrenome!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          { type: "email", message: "Formato de e-mail inválido" },
          { required: true, message: "Por favor, insira o e-mail!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Cargo"
        name="role"
        rules={[{ required: true, message: "Por favor, selecione um cargo!" }]}
      >
        <Select placeholder="Selecione um cargo">
          {roles.map((role) => (
            <Select.Option key={role.id} value={role.id}>
              {role.description === "admin" ? "Administrador" : "Comum"}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Senha"
        name="password"
        rules={[
          { required: true, message: "Por favor, insira uma senha!" },
          { min: 8, message: "A senha deve ter no mínimo 8 caracteres!" },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirmar Senha"
        name="confirmPassword"
        dependencies={["password"]}
        hasFeedback
        rules={[
          { required: true, message: "Por favor, confirme a senha!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("As duas senhas que você digitou não coincidem!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Cadastrar
        </Button>
      </Form.Item>
    </Form>
  );
};
