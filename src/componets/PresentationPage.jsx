import { PropTypes } from 'prop-types';

// eslint-disable-next-line react/prop-types
const PresentationPage = ({ teamId }) => {
    
    const images = {
        1: '/images/teamPage_Banners/playerandteam_banner_popiwa.png',
        2: '/images/teamPage_Banners/playerandteam_banner_lomaetro.png',
        3: '/images/teamPage_Banners/playerandteam_banner_loudest.png',
        4: '/images/teamPage_Banners/playerandteam_banner_toons.png'
    }

    const imageURL = images[teamId]

    if (!imageURL) {
        return <div className="text-red-500">Error: La URL de la imagen no está disponible.</div>;
    }

    return (
        <div className="relative h-[500px] bg-gray-100 z-10">
            <img
                src={imageURL}
                alt="Presentation page"
                className="absolute inset-0 w-full h-full object-cover"
            />
        </div>
    );
}
PresentationPage.propTypes = {
    teamId: PropTypes.number.isRequired,  
};

export default PresentationPage;
