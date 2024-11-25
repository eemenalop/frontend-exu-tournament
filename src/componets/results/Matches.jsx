import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../enviroment";
import NavBar from '../NavBar';
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import MatchTypeFilter from "../statistics/MatchTypeFilter";

const Matches = () => {
    const [matches, setMatches] = useState([]);
    const navigate = useNavigate();
    const [matchType, setMatchType] = useState('Final');
    
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
                let data = await response.json();

                data = data.sort((a, b) => new Date(b.match_date_time) - new Date(a.match_date_time));

                const filteredMatches = data.filter(match => match.match_type === matchType)
                
                setMatches(filteredMatches);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        }
        fetchMatches();

    }, [matchType])


  return (
    <>
    <NavBar />
        
        <div className='flex justify-left my-11 mx-4'>
          <MatchTypeFilter
            setSelectedMatchType={setMatchType}
            />
        </div>
        <div className="container mx-auto my-8 px-4 flex flex-wrap justify-center gap-4">
                    {matches.map((match) => (
              <div key={match.match_id} className="bg-white shadow-md rounded-lg p-6 w-full sm:w-1/2 lg:w-1/3">
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
                      className="w-20 h-20 object-contain"
                    />
                    <span className="mt-2 text-lg font-semibold">{match.team1.team_name}</span>
                    <span className="mt-2 text-xl font-semibold">{match.score_team1}</span>
                  </div>

                  {/* VS */}
                  <div className="mx-4 text-xl font-bold text-gray-600">VS</div>

                  {/* Team 2 logo */}
                  <div className="flex flex-col items-center">
                    <img
                      src={match.team2.logo_url}
                      alt={`Logo de ${match.team2_name}`}
                      className="w-20 h-20 object-contain"
                    />
                    <span className="mt-2 text-lg font-semibold">{match.team2.team_name}</span>
                    <span className="mt-2 text-xl font-semibold">{match.score_team2}</span>
                  </div>
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
