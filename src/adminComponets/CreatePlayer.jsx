import { useEffect, useState } from "react"
import AdminSideBar from "./AdminSidebar"
import AddPlayerModal from '../adminComponets/modalsToCreate/AddPlayerModal'
import { BACKEND_URL } from "../enviroment";


export default function CreatePlayer() {
  const [players, setPlayers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/.netlify/functions/getAllPlayers`);
        if (!response.ok) {
          throw new Error('Error fetching Players');
        }
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    }
    fetchPlayers();
  }, [])
  
  const handleAddPlayer = () => {
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
          <h1 className="text-base font-semibold leading-6 text-white">Jugadores</h1>
          <p className="mt-2 text-sm text-gray-700">
            Listado de todos los Jugadores creados.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleAddPlayer}
            >
            + Add Player
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
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Player Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Team Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Position
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Number
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 max-w-24">
                      Created At
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 max-w-24">
                      Player Photo
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {players.map((player) => (
                    <tr key={player.player_id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{player.player_name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{player.teams.team_name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{player.position}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{player.number}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-24 truncate">{player.created_at}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-24 truncate">{player.player_photo}</td>
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
      {isModalOpen && <AddPlayerModal onClose={handleCloseModal} />}
    </>
  )
}
