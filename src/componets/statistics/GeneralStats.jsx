import { useState } from 'react';
import Footer from '../Footer';
import Navbar from '../NavBar';
import PresentationPage from '../PresentationPage'
import StatsLeaders from './StatsLeaders';
import MatchTypeFilter from './MatchTypeFilter';

const GeneralStats = () => {

    const [matchType, setMatchType] = useState('Regular');

    return (
        <>
            <Navbar />
            <PresentationPage
                imageURL='images/Home-Banners/basketball-game-concept.png'
                alt='Stats component Image' />
            <div className='px-4 py-6'>
                <h2 className='text-2xl font-semibold mb-4 text-gray-800'>
                    Top Players
                </h2>
                <div className='flex justify-end mb-11'>
                    <MatchTypeFilter
                        setSelectedMatchType={setMatchType}
                        />
                </div>
                <div className='max-w-6xl mx-auto'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                        <StatsLeaders matchType={matchType} statType='points' />
                        <StatsLeaders matchType={matchType} statType="assists" />
                        <StatsLeaders matchType={matchType} statType="rebounds" />
                        <StatsLeaders matchType={matchType} statType="steals" />
                        <StatsLeaders matchType={matchType} statType="blocks" />
                        <StatsLeaders matchType={matchType} statType="turnovers" />
                        <StatsLeaders matchType={matchType} statType="pra" />
                        <StatsLeaders matchType={matchType} statType="fg_percentage" />
                        <StatsLeaders matchType={matchType} statType="threeptm" />
                        <StatsLeaders matchType={matchType} statType="threept_percentage" />
                        <StatsLeaders matchType={matchType} statType="ft_percentage" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default GeneralStats;
