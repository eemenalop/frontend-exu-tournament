/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StatsLeaders = ({ matchType, statType }) => {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(
                    `http://localhost:4000/.netlify/functions/getTopPlayerStats?match_type=${matchType}&stat_type=${statType}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                setStats(data);

            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, [matchType, statType]);

    return (
        <div className="my-4 p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-2 border-b border-gray-300 pb-1 text-center bg-gray-700">
                {statType.toUpperCase()}
            </h3>
            <ul className="space-y-1">
                {stats.map((player, index) => (
                    <li key={index} className="flex items-center p-3 h-10 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300 ease-in-out">
                        <span className="w-6 h-6 flex items-center justify-center text-sm font-semibold text-white bg-blue-500 rounded-full mr-2">
                            {player.rank}
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
                            {player.stat_per_game}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StatsLeaders;
