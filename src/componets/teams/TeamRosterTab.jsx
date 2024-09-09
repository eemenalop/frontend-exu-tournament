import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function TeamRosterTab({teamId}) {

  const [players, setPlayers]= useState([]);

  const fetchPlayers = async (teamId) =>{
    try {
      const response = await fetch(`http://localhost:4000/.netlify/functions/getAllPlayers?team_id=${teamId}`)
      const data = await response.json()
      setPlayers(data)
    } catch (error) {
      console.error("Error fetching players", error)
    }
  }

  useEffect(() =>{
    if(teamId){
      fetchPlayers(teamId)
    }
  }, [teamId])


    return (
      <div className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Roster</h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              We’re a dynamic group of individuals who are passionate about what we do.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
          >
            {players.map((player) => (
              <li key={player.player_id} className="rounded-2xl bg-gray-800 px-8 py-10">
                <img alt={player.player_name} src={player.player_photo} className="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56" />
                <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-white">{player.player_name}</h3>
                <p className="text-sm leading-6 text-gray-400">{player.position}</p>
                <p className="text-sm leading-6 text-gray-400">#{player.number}</p>
                <Link
                  to={`/player/${players.player_id}`}
                >
                  <button
                      type="button"
                      className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mt-3"
                    >
                      
                      PLAYER STATS 
                  </button>
                  </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  