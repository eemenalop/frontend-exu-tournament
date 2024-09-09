import MatchTypeFilter from "../statistics/MatchTypeFilter"


export const PlayerProfile = () => {
    return (
        <>
            <div className='flex'>
                <div>
                    <img src="" alt="Team Logo" />
                    <img src="" alt="Player Image" />
                <section>
                    Popiwa | #26 | Center
                </section>
                <section>Edgar Mena</section>
                </div>
                <div>
                    <div>PPG</div>
                    <div>RPG</div>
                    <div>APG</div>
                    <div>PRA</div>
                </div>
            </div>

            <div>
                <MatchTypeFilter />
            </div>

            <div>
                
            </div>
            </>
  )
}
