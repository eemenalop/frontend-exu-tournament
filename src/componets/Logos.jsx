import { useState } from "react";
import logo1 from "../teams_logos/bostonlogo.png";
import logo2 from "../teams_logos/cavslogo.png";
import logo3 from "../teams_logos/gswlogo.png";
import logo4 from "../teams_logos/lakerslogo.png";

function Logos() {
    const [selectedIndex, setSelectedIndex] = useState(null);
  
    const teams = [
      { id: 1, logo: logo1 },
      { id: 2, logo: logo2 },
      { id: 3, logo: logo3 },
      { id: 4, logo: logo4 },
    ];
  
    const handleClick = (index) => {
      if (selectedIndex === index) {
        // Si se hace clic en la misma imagen, navegar a otra página
        console.log("Navigate to another page");
      } else {
        setSelectedIndex(index);
      }
    };
  
    return (
      <div className="grid grid-cols-2 gap-6 p-6 max-w-4xl mx-auto">
        {teams.map((team, index) => (
          <div
            key={team.id}
            className={`relative cursor-pointer transition-transform duration-300 ease-in-out ${
              selectedIndex === index ? "transform scale-105 z-10" : ""
            }`}
            onClick={() => handleClick(index)}
          >
            <img
              src={team.logo}
              alt={`Team ${team.id}`}
              className="w-64 h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>
    );
  }

export default Logos;
