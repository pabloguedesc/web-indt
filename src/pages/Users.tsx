import { useEffect, useState } from "react";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { usersService } from "../api/users/users.service";
import { IUser } from "../api/users/users.interface";
import { TableComponent } from "../components/users/tables/TableUsers";
import { CreateModalComponent } from "../components/users/modals/create/CreateModal";

export const UsersPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    usersService
      .listUsers()
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h1>Gerenciamento de Usuários</h1>
      <CreateModalComponent
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        updateUserList={fetchUsers}
      />
      <div>
        <Button
          type="primary"
          onClick={() => setIsModalOpen(true)}
          style={{ marginBottom: "1rem" }}
        >
          <PlusCircleOutlined />
          Cadastrar novo
        </Button>
        <TableComponent data={users} updateUserList={fetchUsers} />
      </div>
    </>
  );
};
