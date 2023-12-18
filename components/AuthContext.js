
"use client"
// useAuthContext.js

import { createContext, useContext, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/firebase/config";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    logged: false,
    email: null,
    uid: null,
  });

  const createUser = async (values) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      setUser({
        logged: true,
        email: userCredential.user.email,
        uid: userCredential.user.uid,
      });
      console.log("Usuario creado:", userCredential.user.email);
    } catch (error) {
      console.error("Error al crear el usuario:", error.message);
      // Puedes manejar el error de alguna manera (por ejemplo, mostrar un mensaje al usuario)
    }
  };

  const loginUser = async (values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      setUser({
        logged: true,
        email: userCredential.user.email,
        uid: userCredential.user.uid,
      });
      console.log("Usuario inició sesión:", userCredential.user.email);
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      // Puedes manejar el error de alguna manera (por ejemplo, mostrar un mensaje al usuario)
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser({
        logged: false,
        email: null,
        uid: null,
      });
      console.log("Usuario cerró sesión");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
      // Puedes manejar el error de alguna manera (por ejemplo, mostrar un mensaje al usuario)
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        createUser,
        loginUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
