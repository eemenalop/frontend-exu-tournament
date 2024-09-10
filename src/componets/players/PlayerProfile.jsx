import { useState, useEffect } from "react"
import MatchTypeFilter from "../statistics/MatchTypeFilter"


// eslint-disable-next-line react/prop-types
export const PlayerProfile = ({playerId}) => {
    const [playerInfo, setPlayerInfo] = useState([]);
    const [matchType, setMatchType] = useState('Regular');

    useEffect(()=>{

        async function fetchPlayerInfo(){
            try {
                const response = await fetch(`http://localhost:4000/.netlify/functions/getStatsPerGame?match_type=${matchType}&player_id=${playerId}`)
                if(!response.ok){
                    throw new Error ('Error fetching Player Info')
                }

                const data = await response.json();
                setPlayerInfo(data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }

        }
        fetchPlayerInfo();
    }, [matchType, playerId])
    
    return (
        <>
            <div
            className="text-white">{playerInfo.player_name}</div>
            <div>
            <MatchTypeFilter
                setSelectedMatchType={setMatchType}
                />
            </div>

            <div>
                
            </div>
        </>
  )
}
