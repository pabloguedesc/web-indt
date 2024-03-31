import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Switch, message } from "antd";
import { IRole } from "../../../../api/roles/roles.interface";
import { rolesService } from "../../../../api/roles/roles.service";
import { usersService } from "../../../../api/users/users.service";
import { IUser } from "../../../../api/users/users.interface";
import { UpdateUserDto } from "../../../../api/users/users.dto";

interface EditUserFormComponentProps {
  onUserEditSuccess: () => void;
  selectedUser: IUser;
}

export const EditUserFormComponent: React.FC<EditUserFormComponentProps> = ({
  onUserEditSuccess,
  selectedUser,
}) => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    rolesService
      .listRoles()
      .then((response) => {
        setRoles(response.data);
        form.setFieldsValue({
          name: selectedUser.name,
          lastName: selectedUser.lastName,
          email: selectedUser.email,
          roleId: selectedUser.role.id,
          isActivated: selectedUser.isActivated,
        });
      })
      .catch((error) => console.log(error));
  }, [selectedUser, form]);

  const onFinish = async (values: UpdateUserDto) => {
    try {
      await usersService.updateUser({
        id: selectedUser.id,
        name: values.name,
        lastName: values.lastName,
        email: values.email,
        roleId: values.roleId,
        isActivated: values.isActivated,
      });
      message.success("Usuário atualizado com sucesso!");
      onUserEditSuccess();
    } catch (error) {
      message.error(`Erro ao atualizar o usuário: ${error}`);
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: 400, margin: "auto" }}
    >
      <Form.Item
        label="Nome"
        name="name"
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
          { type: "email", message: "O formato do e-mail é inválido!" },
          { required: true, message: "Por favor, insira o e-mail!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Cargo"
        name="roleId"
        rules={[{ required: true, message: "Por favor, selecione um cargo!" }]}
      >
        <Select placeholder="Selecione um cargo">
          {roles.map((role) => (
            <Select.Option key={role.id} value={role.id}>
              {role.description}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Ativo" name="isActivated" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Atualizar
        </Button>
      </Form.Item>
    </Form>
  );
};
