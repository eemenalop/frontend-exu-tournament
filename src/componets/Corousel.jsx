import { Carousel } from "flowbite-react";

export default function HomeCarousel() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel pauseOnHover slideInterval={3000}>
        <img 
            src="https://ulznkxovycorqeblrjxk.supabase.co/storage/v1/object/public/team-logos/popiwa-logo.webp?t=2024-09-02T16%3A18%3A31.360Z" 
            alt="..." 
            className="transition-transform ease-in-out duration-1000 transform-gpu"
            />
        <img 
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg" 
            alt="..." 
            className="transition-transform ease-in-out duration-1000 transform-gpu"
            />
        <img 
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg" 
            alt="..." 
            className="transition-transform ease-in-out duration-1000 transform-gpu"
        />
        <img 
            src="https://flowbite.com/docs/images/carousel/carousel-4.svg" 
            alt="..." 
            className="transition-transform ease-in-out duration-1000 transform-gpu"
        />
        <img 
            src="https://flowbite.com/docs/images/carousel/carousel-5.svg" 
            alt="..." 
            className="transition-transform ease-in-out duration-1000 transform-gpu"
        />
      </Carousel>
    </div>
  );
}
