import Footer from '../Footer';
import Navbar from '../NavBar';
import StatsLeaders from './StatsLeaders'; // Asegúrate de tener el componente StatsLeaders en el mismo directorio o ajusta la ruta

const GeneralStats = () => {

    return (
        <>
            <Navbar />
            <StatsLeaders />
            <Footer />
        </>
    );
};

export default GeneralStats;
