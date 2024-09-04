import { useState } from 'react';
import Footer from '../Footer';
import Navbar from '../NavBar';
import PresentationPage from '../PresentationPage'
import StatsLeaders from './StatsLeaders';
import MatchTypeFilter from '../MatchTypeFilter';

const GeneralStats = () => {

    const [matchType, setMatchType] = useState('Regular');
    const [statType, setStatType] = useState('points');

    return (
        <>
            <Navbar />
            <PresentationPage
                imageURL='https://ulznkxovycorqeblrjxk.supabase.co/storage/v1/object/public/PresentationPage%20Images/basketball-game-concept.webp?t=2024-09-02T17%3A13%3A10.428Z'
                alt='Stats component Image' />
            <div className='px-4 py-6'>
                <h2 className='text-2xl font-semibold mb-4'>
                    Top Players
                </h2>
                <MatchTypeFilter
                    selectedMatchType={matchType}
                    setSelectedMatchType={setMatchType}
                />
                <div className='max-w-4xl mx-auto'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                        <StatsLeaders matchType={matchType} statType='points' />
                        <StatsLeaders matchType={matchType} statType="assists" />
                        <StatsLeaders matchType={matchType} statType="rebounds" />
                        <StatsLeaders matchType={matchType} statType="steals" />
                        <StatsLeaders matchType={matchType} statType="blocks" />
                        <StatsLeaders matchType={matchType} statType="turnovers" />
                        <StatsLeaders matchType={matchType} statType="threeptm" />
                        <StatsLeaders matchType={matchType} statType="pra" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default GeneralStats;
