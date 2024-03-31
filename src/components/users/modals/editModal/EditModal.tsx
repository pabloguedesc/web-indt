import React, { useState } from "react";
import { Modal } from "antd";
import { IUser } from "../../../../api/users/users.interface";
import { EditUserFormComponent } from "./EditUserForm";

interface EditModalComponentProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  updateUserList: () => void;
  selectedUser: IUser;
}

export const EditModalComponent: React.FC<EditModalComponentProps> = ({
  isModalOpen,
  setIsModalOpen,
  updateUserList,
  selectedUser,
}) => {
  const [formKey, setFormKey] = useState(Date.now());

  const handleCancel = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const onUserEditSuccess = () => {
    setIsModalOpen(false);
    resetForm();
    updateUserList();
  };

  const resetForm = () => {
    setFormKey(Date.now());
  };

  return (
    <Modal
      title="Editar usuário"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <EditUserFormComponent
        key={formKey}
        onUserEditSuccess={onUserEditSuccess}
        selectedUser={selectedUser}
      />
    </Modal>
  );
};
