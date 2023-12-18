
"use client"
import React, { useState } from "react";
import { useAuthContext } from "./AuthContext";

const LoginPage = () => {
  const { createUser, loginUser, logout, user } = useAuthContext();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    // Llama a la función de createUser del contexto
    await createUser(values);
  };

  const handleLogin = async () => {
    // Llama a la función de loginUser del contexto
    await loginUser(values);
  };

  const handleLogout = async () => {
    // Llama a la función de logout del contexto
    await logout();
  };

  return (
    <div className="fixed w-screen h-screen inset-0 z-10 flex justify-center items-center bg-teal-500">
      <form className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Gestión de Sesión</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            required
            placeholder="Tu correo electrónico"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            value={values.password}
            required
            placeholder="Tu contraseña"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {user.logged ? (
          // Si el usuario está autenticado, mostrar el botón de cerrar sesión
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md">
            Cerrar Sesión
          </button>
        ) : (
          // Si el usuario no está autenticado, mostrar los botones de registro e inicio de sesión
          <>
            <button type="button" onClick={handleRegister} className="bg-teal-500 text-white px-4 py-2 rounded-md mr-4">
              Registrarse
            </button>
            <button type="button" onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Iniciar Sesión
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
