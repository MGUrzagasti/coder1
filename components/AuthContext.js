"use client"

// useAuthContext.js
import { createContext, useContext, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "@/firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    logged: false,
    email: null,
    uid: null,
    role: "user", // Establece un rol predeterminado
  });

  const createUser = async (values) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      // Almacena información adicional sobre el usuario en Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "admin", // Puedes cambiar esto según tus necesidades
      });

      setUser({
        logged: true,
        email: user.email,
        uid: user.uid,
        role: "admin",
      });

      console.log("Usuario creado:", user.email);
    } catch (error) {
      console.error("Error al crear el usuario:", error.message);
    }
  };

  const loginUser = async (values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      // Consulta Firestore para obtener información adicional sobre el usuario
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      setUser({
        logged: true,
        email: user.email,
        uid: user.uid,
        role: userData.role || "user", // Asigna un valor predeterminado si no hay información de rol
      });

      console.log("Usuario inició sesión:", user.email);
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser({
        logged: false,
        email: null,
        uid: null,
        role: "user",
      });
      console.log("Usuario cerró sesión");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
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
