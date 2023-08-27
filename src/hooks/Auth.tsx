/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { cleanLocalStorageLogin, insertLocalStorageLogin } from "../helper";
import { postMethodJSON } from "../api";

// Crie um contexto para armazenar as informações de autenticação
const AuthContext = createContext(null);

// Hook personalizado para acessar o contexto de autenticação
export function useAuth() {
  return useContext(AuthContext);
}

// Componente de provedor de autenticação que envolve sua aplicação
export function AuthProvider({ children }) {
  const [user, setUser] = useState<{ user: string; email: string } | null>(
    JSON.parse(localStorage.getItem("artecal:user"))
  ); // Dados do usuário logado
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("artecal:token"))
  ); // Token de autenticação

  // Função de login que recebe os dados do usuário e o token
  async function login(loginData: any) {
    let error: boolean | {} = false;
    let success;
    const response = await postMethodJSON("user/signin", loginData);

    if (response.status != 200) {
      console.log(response);
      error = {
        type: typeof response?.errorData.message,
        errorData: response?.errorData.message,
      };
      console.log(error);
    } else {
      const { dataResponse } = response;
      setUser({ user: dataResponse.name, email: dataResponse.email });
      setToken(dataResponse.jwtToken);
      insertLocalStorageLogin(
        { user: dataResponse.name, email: dataResponse.email },
        dataResponse.jwtToken
      );
    }

    return { success, error };
  }

  // Função de logout
  function logout() {
    setUser(null);
    setToken(null);
    cleanLocalStorageLogin();
  }

  const value = {
    user,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
