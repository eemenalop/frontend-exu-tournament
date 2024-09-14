import { Carousel } from "flowbite-react";

export default function HomeCarousel() {
  return (
    <div>
      {/* Carrusel para escritorio */}
      <div className="hidden sm:block h-80 xl:h-96 2xl:h-[500px]">
        <Carousel pauseOnHover slideInterval={3000} className="transition-all duration-700 ease-in-out">
          <img
            src="images/Home-Banners/Banner_1_exuitesa.png"
            alt="Banner Exuitesa"
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
          />
          <img
            src="images/Home-Banners/BANNER_2_Popiwa_campeones.png"
            alt="Banner Actuales campeones popiwa"
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
          />
          <img
            src="images/Home-Banners/Banner_3_collage.png"
            alt="Banner Collage"
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
          />
        </Carousel>
      </div>

      {/*Móvil */}
      <div className="block sm:hidden h-96 xl:h-80 2xl:h-[400px]">
        <Carousel pauseOnHover slideInterval={2500} className="transition-all duration-700 ease-in-out">
          <img
            src="/images/Home-Banners/banner_movil_exuitesa_1.png"
            alt="Mobile Image 1"
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
          />
          <img
            src="/images/Home-Banners/banner movil_popiwa_campeones_2.png"
            alt="Mobile Image 2"
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
          />
          <img
            src="images/Home-Banners/Banner_collage_movil_1.png"
            alt="Mobile Image 2"
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
          />
        </Carousel>
      </div>
    </div>
  );
}
