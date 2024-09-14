import { useState, useEffect } from 'react';

const teamLogos = {
  1: 'images/teams_logos/popiwa_logo_1.png',
  2: 'images/teams_logos/lomaetro_logo_1.png',
  3: 'images/teams_logos/loudest_togo_1.png',
  4: 'images/teams_logos/toons_logo_1.png'
};

function Standing() {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch matches data
        const matchesResponse = await fetch('https://exuitesa-basketball.netlify.app/.netlify/functions/getAllMatches?match_type=Regular');
        const matches = await matchesResponse.json();

        // Fetch teams data
        const teamsResponse = await fetch('https://exuitesa-basketball.netlify.app/.netlify/functions/getAllTeams?');
        const teams = await teamsResponse.json();

        const teamNameMap = {};
        teams.forEach((team) => {
          teamNameMap[team.team_id] = team.team_name;
        });

        const standingsMap = {};

        matches.forEach((match) => {
          const { team1_id, team2_id, score_team1, score_team2 } = match;
          const team1_name = teamNameMap[team1_id];
          const team2_name = teamNameMap[team2_id];

          if (!standingsMap[team1_id]) {
            standingsMap[team1_id] = { equipo: team1_id, name: team1_name, JJ: 0, JG: 0, JP: 0, '+/-': 0, puntos: 0 };
          }
          if (!standingsMap[team2_id]) {
            standingsMap[team2_id] = { equipo: team2_id, name: team2_name, JJ: 0, JG: 0, JP: 0, '+/-': 0, puntos: 0 };
          }

          standingsMap[team1_id].JJ += 1;
          standingsMap[team1_id]['+/-'] += score_team1 - score_team2;

          standingsMap[team2_id].JJ += 1;
          standingsMap[team2_id]['+/-'] += score_team2 - score_team1;

          if (score_team1 > score_team2) {
            standingsMap[team1_id].JG += 1;
            standingsMap[team1_id].puntos += 2; // Ganar 2 puntos
            standingsMap[team2_id].JP += 1;
            standingsMap[team2_id].puntos += 1; // Perder 1 punto
          } else if (score_team2 > score_team1) {
            standingsMap[team2_id].JG += 1;
            standingsMap[team2_id].puntos += 2; // Ganar 2 puntos
            standingsMap[team1_id].JP += 1;
            standingsMap[team1_id].puntos += 1; // Perder 1 punto
          }
        });
        
        const sortedStandings = Object.values(standingsMap).sort((a, b) => b.puntos - a.puntos);
        setStandings(sortedStandings);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      
    };

    fetchData();
  }, []);

  const getTeamLogo = (teamId) => {
    return teamLogos[teamId] || '';
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="overflow-x-auto w-full max-w-md mx-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">Equipo</th>
              <th className="py-2 px-4 border-b text-center">PJ</th>
              <th className="py-2 px-4 border-b text-center">G</th>
              <th className="py-2 px-4 border-b text-center">P</th>
              <th className="py-2 px-4 border-b text-center">PTS</th>
              <th className="py-2 px-4 border-b text-center">+/-</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center space-x-2">
                    <div className="flex-shrink-0 ml-4">
                      <img
                        src={getTeamLogo(item.equipo)}
                        alt={`Logo del equipo ${item.name}`}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <span className="flex-grow text-center">{item.name}</span>
                  </div>
                </td>
                <td className="py-2 px-4 border-b text-center">{item.JJ}</td>
                <td className="py-2 px-4 border-b text-center">{item.JG}</td>
                <td className="py-2 px-4 border-b text-center">{item.JP}</td>
                <td className="py-2 px-4 border-b text-center">{item.puntos}</td>
                <td className="py-2 px-4 border-b text-center">{item['+/-']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Standing;
