import Footer from '../Footer';
import Navbar from '../NavBar';
import PresentationPage from '../PresentationPage'
import StatsLeaders from './StatsLeaders'; 

const GeneralStats = () => {

    return (
        <>
            <Navbar />
            <PresentationPage
                imageURL='https://ulznkxovycorqeblrjxk.supabase.co/storage/v1/object/public/PresentationPage%20Images/basketball-game-concept.webp?t=2024-09-02T17%3A13%3A10.428Z'
                alt='Stats component Image'/>
            <StatsLeaders />
            <Footer />
        </>
    );
};

export default GeneralStats;
