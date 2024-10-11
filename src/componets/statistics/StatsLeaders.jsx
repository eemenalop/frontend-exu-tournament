/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../enviroment';
import { useNavigate } from 'react-router-dom';

const StatsLeaders = ({ matchType, statType, statScope }) => {
    const [stats, setStats] = useState([]);
    const navigate = useNavigate();

    const handleFullListClick = () => {
        navigate(`/GeneralStats/full-list/${statType}/${statScope}`)
    }

    useEffect(() => {
        const fetchStats = async () => {
            try {
                let response;
                if (statScope === 'Per Game') {
                    response = await fetch(`${BACKEND_URL}/.netlify/functions/getTopPlayerStats?match_type=${matchType}&stat_type=${statType}`);
                }
                else {
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
                                stat: 0
                            };
                        }
                        acc[playerId].stat += item[statType];
                        return acc;
                    }, {});
                    const sortedTotals = Object.values(playerTotals)
                        .sort((a, b) => b.stat - a.stat)
                        .slice(0, 10);
                    
                    setStats(sortedTotals);
                } else {
                    const topTenPlayers = data.slice(0, 10);
                    setStats(topTenPlayers);
                }

            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, [matchType, statType, statScope]);

    return (
        <div className="my-4 p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-2 border-b border-gray-300 pb-1 text-center bg-gray-700">
                {statType.toUpperCase()}
            </h3>
            <ul className="space-y-1">
                {stats.map((player, index) => (
                    <li key={index} className="flex items-center p-3 h-10 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300 ease-in-out">
                        <span className="w-6 h-6 flex items-center justify-center text-sm font-semibold text-white bg-red-700 rounded-full mr-2">
                            {index + 1}
                        </span>
                        <div className='flex-grow'>
                            <p className='text-base font-bold text-gray-900'>
                                <Link
                                    to={`/player/${player.player_id}`}
                                    className='hover:underline'
                                >{player.player_name}
                                </Link>
                                    </p>
                                <p className="text-xs text-gray-600">{player.team_name}</p>
                        </div>
                        <p className="text-2xl font-bold text-gray-600">
                        {statScope === 'Per Game' ? player.stat_per_game : player.stat}
                        </p>
                    </li>
                ))}
            </ul>
            <p
                className='mt-2  ml-2 text-red-700 font-semibold hover:cursor-pointer hover:underline underline-offset-1'
                onClick={handleFullListClick}>
                Full List
            </p>
        </div>
    );
};

export default StatsLeaders;
