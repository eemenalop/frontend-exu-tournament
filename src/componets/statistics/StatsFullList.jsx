import { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import MatchTypeFilter from './MatchTypeFilter';
import StatScopeFilter from './StatScopeFilter';
import { BACKEND_URL } from '../../enviroment';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom"

const StatsFullList = () => {
    const [matchType, setMatchType] = useState('Semifinal');
    const [statScope, setStatScope] = useState('Per Game');
    const [stats, setStats] = useState([]);
    const [, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState('desc');
    const [activeColumn, setActiveColumn] = useState('points');
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({
            top:0,
            behavior: 'smooth'
        });
      }, [location.key]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                let response;
                if (statScope === 'Per Game') {
                    response = await fetch(`${BACKEND_URL}/.netlify/functions/getStatsPerGame?match_type=${matchType}`);
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
                    setStats(Object.values(playerTotals).sort((a, b) => b.points - a.points));
                } else {
                    // Si está en 'Per Game', se espera que los datos ya estén filtrados por el backend

                    const formattedData = data.map(item => ({
                        ...item,
                        points: item.points.toFixed(1),
                        assists: item.assists.toFixed(1),
                        rebounds: item.rebounds.toFixed(1),
                        steals: item.steals.toFixed(1),
                        blocks: item.blocks.toFixed(1),
                        turnovers: item.turnovers.toFixed(1),
                        fouls: item.fouls.toFixed(1),
                        pra: item.pra.toFixed(1)
                    }));
                    setStats(formattedData.sort((a, b) => b.points - a.points));
                }
                setActiveColumn('points');
                
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, [statScope, matchType]);

    

    const handleSort = (key) => {
        // Si se hace clic en la misma columna
        if (activeColumn === key) {
            // Cambiar el orden (asc <-> desc)
            const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
            setSortOrder(newOrder);
    
            const sortedStats = [...stats].sort((a, b) => {
                return newOrder === 'asc' ? a[key] - b[key] : b[key] - a[key]; // Ordenar según el nuevo orden
            });
    
            setStats(sortedStats);
        } else {
            // Si se hace clic en una columna diferente
            setActiveColumn(key); // Establecer la nueva columna activa
            setSortKey(key); // Actualizar la clave de ordenación
            setSortOrder('desc'); // Reiniciar a desc
    
            const sortedStats = [...stats].sort((a, b) => {
                return b[key] - a[key]; // Ordenar de mayor a menor
            });
    
            setStats(sortedStats);
        }
    };
    return (
        <>
            <NavBar />
                <div className='h-96 w-full'>
                    <img src="/images/Home-Banners/basketball-game-concept.png"
                        alt='Stats component Image'
                        className='h-full w-full object-cover'/>
                </div>
            <div className='px-4 py-6'>
                <h2 className='text-2xl font-semibold mb-4 text-gray-800 text-center'>
                    Estadísticas {statScope}
                </h2>
                <div className="flex mt-8 justify-center">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block py-2 align-middle sm:px-6 lg:px-8">
                        <div className='flex justify-start mb-10'>
                            <MatchTypeFilter setSelectedMatchType={setMatchType} />
                            <StatScopeFilter setSelectedStatScope={setStatScope} />
                        </div>
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <div className="overflow-x-auto">
                                <table className="min-w-full table-auto mx-auto divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="sticky left-0 z-10 px-4 py-2 text-left text-sm font-semibold text-gray-900"></th>
                                        <th scope="col" className={`sticky left-0 z-10 px-4 py-2 text-left text-sm font-semibold text-gray-900`}>Jugador</th>
                                        <th scope="col" className={`sticky left-0 z-10 px-4 py-2 text-left text-sm font-semibold text-gray-900`}>Equipo</th>
                                        <th scope="col" className={`px-4 py-2 text-left text-sm font-semibold text-gray-900 hover:cursor-pointer ${activeColumn === 'points' ? 'bg-gray-200' : ''}`} onClick={() => handleSort('points')}>PTS</th>
                                        <th scope="col" className={`px-4 py-2 text-left text-sm font-semibold text-gray-900 hover:cursor-pointer ${activeColumn === 'assists' ? 'bg-gray-200' : ''}`} onClick={() => handleSort('assists')}>AST</th>
                                        <th scope="col" className={`px-4 py-2 text-left text-sm font-semibold text-gray-900 hover:cursor-pointer ${activeColumn === 'rebounds' ? 'bg-gray-200' : ''}`} onClick={() => handleSort('rebounds')}>REB</th>
                                        <th scope="col" className={`px-4 py-2 text-left text-sm font-semibold text-gray-900 hover:cursor-pointer ${activeColumn === 'steals' ? 'bg-gray-200' : ''}`} onClick={() => handleSort('steals')}>STL</th>
                                        <th scope="col" className={`px-4 py-2 text-left text-sm font-semibold text-gray-900 hover:cursor-pointer ${activeColumn === 'blocks' ? 'bg-gray-200' : ''}`} onClick={() => handleSort('blocks')}>BLK</th>
                                        <th scope="col" className={`px-4 py-2 text-left text-sm font-semibold text-gray-900 hover:cursor-pointer ${activeColumn === 'turnovers' ? 'bg-gray-200' : ''}`} onClick={() => handleSort('turnovers')}>TO</th>
                                        <th scope="col" className={`px-4 py-2 text-left text-sm font-semibold text-gray-900 hover:cursor-pointer ${activeColumn === 'fouls' ? 'bg-gray-200' : ''}`} onClick={() => handleSort('fouls')}>PF</th>
                                        <th scope="col" className={`px-4 py-2 text-left text-sm font-semibold text-gray-900 hover:cursor-pointer ${activeColumn === 'pra' ? 'bg-gray-200' : ''}`} onClick={() => handleSort('pra')}>PRA</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                    {stats.map((player, index) => (
                                        <tr key={index}>
                                        <td className="sticky left-0 z-10 px-4 py-2 text-sm text-gray-500">{index + 1}</td>
                                        <td className={`sticky left-0 z-10 px-4 py-2 text-sm font-semibold hover:underline text-red-600 ${activeColumn === 'player_name' ? 'bg-gray-200' : ''}`}>
                                        <Link to={`/player/${player.player_id}`}>{player.player_name}</Link>
                                        </td>
                                        <td className={`sticky left-0 z-10 px-4 py-2 text-sm font-semibold hover:underline text-red-600 ${activeColumn === 'team_name' ? 'bg-gray-200' : ''}`}>{player.team_name}</td>
                                        <td className={`px-4 py-2 text-sm text-black-500 ${activeColumn === 'points' ? 'bg-gray-200' : ''}`}>{player.points}</td>
                                        <td className={`px-4 py-2 text-sm text-black-500 ${activeColumn === 'assists' ? 'bg-gray-200' : ''}`}>{player.assists}</td>
                                        <td className={`px-4 py-2 text-sm text-black-500 ${activeColumn === 'rebounds' ? 'bg-gray-200' : ''}`}>{player.rebounds}</td>
                                        <td className={`px-4 py-2 text-sm text-black-500 ${activeColumn === 'steals' ? 'bg-gray-200' : ''}`}>{player.steals}</td>
                                        <td className={`px-4 py-2 text-sm text-black-500 ${activeColumn === 'blocks' ? 'bg-gray-200' : ''}`}>{player.blocks}</td>
                                        <td className={`px-4 py-2 text-sm text-black-500 ${activeColumn === 'turnovers' ? 'bg-gray-200' : ''}`}>{player.turnovers}</td>
                                        <td className={`px-4 py-2 text-sm text-black-500 ${activeColumn === 'fouls' ? 'bg-gray-200' : ''}`}>{player.fouls}</td>
                                        <td className={`px-4 py-2 text-sm text-black-500 ${activeColumn === 'pra' ? 'bg-gray-200' : ''}`}>{player.pra}</td>
                                    </tr>
                                    ))}
                                    </tbody>
                                </table>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default StatsFullList;
