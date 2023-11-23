"use client"
// components/Login.js
import { useState } from 'react';
import Register from './register';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // El inicio de sesión fue exitoso, puedes redirigir o manejar según tus necesidades
        console.log('Inicio de sesión exitoso');
      } else {
        // Muestra un mensaje de error en caso de que algo salga mal
        console.error('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };

  const handleRegister = () => {
    // Lógica de registro (puedes implementarla según tus necesidades)
    console.log('Registrarse');
    <Register />
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-teal-500 p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Iniciar sesión</h2>
        {error && (
          <div className="mb-4 text-red-500">
            <p>{error}</p>
          </div>
        )}
        <form  onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="flex justify-between items-center">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Iniciar sesión
            </button>
            <span className="text-sm">
              ¿No tienes una cuenta?{' '}
              <button onClick={handleRegister} className="text-black">
                Registrarse
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
