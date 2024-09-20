import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../enviroment";

const AddStatsPlayersPage = () => {
  const { match_id } = useParams(); // Obtener el match_id de la URL
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const [playerStats, setPlayerStats] = useState({});

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        // Obtener los jugadores de ambos equipos, sin importar si tienen estadísticas
        const response = await fetch(`${BACKEND_URL}/.netlify/functions/getAllPlayersMatchesStats?match_id=${match_id}`);
        const data = await response.json();

        setTeam1Players(data.team1Players);
        setTeam2Players(data.team2Players);

        // Inicializar las estadísticas de los jugadores en el estado
        const initialStats = {};
        data.team1Players.concat(data.team2Players).forEach(player => {
          initialStats[player.player_id] = {
            points: 0,
            assists: 0,
            rebounds: 0,
            steals: 0,
            blocks: 0,
            turnovers: 0,
            fga: 0,
            fgm: 0,
            threepta: 0,
            threeptm: 0,
            fta: 0,
            ftm: 0,
          };
        });
        setPlayerStats(initialStats);
      } catch (error) {
        console.error("Error fetching players", error);
      }
    };
    
    fetchPlayers();
  }, [match_id]);

  // Manejar cambios en los inputs de estadísticas
  const handleStatChange = (playerId, stat, value) => {
    setPlayerStats(prevStats => ({
      ...prevStats,
      [playerId]: {
        ...prevStats[playerId],
        [stat]: parseInt(value), // Asegurarse de que el valor sea numérico
      },
    }));
  };

  // Enviar las estadísticas
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/.netlify/functions/createStatsPlayers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ match_id, stats: playerStats }),
      });

      if (response.ok) {
        alert("Estadísticas guardadas correctamente.");
      } else {
        alert("Error al guardar las estadísticas.");
      }
    } catch (error) {
      console.error("Error saving stats", error);
    }
  };

  return (
    <div>
      <h1>Agregar Estadísticas para el partido {match_id}</h1>
      
      {/* Tabla para el equipo 1 */}
      <h2>Equipo 1</h2>
      <table>
        <thead>
          <tr>
            <th>Jugador</th>
            <th>Puntos</th>
            <th>Asistencias</th>
            <th>Rebotes</th>
            <th>Robos</th>
            <th>Bloqueos</th>
            <th>Pérdidas</th>
            <th>Tiros Intentados</th>
            <th>Tiros Encestados</th>
            <th>Triples Intentados</th>
            <th>Triples Encestados</th>
            <th>Tiros Libres Intentados</th>
            <th>Tiros Libres Encestados</th>
          </tr>
        </thead>
        <tbody>
          {team1Players.map(player => (
            <tr key={player.player_id}>
              <td>{player.player_name}</td>
              {Object.keys(playerStats[player.player_id]).map(stat => (
                <td key={stat}>
                  <input
                    type="number"
                    value={playerStats[player.player_id][stat] || 0}
                    onChange={(e) => handleStatChange(player.player_id, stat, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tabla para el equipo 2 */}
      <h2>Equipo 2</h2>
      <table>
        <thead>
          <tr>
            <th>Jugador</th>
            <th>Puntos</th>
            <th>Asistencias</th>
            <th>Rebotes</th>
            <th>Robos</th>
            <th>Bloqueos</th>
            <th>Pérdidas</th>
            <th>Tiros Intentados</th>
            <th>Tiros Encestados</th>
            <th>Triples Intentados</th>
            <th>Triples Encestados</th>
            <th>Tiros Libres Intentados</th>
            <th>Tiros Libres Encestados</th>
          </tr>
        </thead>
        <tbody>
          {team2Players.map(player => (
            <tr key={player.player_id}>
              <td>{player.player_name}</td>
              {Object.keys(playerStats[player.player_id]).map(stat => (
                <td key={stat}>
                  <input
                    type="number"
                    value={playerStats[player.player_id][stat] || 0}
                    onChange={(e) => handleStatChange(player.player_id, stat, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para enviar estadísticas */}
      <button onClick={handleSubmit}>Guardar Estadísticas</button>
    </div>
  );
};

export default AddStatsPlayersPage;
