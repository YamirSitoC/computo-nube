import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, UserPlus, LogIn } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Bienvenido a EmilioCompany</h1>
      <p className="text-xl mb-8">Tu plataforma para subir tus archivos</p>
      <div className="flex justify-center space-x-4">
        <Link to="/register" className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
          <UserPlus className="mr-2" size={24} />
          Registrarse
        </Link>
        <Link to="/login" className="flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300">
          <LogIn className="mr-2" size={24} />
          Iniciar sesión
        </Link>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Características principales</h2>
        <div className="flex justify-center space-x-8">
          <div className="flex flex-col items-center">
            <Upload size={48} className="text-blue-600 mb-2" />
            <h3 className="text-lg font-medium">Subida de archivos</h3>
            <p className="text-gray-600">Sube tus archivos a la nube de forma segura</p>
          </div>
          <div className="flex flex-col items-center">
            <UserPlus size={48} className="text-green-600 mb-2" />
            <h3 className="text-lg font-medium">Gestión de usuarios</h3>
            <p className="text-gray-600">Registra y administra tu cuenta fácilmente</p>
          </div>
          <div className="flex flex-col items-center">
            <LogIn size={48} className="text-purple-600 mb-2" />
            <h3 className="text-lg font-medium">Acceso seguro</h3>
            <p className="text-gray-600">Inicia sesión de forma segura en tu cuenta</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;