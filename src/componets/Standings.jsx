// src/components/Standing.js
import { standings } from '../mockData'; // Importa los datos simulados

function Standing() {
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
                <td className="py-2 px-4 border-b text-center">{item["+/-"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Standing;
