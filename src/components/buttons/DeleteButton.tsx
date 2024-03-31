import { Button, message, Popconfirm } from "antd";

export const DeleteButtonComponent = ({
  onDelete,
}: {
  onDelete: () => void;
}) => {
  const confirm = () => {
    onDelete();
    message.success("Usuário deletado com sucesso!");
  };

  return (
    <Popconfirm
      title="Você tem certeza?"
      onConfirm={confirm}
      okText="Sim"
      cancelText="Não"
    >
      <Button danger>Deletar</Button>
    </Popconfirm>
  );
};
