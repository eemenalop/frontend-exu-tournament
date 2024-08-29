import { useState } from "react";
import { teamLogos } from "../teamLogos";

function Logos() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClick = (index) => {
    if (selectedIndex === index) {
      // Si se hace clic en la misma imagen, navegar a otra página
      console.log("Navigate to another page");
    } else {
      setSelectedIndex(index);
    }
  };

  return (
    <>
      <h2 className="text-white">Equipos</h2>
      <div className="grid grid-cols-2 gap-2 p-2 w-full max-w-md mx-auto mt-24 mb-4">
        {teamLogos.map((team, index) => (
          <div
            key={team.id}
            className={` ${selectedIndex === index ? "transform scale-105 z-10" : ""}`}
            onClick={() => handleClick(index)}
          >
            <img
              src={team.logo}
              alt={`Team ${team.id}`}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Logos;
