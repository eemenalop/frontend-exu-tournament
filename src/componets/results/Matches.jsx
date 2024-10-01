import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../enviroment";
import NavBar from '../NavBar';
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

const Matches = () => {
    const [matches, setMatches] = useState([]);
    const navigate = useNavigate();
    
    const handleBoxScoreClick = (matchId) => {
        navigate(`/match/${matchId}/MatchesBoxScore`);
    };

    useEffect(() =>{
        const fetchMatches = async () =>{
            try {
                const response = await fetch(`${BACKEND_URL}/.netlify/functions/getAllMatches`)
                if(!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json();
                setMatches(data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        }
        fetchMatches();

    }, [])


  return (
    <>
    <NavBar />
        <div className="container mx-auto my-8">
        {matches.map((match) => (
            <div key={match.match_id} className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto my-4">
                {/* Fecha y lugar */}
                <div className="text-sm text-gray-500 flex justify-between">
                    <span>{match.match_date_time}</span>
                    <span>{match.location}</span>
                </div>

                {/* Logos y VS */}
                <div className="flex justify-center items-center my-4">
                    {/* Team 1 logo */}
                    <div className="flex flex-col items-center">
                    <img
                        src={match.team1.logo_url}
                        alt={`Logo de ${match.team1_name}`}
                        className="w-24 h-24 object-contain"
                    />
                    <span className="mt-2 text-xl font-semibold">{match.team1.team_name}</span>
                    <span className="mt-2 text-xl font-semibold">{match.score_team1}</span>
                    </div>

                    {/* VS */}
                    <div className="mx-4 text-xl font-bold text-gray-600">VS</div>

                    {/* Team 2 logo */}
                    <div className="flex flex-col items-center">
                    <img
                        src={match.team2.logo_url}
                        alt={`Logo de ${match.team2_name}`}
                        className="w-24 h-24 object-contain"
                    />
                    <span className="mt-2 text-xl font-semibold">{match.team2.team_name}</span>
                    <span className="mt-2 text-xl font-semibold">{match.score_team2}</span>
                    </div>
                </div>

                {/* Nombres de los equipos */}
                <div className="flex justify-between items-center text-center">
                    <span className="font-medium text-gray-700">{match.team1_name}</span>
                    <span className="font-medium text-gray-700">{match.team2_name}</span>
                </div>
                
                <div className="flex justify-start mt-4">
            <button
              onClick={() => handleBoxScoreClick(match.match_id)}
              className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-900 hover:underline"
            >
              Box Score
            </button>
          </div>
            </div>
        ))}
        </div>
        <Footer />
    </>
  );
};

export default Matches;
