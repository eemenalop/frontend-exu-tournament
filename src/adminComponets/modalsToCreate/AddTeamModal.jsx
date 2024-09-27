import { useState } from "react";
import { BACKEND_URL } from "../../enviroment";

// eslint-disable-next-line react/prop-types
export default function AddTeamModal({ team = null, onClose }) {
  const [teamData, setTeamData] = useState({
    team_name : team?.team_name || "",
    captain: team?.captain || "",
    logo_url: team?.logo_url || ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeamData({
      ...teamData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTeam = {
      ...teamData,
      logo_url: teamData.logo_url || null,
    };

    try {
      const url = team
        ? `${BACKEND_URL}/.netlify/functions/updateTeam/${team.team_id}`
        : `${BACKEND_URL}/.netlify/functions/createTeam`;
      console.log('Request URL:', url);

      const response = await fetch(url, {
        method: team ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTeam),
      });

      if (!response.ok) {
        throw new Error(team ? 'Error updating team' : 'Error creating team');
      }

      onClose(); // Cierra el modal después de un submit exitoso
    } catch (error) {
      console.error('Error submitting team:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">
          {team ? "Editar Equipo" : "Crear Equipo"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="team_name" className="block text-sm font-medium text-gray-700">
              Nombre del Equipo
            </label>
            <input
              type="text"
              id="team_name"
              name="team_name"
              value={teamData.team_name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="captain" className="block text-sm font-medium text-gray-700">
              Capitan
            </label>
            <input
              type="text"
              id="captain"
              name="captain"
              value={teamData.captain}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="logo_url" className="block text-sm font-medium text-gray-700">
              Logo del Equipo (URL opcional)
            </label>
            <input
              type="text"
              id="logo_url"
              name="logo_url"
              value={teamData.logo_url}
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
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md"
            >
              {team ? "Actualizar Equipo" : "Crear Equipo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
