import { useEffect, useState } from "react"
import AdminSideBar from "./AdminSidebar"
import { BACKEND_URL } from "../enviroment";
import AddStatsModal from './modalsToCreate/AddStatsPage'

const CreatePlayersMatchStats = () => {
  const [statsMatches, setStatsMatches] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(()=>{
    const fetchStatsMatches = async ()=>{
      try {
        const response = await fetch(`${BACKEND_URL}/.netlify/functions/getAllPlayersMatchesStats`);
        if(!response.ok){
          throw new Error('Error fetching Matches');
        }
        const data = await response.json()
        setStatsMatches(data);
      } catch (error) {
        console.error('Error fetching matches', error)
      }
    };
    fetchStatsMatches();
  },[]);

  const handleAddMatch = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <>
    <AdminSideBar/>
    <div className="lg:pl-80 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">ESTADISTICAS</h1>
          <p className="mt-2 text-sm text-gray-700">
            Listado de todas las estadisticas de los jugadores en cada juego
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleAddMatch}
            >
            + Add Stats
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Match Stats ID
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Match ID
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Match
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Match Type
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Fecha
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Player ID
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Player Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Points
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Assists
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Rebounds
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Steals
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Blocks
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Turnovers
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    PRA
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
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {statsMatches.map((stat) => (
                    <tr key={stat.match_stats_id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.match_stats_id}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.match_id}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.match_details.team1.team_name} VS {stat.match_details.team2.team_name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.match_details.match_type}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-32 truncate">{stat.match_details.match_date_time}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.player_id}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.player.player_name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.points}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.assists}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.rebounds}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.steals}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.blocks}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.turnovers}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.pra}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.fgm}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.fga}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-16 truncate">{stat.fg_percentage}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.threeptm}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.threepta}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-16 truncate">{stat.threept_percentage}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.ftm}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{stat.fta}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-16 truncate">{stat.ft_percentage}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only"></span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>
      {isModalOpen && <AddStatsModal onClose={handleCloseModal}/> }
    </>
  )
}

export default CreatePlayersMatchStats