import React, { useEffect, useState } from 'react';

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
        <div className="my-6 p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
                {statType.toUpperCase()}
            </h3>
            <ul className="space-y-3">
                {stats.map((player, index) => (
                    <li
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition duration-300 ease-in-out"
                    >
                        <span className="w-6 h-6 flex items-center justify-center text-sm font-semibold text-white bg-blue-500 rounded-full mr-4">
                            {player.rank}
                        </span>
                        <div className="flex-grow text-center">
                            <p className="text-lg font-medium text-gray-900">
                                {player.player_name}
                            </p>
                            <p className="text-sm text-gray-600">
                                {player.team_name}
                            </p>
                        </div>
                        <p className="text-lg font-semibold text-gray-900">
                            {player.stat_per_game}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StatsLeaders;
