import { useState, useEffect } from "react";

function HomeBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleResize = () => {
      if (mediaQuery.matches) {
        setMenuOpen(false); 
      }
    };
    mediaQuery.addEventListener("change", handleResize);
    handleResize();
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <div className=" top-0 left-0 right-0 z-50 flex items-center justify-between p-5 m bg-slate-500 bg-opacity-90 text-white">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/path/to/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
        <span className="font-bold text-xl">Basketball Tournament</span>
      </div>

      {/* Button for Mobile Menu */}
      <button className="block lg:hidden focus:outline-none" onClick={toggleMenu}>
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <nav className={`fixed inset-0 flex flex-col items-center justify-center bg-slate-500 text-white transition-transform duration-300  ${menuOpen ? 'translate-x-0 translate-y-0' : 'translate-x-full translate-y-[-100%]'} lg:hidden`}>
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-white text-3xl" onClick={toggleMenu}>
          &times; {/* This is the "X" symbol for closing */}
        </button>
        <a href="#" className="text-xl mb-4 hover:text-gray-300">Inicio</a>
        <a href="#" className="text-xl mb-4 hover:text-gray-300">Equipos</a>
        <a href="#" className="text-xl mb-4 hover:text-gray-300">Calendario</a>
        <a href="#" className="text-xl mb-4 hover:text-gray-300">Estadisticas</a>
        <a href="#" className="text-xl mb-4 hover:text-gray-300">Statistics</a>
        <a href="#" className="text-xl mb-4 hover:text-gray-300">Contact</a>
      </nav>

      {/* Desktop Menu */}
      <nav className="hidden lg:flex lg:flex-row lg:space-x-4">
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
