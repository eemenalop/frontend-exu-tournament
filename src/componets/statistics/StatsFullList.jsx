import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar';
import Footer from '../Footer';
import MatchTypeFilter from './MatchTypeFilter';
import StatScopeFilter from './StatScopeFilter';
import { BACKEND_URL } from '../../enviroment';

const StatsFullList = () => {
    const { statType } = useParams();
    const [matchType, setMatchType] = useState('Regular');
    const [statScope, setStatScope] = useState('Per Game');
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                let response;
                if (statScope === 'Per Game') {
                    response = await fetch(`${BACKEND_URL}/.netlify/functions/getTopPlayerStats?match_type=${matchType}&stat_type=${statType}`);
                } else {
                    response = await fetch(`${BACKEND_URL}/.netlify/functions/getAllPlayersMatchesStats?match_type=${matchType}`);
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                if (statScope === 'Totals') {
                    const playerTotals = data.reduce((acc, item) => {
                        const playerId = item.player_id;
                        const playerTeamId = item.player.team_id;

                        let teamName = "";
                        if (playerTeamId === item.match_details.team1.team_id) {
                            teamName = item.match_details.team1.team_name;
                        } else if (playerTeamId === item.match_details.team2.team_id) {
                            teamName = item.match_details.team2.team_name;
                        }

                        if (!acc[playerId]) {
                            acc[playerId] = {
                                player_id: playerId,
                                player_name: item.player.player_name,
                                team_name: teamName,
                                points: 0,
                                assists: 0,
                                rebounds: 0,
                                steals: 0,
                                blocks: 0,
                                turnovers: 0,
                                fouls: 0,
                                pra: 0
                            };
                        }
                        acc[playerId].points += item.points;
                        acc[playerId].assists += item.assists;
                        acc[playerId].rebounds += item.rebounds;
                        acc[playerId].steals += item.steals;
                        acc[playerId].blocks += item.blocks;
                        acc[playerId].turnovers += item.turnovers;
                        acc[playerId].fouls += item.fouls;
                        acc[playerId].pra += item.pra;
                        return acc;
                    }, {});
                    setStats(Object.values(playerTotals));
                } else {
                    // Si está en 'Per Game', se espera que los datos ya estén filtrados por el backend
                    setStats(data);
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, [statType, statScope, matchType]);

    return (
        <>
            <NavBar />
            <div className='px-4 py-6'>
                <div className='h-96 w-full'>
                    <img src="images/Home-Banners/basketball-game-concept.png"
                        alt='Stats component Image'
                        className='h-full w-full object-cover'/>
                </div>
                <h2 className='text-2xl font-semibold mb-4 text-gray-800 text-center'>
                    Estadísticas {statScope}
                </h2>
                <div className='flex justify-start mb-4'>
                    <MatchTypeFilter setSelectedMatchType={setMatchType} />
                    <StatScopeFilter setSelectedStatScope={setStatScope} />
                </div>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Jugador</th>
                            <th className="border border-gray-300 px-4 py-2">Equipo</th>
                            <th className="border border-gray-300 px-4 py-2">PTS</th>
                            <th className="border border-gray-300 px-4 py-2">AST</th>
                            <th className="border border-gray-300 px-4 py-2">REB</th>
                            <th className="border border-gray-300 px-4 py-2">STL</th>
                            <th className="border border-gray-300 px-4 py-2">BLK</th>
                            <th className="border border-gray-300 px-4 py-2">TO</th>
                            <th className="border border-gray-300 px-4 py-2">PF</th>
                            <th className="border border-gray-300 px-4 py-2">PRA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.map((player, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 px-4 py-2">{player.player_name}</td>
                                <td className="border border-gray-300 px-4 py-2">{player.team_name}</td>
                                <td className="border border-gray-300 px-4 py-2">{player.points_per_game || player.points}</td>
                                <td className="border border-gray-300 px-4 py-2">{player.assists_per_game || player.assists}</td>
                                <td className="border border-gray-300 px-4 py-2">{player.rebounds_per_game || player.rebounds}</td>
                                <td className="border border-gray-300 px-4 py-2">{player.steals_per_game || player.steals}</td>
                                <td className="border border-gray-300 px-4 py-2">{player.blocks_per_game || player.blocks}</td>
                                <td className="border border-gray-300 px-4 py-2">{player.turnovers_per_game || player.turnovers}</td>
                                <td className="border border-gray-300 px-4 py-2">{player.fouls_per_game || player.fouls}</td>
                                <td className="border border-gray-300 px-4 py-2">{player.pra_per_game || player.pra}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
}

export default StatsFullList;
