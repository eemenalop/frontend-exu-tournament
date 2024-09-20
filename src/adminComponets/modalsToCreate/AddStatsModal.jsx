/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../enviroment";

const AddStatsModal = ({ onClose }) => {
  const [matchType, setMatchType] = useState("");
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const navigate = useNavigate();

  // Fetch all matches
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/.netlify/functions/getAllMatches`);
        if (!response.ok) throw new Error("Error fetching matches");
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error("Error fetching matches", error);
      }
    };
    fetchMatches();
  }, []);

  // Filter matches based on match type
  useEffect(() => {
    if (matchType) {
      const filtered = matches.filter((match) => match.match_type === matchType);
      setFilteredMatches(filtered);
    }
  }, [matchType, matches]);

  const handleMatchTypeChange = (e) => {
    setMatchType(e.target.value);
  };

  const handleMatchSelect = (e) => {
    setSelectedMatchId(e.target.value);
  };

  const handleAddStats = () => {
    if (selectedMatchId) {
      navigate(`/admin-home/CreatePlayersMatchStats/AddStatsPlayerPage/${selectedMatchId}`);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-semibold">Agregar Estadísticas</h2>

        {/* Match Type Filter */}
        <div className="mb-4">
          <label htmlFor="match-type">Tipo de Partido:</label>
          <select
            id="match-type"
            className="border w-full p-2 mt-2"
            value={matchType}
            onChange={handleMatchTypeChange}
          >
            <option value="">-- Selecciona Tipo de Partido --</option>
            <option value="Regular">Regular</option>
            <option value="Semifinal">Semifinal</option>
            <option value="Final">Final</option>
          </select>
        </div>

        {/* Match Select */}
        <div className="mb-4">
          <label htmlFor="match-select">Selecciona un partido:</label>
          <select
            id="match-select"
            className="border w-full p-2 mt-2"
            onChange={handleMatchSelect}
          >
            <option value="">-- Selecciona Partido --</option>
            {filteredMatches.map((match) => (
              <option key={match.match_id} value={match.match_id}>
                {match.match_id}: {match.team1.team_name} vs {match.team2.team_name} ({match.match_date_time})
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleAddStats}
            disabled={!selectedMatchId}
          >
            Agregar Stats
          </button>
          <button
            type="button"
            className="bg-gray-300 text-black px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStatsModal;
