import { useEffect, useState } from "react";
import { Button, Space, Table, TableProps, message } from "antd";
import { IUser } from "../../../api/users/users.interface";
import { EditModalComponent } from "../modals/editModal/EditModal";
import { DeleteButtonComponent } from "../../buttons/DeleteButton";
import { usersService } from "../../../api/users/users.service";

export const TableComponent = ({
  data,
  updateUserList,
}: {
  data: IUser[];
  updateUserList: () => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const openModal = (user: IUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const deleteUser = async (id: string) => {
    try {
      await usersService.deleteUser(id);
      updateUserList();
      message.success("Usuário deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar usuário", error);
      message.error("Erro ao deletar usuário");
    }
  };

  useEffect(() => {}, [updateUserList]);

  const columns: TableProps<IUser>["columns"] = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Sobrenome",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Cargo",
      key: "role",
      render: (_, { role }) => role.description,
    },
    {
      title: "Status",
      key: "status",
      render: (_, { isActivated }) => (isActivated ? "ATIVO" : "DESATIVADO"),
    },
    {
      title: "Ação",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="dashed" onClick={() => openModal(record)}>
            Editar
          </Button>
          <DeleteButtonComponent onDelete={() => deleteUser(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      {selectedUser && (
        <EditModalComponent
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedUser={selectedUser}
          updateUserList={updateUserList}
        />
      )}
    </>
  );
};
