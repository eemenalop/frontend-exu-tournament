import AdminSideBar from "./AdminSidebar"
import { useEffect, useState } from "react"
import AddTeamModal from './modalsToCreate/AddTeamModal'
import { BACKEND_URL } from "../enviroment";

export default function CreateTeam() {

  const [teams, setTeams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/.netlify/functions/getAllTeams`)
        if (!response.ok) {
          throw new Error('Error fetching Teams')
        }
        const data = await response.json();
        setTeams(data)

      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    
    fetchTeams();
  }, [])

  const handleAddTeam = () => {
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
          <h1 className="text-base font-semibold leading-6 text-gray-900">Teams</h1>
          <p className="mt-2 text-sm text-gray-700">
            Listado de todos los Equipos creados.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleAddTeam}
            >
            + Add Team
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
                      Equipo
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Capitan
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 max-w-52 md:max-w-24">
                      Created At
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 max-w-24">
                      Logo URL
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {teams.map((team) => (
                    <tr key={team.team_id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{team.team_name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{team.captain}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-52 md:max-w-24 truncate">{team.created_at}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-24 truncate">{team.logo_url}</td>
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
      {isModalOpen && <AddTeamModal onClose={handleCloseModal} />}
    </>
  )
}
