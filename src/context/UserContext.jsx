import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  // LOGIN
  async function login(emailUtilisateur, motDePasse) {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailUtilisateur,
          password: motDePasse,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return false;
      }

      setToken(data.token);
      setEmail(data.email);
      return true;
    } catch (erreur) {
      console.log("Erreur login :", erreur);
      return false;
    }
  }

  // REGISTER
  async function register(emailUtilisateur, motDePasse) {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailUtilisateur,
          password: motDePasse,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return false;
      }

      setToken(data.token);
      setEmail(data.email);
      return true;
    } catch (erreur) {
      console.log("Erreur register :", erreur);
      return false;
    }
  }

  // LOGOUT
  function logout() {
    setToken(null);
    setEmail(null);
  }

  return (
    <UserContext.Provider value={{ token, email, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
