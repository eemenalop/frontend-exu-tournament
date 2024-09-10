import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { teamLogos } from '../teamLogos';

function Standing() {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: matches, error: matchesError } = await supabase
        .from('matches')
        .select('*');

      if (matchesError) {
        console.error('Error fetching matches:', matchesError);
        return;
      }

      const { data: teams, error: teamsError } = await supabase
        .from('teams')
        .select('*');

      if (teamsError) {
        console.error('Error fetching teams:', teamsError);
        return;
      }

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
          standingsMap[team1_id] = { equipo: team1_id, name: team1_name, JJ: 0, JG: 0, JP: 0, '+/-': 0 };
        }
        standingsMap[team1_id].JJ += 1;
        standingsMap[team1_id]['+/-'] += score_team1 - score_team2;

        if (!standingsMap[team2_id]) {
          standingsMap[team2_id] = { equipo: team2_id, name: team2_name, JJ: 0, JG: 0, JP: 0, '+/-': 0 };
        }
        standingsMap[team2_id].JJ += 1;
        standingsMap[team2_id]['+/-'] += score_team2 - score_team1;

        if (score_team1 > score_team2) {
          standingsMap[team1_id].JG += 1;
          standingsMap[team2_id].JP += 1;
        } else if (score_team2 > score_team1) {
          standingsMap[team2_id].JG += 1;
          standingsMap[team1_id].JP += 1;
        }
      });

      setStandings(Object.values(standingsMap));
    };

    fetchData();
  }, []);

  const getTeamLogo = (teamId) => {
    const team = teamLogos.find(t => t.id === teamId);
    return team ? team.logo : '';
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="overflow-x-auto w-full max-w-md mx-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">Equipo</th>
              <th className="py-2 px-4 border-b text-center">JJ</th>
              <th className="py-2 px-4 border-b text-center">JG</th>
              <th className="py-2 px-4 border-b text-center">JP</th>
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
