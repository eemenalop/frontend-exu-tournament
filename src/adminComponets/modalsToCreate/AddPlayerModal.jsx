import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../enviroment";

// eslint-disable-next-line react/prop-types
export default function AddTeamModal({ onClose }) {
  const [playerData, setPlayerData] = useState({
    player_name: "",
    team_id: "",
    position: "",
    number: "",
    player_photo: ""
  });
    
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/.netlify/functions/getAllTeams`)
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    }
    fetchTeam();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlayerData({
      ...playerData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPlayer = {
      ...playerData,
      player_photo: playerData.player_photo || null,
    };

    try {
      const response = await fetch(`${BACKEND_URL}/.netlify/functions/createPlayer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlayer),
      });

      if (!response.ok) {
        throw new Error('Error creating player');
      }

      onClose(); 
    } catch (error) {
      console.error('Error creating player:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Crear nuevo Jugador</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="player_name" className="block text-sm font-medium text-gray-700">
              Player Name
            </label>
            <input
              type="text"
              id="player_name"
              name="player_name"
              value={playerData.player_name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="team_id" className="block text-sm font-medium text-gray-700">
              Equipo
            </label>
            <select
              id="team_id"
              name="team_id"
              value={playerData.team_id}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="" disabled>Selecciona un equipo</option>
              {teams.length > 0 ? (
                teams.map((team) => (
                  <option key={team.team_id} value={team.team_id}>
                    {team.team_name}
                  </option>
                ))
              ) : (
                <option disabled>No hay equipos disponibles</option>
              )}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              Position
            </label>
            <select
              id="position"
              name="position"
              value={playerData.position}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
            >
                          <option value="" disabled>Selecciona una posicion</option>
                          <option value="PG">PG</option>
                          <option value="SG">SG</option>
                          <option value="SF">SF</option>
                          <option value="PF">PF</option>
                          <option value="C">C</option>
            </select>
          </div>
          <div className="mb-4">
                <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                Number
                </label>
                <input
                type="number"
                id="number"
                name="number"
                value={playerData.number}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          required
                          min={0}
                          max={99}
                />
          </div>
          <div className="mb-4">
            <label htmlFor="player_photo" className="block text-sm font-medium text-gray-700">
              Player Photo URL (Optional)
            </label>
            <input
              type="text"
              id="player_photo"
              name="player_photo"
              value={playerData.player_photo}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md"
            >
              Add Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
