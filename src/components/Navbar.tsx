import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Computo en la  nube ;)</Link>
        <div>
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center">
                <User className="mr-2" size={20} />
                Dashboard
              </Link>
              <button className="flex items-center">
                <LogOut className="mr-2" size={20} />
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="hover:underline">Iniciar sesión</Link>
              <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100">Registrarse</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;