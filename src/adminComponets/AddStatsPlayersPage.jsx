import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../enviroment";

const AddStatsPlayersPage = () => {
  const { match_id } = useParams(); // Obtener el match_id de la URL
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const [playerStats, setPlayerStats] = useState({});

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/.netlify/functions/getPlayersByMatchId?match_id=${match_id}`);
        const data = await response.json();

        setTeam1Players(data.team1Players);
        setTeam2Players(data.team2Players);

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

  const handleStatChange = (playerId, stat, value) => {
    setPlayerStats(prevStats => ({
      ...prevStats,
      [playerId]: {
        ...prevStats[playerId],
        [stat]: parseInt(value),
      },
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/.netlify/functions/createPlayersMatchStats`, {
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

  const renderPlayerRow = (player) => (
    <tr key={player.player_id}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {player.player_name}
      </td>
      {Object.keys(playerStats[player.player_id]).map(stat => (
        <td key={stat} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <input
            type="number"
            value={playerStats[player.player_id][stat] || 0}
            onChange={(e) => handleStatChange(player.player_id, stat, e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </td>
      ))}
    </tr>
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Agregar Estadísticas para el partido {match_id}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Ingrese las estadísticas de los jugadores para ambos equipos.
          </p>
        </div>
      </div>

      {/* Tabla para el equipo 1 */}
      <div className="mt-8 flow-root">
        <h2 className="text-lg font-semibold leading-6 text-gray-900">Equipo 1</h2>
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Jugador</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">PTS</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">AST</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">REB</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">STL</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">BLK</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">TOV</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">FGA</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">FGM</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">3PTA</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">3PTM</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">FTA</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">FTM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {team1Players.map(renderPlayerRow)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla para el equipo 2 */}
      <div className="mt-8 flow-root">
        <h2 className="text-lg font-semibold leading-6 text-gray-900">Equipo 2</h2>
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Jugador</th>
                    {/* Mismas columnas que para el equipo 1 */}
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">PTS</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">AST</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">REB</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">STL</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">BLK</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">TOV</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">FGA</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">FGM</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">3PTA</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">3PTM</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">FTA</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">FTM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {team2Players.map(renderPlayerRow)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => navigate(-1)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
  Cancelar
</button>

      {/* Botón de enviar */}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleSubmit}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Guardar Estadísticas
        </button>
      </div>
    </div>
  );
};

export default AddStatsPlayersPage;
