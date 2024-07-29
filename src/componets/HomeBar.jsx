import { useState } from "react";

function HomeBar() {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

  return (
    <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/path/to/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
        <span className="font-bold text-xl">Basketball Tournament</span>
      </div>

      {/* Navbar */}
      
          <button className="block lg:hidden focus:outline-none" onClick={toggleMenu}>
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
              
        </button>
      <nav className={`flex flex-col lg:flex-row lg:space-x-4 transition-all duration-300 ${menuOpen ? 'block' : 'hidden'} lg:block`}>
        <a href="#" className="hover:text-gray-300">Inicio</a>
        <a href="#" className="hover:text-gray-300">Equipos</a>
        <a href="#" className="hover:text-gray-300">Calendario</a>
        <a href="#" className="hover:text-gray-300">Estadisticas</a>
        <a href="#" className="hover:text-gray-300">Statistics</a>
        <a href="#" className="hover:text-gray-300">Contact</a>
      </nav>
    </div>
  );
}

export default HomeBar;
