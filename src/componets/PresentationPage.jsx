import { PropTypes } from 'prop-types';

const PresentationPage = ({ imageURL }) => {
    if (!imageURL) {
        return <div className="text-red-500">Error: La URL de la imagen no está disponible.</div>;
    }

    return (
        <div className="relative h-60 bg-gray-100 z-10">
            <img
                src={imageURL}
                alt="Presentation"
                className="absolute inset-0 w-full h-full object-cover"
            />
        </div>
    );
}
PresentationPage.propTypes = {
    imageURL: PropTypes.string.isRequired,  
};

export default PresentationPage;
