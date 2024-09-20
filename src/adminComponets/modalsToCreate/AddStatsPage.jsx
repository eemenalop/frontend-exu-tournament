/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../enviroment";

const AddStatsModal = ({ onClose }) => {
  const [matches, setMatches] = useState([]);
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [playersStats, setPlayersStats] = useState([]);
  const [matchType, setMatchType] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/.netlify/functions/getAllMatches`);
        if (!response.ok) throw new Error("Error fetching matches");
        const data = await response.json();
        setMatches(data);
        setFilteredMatches(data);
      } catch (error) {
        console.error("Error fetching matches", error);
      }
    };
    fetchMatches();
  }, []);

  const handleMatchSelect = async (matchId) => {
    setSelectedMatchId(matchId);
    // Lógica para obtener estadísticas de los jugadores del partido seleccionado
    const response = await fetch(`${BACKEND_URL}/.netlify/functions/getAllPlayersMatchesStats?match_id=${matchId}`);
    const data = await response.json();
    setPlayersStats(data);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleMatchTypeChange = (e) => {
    const type = e.target.value;
    setMatchType(type);
    const filtered = matches.filter(match => match.match_type === type || type === "");
    setFilteredMatches(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lógica para enviar las estadísticas al backend
    const response = await fetch(`${BACKEND_URL}/.netlify/functions/createPlayersMatchStats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ match_id: selectedMatchId, playersStats }),
    });
    if (response.ok) {
      // Cierra el modal después de enviar
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-semibold">Agregar Estadísticas</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="match-type">Selecciona el tipo de partido:</label>
            <select id="match-type" onChange={handleMatchTypeChange} value={matchType}>
              <option value="Regular">-- Regular --</option>
              <option value="Semifinal">-- Semifinal --</option>
              <option value="Final">-- Final --</option>
            </select>
          </div>

          <div>
            <label htmlFor="match-select">Selecciona un partido:</label>
            <select id="match-select" onChange={(e) => handleMatchSelect(e.target.value)} disabled={!filteredMatches.length}>
              <option value="">-- Selecciona --</option>
              {filteredMatches.map((match) => (
                <option key={match.match_id} value={match.match_id}>
                  {match.team1.team_name} vs {match.team2.team_name} {match.match_date_time}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="date">Fecha:</label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>

          <div>
            <h3 className="font-semibold">Estadísticas de Jugadores:</h3>
            <table>
              <thead>
                <tr>
                  <th>Jugador</th>
                  <th>Puntos</th>
                  <th>Asistencias</th>
                  {/* Agrega más columnas según sea necesario */}
                </tr>
              </thead>
              <tbody>
                {playersStats.map((player) => (
                  <tr key={player.player_id}>
                    <td>{player.player_name}</td>
                    <td>
                      <input
                        type="number"
                        value={player.points}
                        onChange={(e) => {
                          const updatedStats = playersStats.map((p) => {
                            if (p.player_id === player.player_id) {
                              return { ...p, points: e.target.value };
                            }
                            return p;
                          });
                          setPlayersStats(updatedStats);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={player.assists}
                        onChange={(e) => {
                          const updatedStats = playersStats.map((p) => {
                            if (p.player_id === player.player_id) {
                              return { ...p, assists: e.target.value };
                            }
                            return p;
                          });
                          setPlayersStats(updatedStats);
                        }}
                      />
                    </td>
                    {/* Agrega más columnas según sea necesario */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button type="submit" className="bg-blue-500 text-white rounded mt-4">Guardar Estadísticas</button>
          <button type="button" onClick={onClose} className="bg-gray-300 text-black rounded mt-4 ml-2">Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default AddStatsModal;
