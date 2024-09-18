import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../enviroment";

// eslint-disable-next-line react/prop-types
const AddMatchModal = ({ onClose }) => {
  const [matchData, setMatchData] = useState({
    team1_id: "",
    team2_id: "",
    score_team1: "",
    score_team2: "",
    match_date_time: "",
    mode: "",
    match_type: "",
    location: "",
    match_mvp: ""
  });

  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [winningTeamId, setWinningTeamId] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/.netlify/functions/getAllTeams`);
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
    fetchTeam();
  }, []);

  useEffect(() => {
    const detectWinningTeam = () => {
      if (matchData.score_team1 && matchData.score_team2) {
        if (parseInt(matchData.score_team1) > parseInt(matchData.score_team2)) {
          setWinningTeamId(matchData.team1_id);
        } else if (parseInt(matchData.score_team2) > parseInt(matchData.score_team1)) {
          setWinningTeamId(matchData.team2_id);
        } else {
          setWinningTeamId(null);
        }
      }
    }
    detectWinningTeam();
  }, [matchData.score_team1, matchData.score_team2, matchData.team1_id, matchData.team2_id]);

  useEffect(() => {
    if (winningTeamId) {
      const fetchPlayers = async () => {
        try {
          const response = await fetch(`${BACKEND_URL}/.netlify/functions/getAllPlayers?team_id=${winningTeamId}`);
          const data = response.json();
          setPlayers(data);
        } catch (error) {
          console.error('Error fetching players:', error);
        }
      }
      fetchPlayers();
    }
  }, [winningTeamId])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMatchData({
      ...matchData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/.netlify/functions/createMatch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(matchData),
      });

      if (!response.ok) {
        throw new Error('Error creating match');
      }

      onClose();
    } catch (error) {
      console.error('Error creating match:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Crear nuevo Partido</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="team1_id" className="block text-sm font-medium text-gray-700">
              Equipo 1
            </label>
            <select
              id="team1_id"
              name="team1_id"
              value={matchData.team1_id}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="" disabled>Selecciona un equipo</option>
              {teams.map((team) => (
                <option key={team.team_id} value={team.team_id}>
                  {team.team_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="team2_id" className="block text-sm font-medium text-gray-700">
              Equipo 2
            </label>
            <select
              id="team2_id"
              name="team2_id"
              value={matchData.team2_id}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="" disabled>Selecciona un equipo</option>
              {teams.map((team) => (
                <option key={team.team_id} value={team.team_id}>
                  {team.team_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="score_team1" className="block text-sm font-medium text-gray-700">
              Puntaje Equipo 1
            </label>
            <input
              type="number"
              id="score_team1"
              name="score_team1"
              value={matchData.score_team1}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="score_team2" className="block text-sm font-medium text-gray-700">
              Puntaje Equipo 2
            </label>
            <input
              type="number"
              id="score_team2"
              name="score_team2"
              value={matchData.score_team2}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="match_date_time" className="block text-sm font-medium text-gray-700">
              Fecha y Hora del Partido
            </label>
            <input
              type="datetime-local"
              id="match_date_time"
              name="match_date_time"
              value={matchData.match_date_time}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="mode" className="block text-sm font-medium text-gray-700">
              Modo del Partido
            </label>
            <select
              id="mode"
              name="mode"
              value={matchData.mode}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="" disabled>Jornada</option>
              <option value="1ra Jornada">1ra Jornada</option>
              <option value="2da Jornada">2da Jornada</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="match_type" className="block text-sm font-medium text-gray-700">
              Tipo de Partido
            </label>
            <select
              id="match_type"
              name="match_type"
              value={matchData.match_type}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="" disabled>Selecciona el tipo de partido</option>
              <option value="Regular">Regular</option>
              <option value="Semifinal">Semifinal</option>
              <option value="Final">Final</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Ubicación
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={matchData.location}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="match_mvp" className="block text-sm font-medium text-gray-700">
              MVP del Partido (Opcional)
            </label>
            <select
              id="match_mvp"
              name="match_mvp"
              value={matchData.match_mvp}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>Selecciona el MVP del partido</option>
              {players.map((player) =>(
                <option key={player.player_id} value={player.player_id}>
                  {player.player_name}
                </option>
              ))}
            </select>
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
              Crear Partido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMatchModal;
