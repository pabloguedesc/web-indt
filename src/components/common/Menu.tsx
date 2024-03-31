import { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { path } from "../../utils/path";

const { Sider } = Layout;

export const MenuComponent = ({ isOpen }: { isOpen: boolean }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsCollapsed(isOpen);
  }, [isOpen]);

  const menuItems = [
    {
      key: path.dashboardPage,
      icon: <BarChartOutlined />,
      label: "Dashboard",
      onClick: () => navigate(path.dashboardPage),
    },
    {
      key: path.usersPage,
      icon: <UserOutlined />,
      label: "Usuários",
      onClick: () => navigate(path.usersPage),
    },
    {
      key: "logOut",
      icon: <LogoutOutlined />,
      label: "Sair",
      onClick: () => {
        localStorage.removeItem("token");
        navigate(path.loginPage);
      },
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={isCollapsed}
      style={{ height: "100vh" }}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[window.location.pathname]}
        items={menuItems.map((item) => ({ ...item, onClick: item.onClick }))}
      />
    </Sider>
  );
};
