import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../enviroment";
import NavBar from '../NavBar';
import Footer from "../Footer";
import { Link } from "react-router-dom";

const MatchBoxScore = () => {
    const { matchId } = useParams();
    const [boxScore, setBoxScore] = useState(null);
    const [match, setMatch] = useState([]);

    useEffect(() => {
        const fetchBoxScore = async () => {
            try {
                const responseBoxScore = await fetch(`${BACKEND_URL}/.netlify/functions/getAllPlayersMatchesStats?match_id=${matchId}`);
                if (!responseBoxScore.ok) {
                    throw new Error(`HTTP error! status: ${responseBoxScore.status}`);
                }
                const dataBoxScore = await responseBoxScore.json();
                setBoxScore(dataBoxScore);

                const responseMatch = await fetch(`${BACKEND_URL}/.netlify/functions/getAllMatches?match_id=${matchId}`);
                if (!responseMatch.ok) {
                    throw new Error(`HTTP error! status: ${responseMatch.status}`);
                }
                const dataMatch = await responseMatch.json();
                setMatch(dataMatch);

            } catch (error) {
                console.error('Error fetching box score:', error);
            }
        };
        fetchBoxScore();
    }, [matchId]);

    if (!boxScore) {
        return <div>Loading...</div>;
    }

    const team1Players = boxScore.filter(
        (playerStat) => playerStat.player.team_id === match[0]?.team1_id
      );
    const team2Players = boxScore.filter(
        (playerStat) => playerStat.player.team_id === match[0]?.team2_id
      );

     

    return (
        <>
            <NavBar />
                <div className="container mx-auto my-8">
                    <div className="container mx-auto my-8">
                            {match.map((matchDetail) => (
                        <div key={matchDetail.match_id} className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto my-4">
                            {/* Fecha y lugar */}
                            <div className="text-sm text-gray-500 flex justify-between">
                                <span>{matchDetail.match_date_time}</span>
                                <span>{matchDetail.location}</span>
                            </div>

                            {/* Logos y VS */}
                            <div className="flex justify-center items-center my-4">
                                {/* Team 1 logo */}
                                <div className="flex flex-col items-center">
                                <img
                                    src={matchDetail.team1.logo_url}
                                    alt={`Logo de ${match.team1_name}`}
                                    className="w-24 h-24 object-contain"
                                />
                                <span className="mt-2 text-xl font-semibold">{matchDetail.team1.team_name}</span>
                                <span className="mt-2 text-xl font-semibold">{matchDetail.score_team1}</span>
                                </div>

                                {/* VS */}
                                <div className="mx-4 text-xl font-bold text-gray-600">VS</div>

                                {/* Team 2 logo */}
                                <div className="flex flex-col items-center">
                                <img
                                    src={matchDetail.team2.logo_url}
                                    alt={`Logo de ${matchDetail.team2_name}`}
                                    className="w-24 h-24 object-contain"
                                />
                                <span className="mt-2 text-xl font-semibold">{matchDetail.team2.team_name}</span>
                                <span className="mt-2 text-xl font-semibold">{matchDetail.score_team2}</span>
                                </div>
                            </div>

                            {/* Nombres de los equipos */}
                            <div className="flex justify-between items-center text-center">
                                <span className="font-medium text-gray-700">{matchDetail.team1_name}</span>
                                <span className="font-medium text-gray-700">{matchDetail.team2_name}</span>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className="mt-8 flow-root mx-7">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">{}</h2>
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Nombre</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">PTS</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">REB</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">AST</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">STL</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">BLK</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">TOV</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">PF</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {team1Players.map((player) => (
                                                <tr key={player.player_id}>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">
                                                        <Link className="hover:underline" to={`/player/${player.player_id}`}>
                                                            {player.player.player_name}
                                                        </Link>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{player.points}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{player.rebounds}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{player.assists}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{player.steals}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{player.blocks}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{player.turnovers}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{player.fouls}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Nombre</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">PTS</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">REB</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">AST</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">STL</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">BLK</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">TOV</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">PF</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {team2Players.map((player) => (
                                                <tr key={player.player_id}>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">
                                                        <Link className="hover:underline" to={`/player/${player.player_id}`}>
                                                            {player.player.player_name}
                                                        </Link>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{player.points}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{player.rebounds}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{player.assists}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{player.steals}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{player.blocks}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{player.turnovers}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{player.fouls}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </>
    );
};

export default MatchBoxScore;
