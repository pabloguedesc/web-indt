import { useLocation } from "react-router-dom";

export const ErrorPage = () => {
  const location = useLocation();
  const state = location.state as { errorType?: string };

  return (
    <>
      {state?.errorType === "unauthorized" ? (
        <>Erro 401: Acesso não autorizado</>
      ) : (
        <>Erro 404: Página não encontrada</>
      )}
    </>
  );
};
