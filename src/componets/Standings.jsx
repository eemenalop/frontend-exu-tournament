import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';


function Standing() {
  const [standings, setStandings] = useState([]); // Estado para almacenar las posiciones de los equipos

  useEffect(() => {
    const fetchData = async () => {
      const { data: matches, error } = await supabase
        .from('matches')
        .select('*'); // Selecciona todos los registros de la tabla 'matches'

      if (error) {
        console.error('Error fetching matches:', error);
        return;
      }

      const standingsMap = {}; // Objeto para almacenar los cálculos intermedios de cada equipo

      // Procesamiento de datos
      matches.forEach((match) => {
        const { team1_id, team2_id, score_team1, score_team2 } = match;

        // Inicializar o actualizar estadísticas para el equipo 1
        if (!standingsMap[team1_id]) {
          standingsMap[team1_id] = { equipo: team1_id, JJ: 0, JG: 0, JP: 0, '+/-': 0 };
        }
        standingsMap[team1_id].JJ += 1; // Incrementa los Juegos Jugados para el equipo 1
        standingsMap[team1_id]['+/-'] += score_team1 - score_team2; // Calcula la diferencia de puntos

        // Inicializar o actualizar estadísticas para el equipo 2
        if (!standingsMap[team2_id]) {
          standingsMap[team2_id] = { equipo: team2_id, JJ: 0, JG: 0, JP: 0, '+/-': 0 };
        }
        standingsMap[team2_id].JJ += 1; // Incrementa los Juegos Jugados para el equipo 2
        standingsMap[team2_id]['+/-'] += score_team2 - score_team1; // Calcula la diferencia de puntos

        // Determinar el ganador y perdedor
        if (score_team1 > score_team2) {
          standingsMap[team1_id].JG += 1; // Incrementa los Juegos Ganados para el equipo 1
          standingsMap[team2_id].JP += 1; // Incrementa los Juegos Perdidos para el equipo 2
        } else if (score_team2 > score_team1) {
          standingsMap[team2_id].JG += 1; // Incrementa los Juegos Ganados para el equipo 2
          standingsMap[team1_id].JP += 1; // Incrementa los Juegos Perdidos para el equipo 1
        }
      });

      // Convertir el objeto standingsMap a un array y actualizar el estado standings
      setStandings(Object.values(standingsMap));
    };

    fetchData(); // Llamada a la función fetchData para obtener los datos cuando se monta el componente
  }, []); // [] indica que useEffect se ejecuta una sola vez al montar el componente

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="overflow-x-auto w-full max-w-md mx-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Equipo</th>
              <th className="py-2 px-4 border-b">JJ</th>
              <th className="py-2 px-4 border-b">JG</th>
              <th className="py-2 px-4 border-b">JP</th>
              <th className="py-2 px-4 border-b">+/-</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-center">{item.equipo}</td>
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
