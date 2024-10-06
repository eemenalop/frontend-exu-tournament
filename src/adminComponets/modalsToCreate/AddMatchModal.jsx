import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../enviroment";

// eslint-disable-next-line react/prop-types
const AddMatchModal = ({ match = null, onClose }) => {
  const [matchData, setMatchData] = useState({
    team1_id: match?.team1_id || "",
    team2_id: match?.team2_id || "",
    score_team1: match?.score_team1 || "",
    score_team2: match?.score_team2 || "",
    winner: match?.winner || "",
    match_date_time: match?.match_date_time || "",
    match_type: match?.match_type || "",
    location: match?.location || "",
    mode: match?.mode || "",
    match_mvp: match?.match_mvp || null,
    state: match?.state || "programado",
    team1_q1: match?.team1_q1 || "",
    team2_q1: match?.team2_q1 || "",
    team1_q2: match?.team1_q2 || "",
    team2_q2: match?.team2_q2 || "",
    team1_q3: match?.team1_q3 || "",
    team2_q3: match?.team2_q3 || "",
    team1_q4: match?.team1_q4 || "",
    team2_q4: match?.team2_q4 || "",
    team1_ot1: match?.team1_ot1 || "",
    team2_ot1: match?.team2_ot1 || "",
    team1_ot2: match?.team1_ot2 || "",
    team2_ot2: match?.team2_ot2 || "",
  });

  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [winningTeamId, setWinningTeamId] = useState('');
  const [error, setError] = useState('');

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
      const fetchPlayers = async (winningTeamId) => {
        try {
          const response = await fetch(`${BACKEND_URL}/.netlify/functions/getAllPlayers?team_id=${winningTeamId}`);
          if(!response.ok){
            throw new Error('Error fetching players')
          }
          const data = await response.json();
          setPlayers(data);
        } catch (error) {
          console.error('Error fetching players:', error);
        }
      }
      fetchPlayers(winningTeamId);
    }else{
      setPlayers([]);
    }
  }, [winningTeamId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMatchData({
      ...matchData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMatch = {
      ...matchData,
      match_mvp: matchData.match_mvp || null,
    };

    if (matchData.score_team1 === matchData.score_team2) {
      setError("Los puntajes de ambos equipos no pueden ser iguales.");
      return;
    }
    setError("");

    try { 
      const url = match
        ? `${BACKEND_URL}/.netlify/functions/updateMatch/${match.match_id}`
        : `${BACKEND_URL}/.netlify/functions/createMatch`; 
        console.log('Data to be sent:', newMatch);
      const response = await fetch(url, {
        method: match ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMatch
        ),
      });
      
      if (!response.ok) {
        throw new Error(match ? 'Error updating match' : 'Error creating match');
      }

      onClose();
    } catch (error) {
      console.error('Error creating or updating match:', error);
    }
  };

  useEffect(() => {
    console.log('Match data:', match);
  }, [match]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">{match ? "Editar Partido" : "Crear Nuevo Partido"}</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
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
              disabled={!matchData.team1_id}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="" disabled>Selecciona un equipo</option>
              {teams
              .filter((team)=> Number(team.team_id) !== Number(matchData.team1_id)).map((team) => (
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
            />
          </div>

          <div className="mb-4">
            <label htmlFor="team1_q1" className="block text-sm font-medium text-gray-700">
              Equipo 1 Q1
            </label>
            <input
              type="number"
              id="team1_q1"
              name="team1_q1"
              value={matchData.team1_q1}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="team2_q1" className="block text-sm font-medium text-gray-700">
              Equipo 2 Q1
            </label>
            <input
              type="number"
              id="team2_q1"
              name="team2_q1"
              value={matchData.team2_q1}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="team1_q2" className="block text-sm font-medium text-gray-700">
              Equipo 1 Q2
            </label>
            <input
              type="number"
              id="team1_q2"
              name="team1_q2"
              value={matchData.team1_q2}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="team2_q2" className="block text-sm font-medium text-gray-700">
              Equipo 2 Q2
            </label>
            <input
              type="number"
              id="team2_q2"
              name="team2_q2"
              value={matchData.team2_q2}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="team1_q3" className="block text-sm font-medium text-gray-700">
              Equipo 1 Q3
            </label>
            <input
              type="number"
              id="team1_q3"
              name="team1_q3"
              value={matchData.team1_q3}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="team2_q3" className="block text-sm font-medium text-gray-700">
              Equipo 2 Q3
            </label>
            <input
              type="number"
              id="team2_q3"
              name="team2_q3"
              value={matchData.team2_q3}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="team1_q4" className="block text-sm font-medium text-gray-700">
              Equipo 1 Q4
            </label>
            <input
              type="number"
              id="team1_q4"
              name="team1_q4"
              value={matchData.team1_q4}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="team2_q4" className="block text-sm font-medium text-gray-700">
              Equipo 2 Q4
            </label>
            <input
              type="number"
              id="team2_q4"
              name="team2_q4"
              value={matchData.team2_q4}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="team1_ot1" className="block text-sm font-medium text-gray-700">
              Equipo 1 OT1
            </label>
            <input
              type="number"
              id="team1_ot1"
              name="team1_ot1"
              value={matchData.team1_ot1}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="team2_ot1" className="block text-sm font-medium text-gray-700">
              Equipo 2 OT1
            </label>
            <input
              type="number"
              id="team2_ot1"
              name="team2_ot1"
              value={matchData.team2_ot1}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="match_date_time" className="block text-sm font-medium text-gray-700">
              Fecha y Hora del Partido
            </label>
            <input
              type="date"
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
              MVP del Partido
            </label>
            <select
              type="number"
              id="match_mvp"
              name="match_mvp"
              value={matchData.match_mvp}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>Seleccione un jugador</option>
              {players.map((player) => (
                <option key={player.player_id} value={player.player_id}>
                  {player.player_name}
                </option>
                
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              Estado del partido
            </label>
            <select
              id="state"
              name="state"
              value={matchData.state}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="" disabled>Seleccione un jugador</option>
              <option value="completo">Completo</option>
              <option value="suspendido">Suspendido</option>
              <option value="programado">Programado</option>
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
              {match ? "Actualizar Partido" : "Crear Partido"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMatchModal;
