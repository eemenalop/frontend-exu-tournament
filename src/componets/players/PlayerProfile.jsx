import { useState, useEffect } from "react"
import MatchTypeFilter from "../statistics/MatchTypeFilter"


// eslint-disable-next-line react/prop-types
export const PlayerProfile = ({ playerId }) => {
    const [playerInfo, setPlayerInfo] = useState(null);
    const [matchType, setMatchType] = useState('Regular');

    useEffect(()=>{

        async function fetchPlayerInfo(){
            try {
                const response = await fetch(`http://localhost:4000/.netlify/functions/getStatsPerGame?match_type=${matchType}&player_id=${playerId}`)
                if(!response.ok){
                    throw new Error ('Error fetching Player Info')
                }

                const data = await response.json();
                if (data.length > 0) {
                    setPlayerInfo(data[0])
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            }

        }
        fetchPlayerInfo();
    }, [matchType, playerId])

    const roundValue = (value, isPercentage = false) => {
        if (value === null || value === undefined) {
            return 'N/A';
        }
        return isPercentage ? (value * 100).toFixed(2) : value.toFixed(1);
    };

    if (!playerInfo) {
        return <div className="text-white">Loading player info...</div>;
    }
    
    return (
        <>
            <div>
                <div>
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <div>{playerInfo.player_name}</div>
                </div>
                <div>
                    <div>{roundValue(playerInfo.points)}</div>
                    <div>{roundValue(playerInfo.rebounds)}</div>
                    <div>{roundValue(playerInfo.assists)}</div>
                    <div>{roundValue(playerInfo.pra)}</div>
                </div>
            </div>
            <div>
            <MatchTypeFilter
                setSelectedMatchType={setMatchType}
                />
            </div>

            <div>
                Stadisticas
                
            </div>
        </>
  )
}
