import { Carousel } from "flowbite-react";

export default function HomeCarousel() {
  return (
    <div>
      {/* Carrusel para escritorio */}
      <div className="hidden sm:block h-80 xl:h-96 2xl:h-[500px]">
        <Carousel pauseOnHover slideInterval={2500} className="transition-all duration-700 ease-in-out">
          <img
            src="https://ulznkxovycorqeblrjxk.supabase.co/storage/v1/object/public/PresentationPage%20Images/BANNER-Liga-Exuitesa-carousel.png?t=2024-09-11T02%3A32%3A11.905Z"
            alt="Desktop Image 1"
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
          />
          <img
            src="https://ulznkxovycorqeblrjxk.supabase.co/storage/v1/object/public/Popiwa%20Player%20Photos/BANNER-carousel-popiwa.png?t=2024-09-12T00%3A46%3A33.950Z"
            alt="Desktop Image 2"
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
          />
        </Carousel>
      </div>

      {/*Móvil */}
      <div className="block sm:hidden h-96 xl:h-80 2xl:h-[400px]">
        <Carousel pauseOnHover slideInterval={2500} className="transition-all duration-700 ease-in-out">
          <img
            src="https://ulznkxovycorqeblrjxk.supabase.co/storage/v1/object/public/PresentationPage%20Images/carouselPrincipalmovil.png?t=2024-09-11T01%3A58%3A54.643Z"
            alt="Mobile Image 1"
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
          />
          <img
            src="https://ulznkxovycorqeblrjxk.supabase.co/storage/v1/object/public/Popiwa%20Player%20Photos/carouselpopiwamovil.png?t=2024-09-11T02%3A33%3A28.969Z"
            alt="Mobile Image 2"
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
          />
        </Carousel>
      </div>
    </div>
  );
}
