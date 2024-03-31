import { useEffect, useState } from "react";
import { PieChartComponent } from "../components/dashboard/PieChart";
import { usersService } from "../api/users/users.service";
import { ICountUsersResponseDto } from "../api/users/users.dto";
import { FilterSelectComponent } from "../components/dashboard/FilterSelect";

export const DashboardPage = () => {
  const [countUsers, setCountUsers] = useState<ICountUsersResponseDto>({
    totalActivated: 0,
    totalDeactivated: 0,
    totalUsers: 0,
    totalPerRole: [
      { role: "admin", totalActivated: 0, totalDeactivated: 0 },
      { role: "common", totalActivated: 0, totalDeactivated: 0 },
    ],
  });

  const [data, setData] = useState([
    { name: "Total Ativo", value: countUsers.totalActivated },
    { name: "Total Desativado", value: countUsers.totalDeactivated },
  ]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    usersService
      .countUsers()
      .then((response) => {
        setCountUsers(response.data);
        setData([
          { name: "Total Ativo", value: response.data.totalActivated },
          { name: "Total Desativado", value: response.data.totalDeactivated },
        ]);
      })
      .catch((error) => console.log(error));
  };

  const handleFilterChange = (selectedFilter: "all" | "admin" | "common") => {
    if (selectedFilter === "admin") {
      setData([
        {
          name: "Administradores Ativos",
          value:
            countUsers.totalPerRole.find((role) => role.role === "admin")
              ?.totalActivated || 0,
        },
        {
          name: "Administradores Desativados",
          value:
            countUsers.totalPerRole.find((role) => role.role === "admin")
              ?.totalDeactivated || 0,
        },
      ]);
    } else if (selectedFilter === "common") {
      setData([
        {
          name: "Comuns Ativos",
          value:
            countUsers.totalPerRole.find((role) => role.role === "common")
              ?.totalActivated || 0,
        },
        {
          name: "Comuns Desativados",
          value:
            countUsers.totalPerRole.find((role) => role.role === "common")
              ?.totalDeactivated || 0,
        },
      ]);
    } else {
      setData([
        {
          name: "Total Ativo",
          value: countUsers.totalActivated,
        },
        {
          name: "Total Desativado",
          value: countUsers.totalDeactivated,
        },
      ]);
    }
  };

  return (
    <div>
      <h1>Gráfico de Usuários Ativos e Desativados</h1>
      <FilterSelectComponent onFilterChange={handleFilterChange} />
      <div>
        <PieChartComponent data={data} />
      </div>
    </div>
  );
};
