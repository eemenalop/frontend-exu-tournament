import { useState } from 'react';
import Footer from '../Footer';
import Navbar from '../NavBar';
import StatsLeaders from './StatsLeaders';
import MatchTypeFilter from './MatchTypeFilter';
import StatScopeFilter from './StatScopeFilter';

const GeneralStats = () => {

    const [matchType, setMatchType] = useState('Regular');
    const [statScope, setStatScope] = useState('Per Game');

    return (
        <>
            <Navbar />
            <div className='h-96 w-full'>
                <img src="images/Home-Banners/basketball-game-concept.png"
                    alt='Stats component Image'
                    className='h-full w-full object-cover'/>
                </div>
            <div className='px-4 py-6'>
                
                <div className='max-w-6xl mx-auto'>
                <h2 className='text-2xl font-semibold mb-4 text-gray-800'>
                    Lideres de estadisticas
                </h2>
                <div className='flex justify-start mb-11'>
                    <MatchTypeFilter setSelectedMatchType={setMatchType}/>
                    <StatScopeFilter setSelectedStatScope={setStatScope} />
                </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                        <StatsLeaders matchType={matchType} statScope={statScope} statType='points' />
                        <StatsLeaders matchType={matchType} statScope={statScope} statType="assists" />
                        <StatsLeaders matchType={matchType} statScope={statScope} statType="rebounds" />
                        <StatsLeaders matchType={matchType} statScope={statScope} statType="steals" />
                        <StatsLeaders matchType={matchType} statScope={statScope} statType="blocks" />
                        <StatsLeaders matchType={matchType} statScope={statScope} statType="turnovers" />
                        <StatsLeaders matchType={matchType} statScope={statScope} statType="pra" />
                        {/*<StatsLeaders matchType={matchType} statType="fg_percentage" />
                        <StatsLeaders matchType={matchType} statType="threeptm" />
                        <StatsLeaders matchType={matchType} statType="threept_percentage" />
                        <StatsLeaders matchType={matchType} statType="ft_percentage" />*/}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default GeneralStats;
