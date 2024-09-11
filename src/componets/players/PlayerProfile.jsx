import { useState, useEffect } from "react"
import MatchTypeFilter from "../statistics/MatchTypeFilter"


// eslint-disable-next-line react/prop-types
export const PlayerProfile = ({ playerId }) => {
    const [playerInfo, setPlayerInfo] = useState(null);
    const [matchType, setMatchType] = useState('Regular');

    useEffect(()=>{

        async function fetchPlayerInfo(){
            try {
                const response = await fetch(`https://exuitesa-basketball-backend.netlify.app/.netlify/functions/getStatsPerGame?match_type=${matchType}&player_id=${playerId}`)
                if(!response.ok){
                    throw new Error ('Error fetching Player Info')
                }

                const data = await response.json();
                if (data.length > 0) {
                    setPlayerInfo(data[0])
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            }

        }
        fetchPlayerInfo();
    }, [matchType, playerId])

    const roundValue = (value, isPercentage = false) => {
        if (value === null || value === undefined) {
            return 'N/A';
        }
        return isPercentage ? (value * 100).toFixed(2) : value.toFixed(1);
    };

    if (!playerInfo) {
        return <div className="text-white">Loading player info...</div>;
    }
    
    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-center p-6">
                {/* First column: Team logo, Player photo, and name */}
                <div className="flex flex-col items-center justify-center mb-6 md:mb-0 md:mr-12">
                    <img
                        src={playerInfo.logo_url}
                        alt="Team Logo"
                        className="w-24 h-24 mb-4"
                    />
                    <img
                        src={playerInfo.player_photo} // Cambia este valor por la URL de la foto del jugador
                        alt={playerInfo.player_name}
                        className="w-64 h-64 rounded-full mb-4 object-contain"
                    />
                    <div className="text-white text-2xl font-bold">
                        {playerInfo.player_name}
                    </div>
                </div>

                {/* Second column: Player stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 text-white p-4 rounded-lg text-center">
                        <div className="text-sm">Puntos por juego</div>
                        <div className="text-xl font-bold">{roundValue(playerInfo.points)}</div>
                    </div>
                    <div className="bg-gray-800 text-white p-4 rounded-lg text-center">
                        <div className="text-sm">Rebotes por juego</div>
                        <div className="text-xl font-bold">{roundValue(playerInfo.rebounds)}</div>
                    </div>
                    <div className="bg-gray-800 text-white p-4 rounded-lg text-center">
                        <div className="text-sm">Asistencias por juego</div>
                        <div className="text-xl font-bold">{roundValue(playerInfo.assists)}</div>
                    </div>
                    <div className="bg-gray-800 text-white p-4 rounded-lg text-center">
                        <div className="text-sm">PRA</div>
                        <div className="text-xl font-bold">{roundValue(playerInfo.pra)}</div>
                    </div>
                </div>
            </div>
            

            <div className="px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                <MatchTypeFilter
                    setSelectedMatchType={setMatchType}
                    />
                    </div>
                <div className="mt-8 flow-root mx-6 ">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Juegos
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                PTS
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                REB
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                AST
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                STL
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                BLK
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                TOV
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                FGM
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                FGA
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                FG%
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                3PTM
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                3PTA
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                3PT%
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                FTM
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                FTA
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                FT%
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                PRA
                            </th>
                            </tr>
                        </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                <tr>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{playerInfo.games_played}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(playerInfo.points)}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(playerInfo.rebounds)}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(playerInfo.assists)}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(playerInfo.steals)}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(playerInfo.blocks)}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(playerInfo.turnovers)}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(playerInfo.fgm)}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(playerInfo.fga)}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(playerInfo.fg_percentage)}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(playerInfo.three_ptm)}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(playerInfo.three_pta)}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(playerInfo.threept_percentage)}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(playerInfo.ftm)}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(playerInfo.fta)}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(playerInfo.ft_percentage)}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(playerInfo.pra)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
  )
}
