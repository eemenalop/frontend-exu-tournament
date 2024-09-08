import { useEffect, useState } from "react"
import MatchTypeFilter from "../statistics/MatchTypeFilter";

  
  // eslint-disable-next-line react/prop-types
  export default function TeamStatsTab({teamId}) {
      const [playerStats, setPlayerStats] = useState([]);
      const [loading, setLoading] = useState(true);
      const [matchType, setMatchType] = useState('Regular');

      useEffect(() =>{
        async function fetchPlayerStats() {
          try {
            const response = await fetch(`http://localhost:4000/.netlify/functions/getStatsPerGame?match_type=${matchType}&team_id=${teamId}`)
            if(!response.ok){
              throw new Error ('Error fetching player stats');
            }
            const data = await response.json();
            console.log(data);
            setPlayerStats(data);

          } catch (error) {
            console.error('Error fetching stats:', error);
          }finally{
            setLoading(false);
          }
        }
        fetchPlayerStats();
      }, [matchType,teamId])

      if(loading){
        return(
          <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
          </div>
          ) 
      }

      const roundValue = (value, isPercentage = false) => {
        if (value === null || value === undefined) {
            return 'N/A'; // O algún otro valor de tu preferencia para datos no disponibles
        }
        return isPercentage ? (value * 100).toFixed(2) : value.toFixed(1);
    };
    
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <MatchTypeFilter
                        setSelectedMatchType={setMatchType}
                        />
        <div className="sm:flex sm:items-center">
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Nombre
                      </th>
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
                    {playerStats.map((player) => (
                      <tr key={player.player_id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{player.player_name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{player.games_played}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(player.points)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(player.rebounds)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(player.assists)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(player.steals)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(player.blocks)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(player.turnovers)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(player.fgm)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(player.fga)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(player.fg_percentage)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(player.three_ptm)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(player.three_pta)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(player.threept_percentage)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(player.ftm)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(player.fta)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(player.ft_percentage)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{roundValue(player.pra)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  