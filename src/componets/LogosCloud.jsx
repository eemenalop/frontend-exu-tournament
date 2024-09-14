import { Link } from "react-router-dom";

export default function LogosCloud() {
    return (
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-3xl md:text-4xl lg:text-6xl font-semibold leading-8 text-gray-900 font">
            Nuestros Equipos
          </h2>
          <div className="mx-auto mt-10 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
            {/* Logo 1 */}
            <div className="w-40 h-40 sm:w-60 sm:h-60 object-contain rounded-full shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-slate-950 hover:cursor-pointer">
              <Link
              to={'/team/1'}
              ><img
                alt="logo popiwa"
                src="images/teams_logos/popiwa_logo_1.png"
                className="w-full h-full object-contain"
              />
              </Link>
            </div>
  
            {/* Logo 2 */}
            <div className="w-40 h-40 sm:w-60 sm:h-60 object-contain rounded-full shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-slate-950 hover:cursor-pointer">
              <Link
              to={'team/2'}
              >
              <img
                alt="Lo' Maetro logo"
                src="images/teams_logos/lomaetro_logo_1.png"
                className="w-full h-full rounded-full object-contain"
              />
              </Link>
            </div>
  
            {/* Logo 3 */}
            <div className="w-40 h-40 sm:w-60 sm:h-60 object-contain rounded-full shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-slate-950 hover:cursor-pointer">
            <Link
              to={'team/3'}
              >
              <img
                alt="Loudest logo"
                src="images/teams_logos/loudest_togo_1.png"
                className="w-full h-full object-contain"
              />
              </Link>
            </div>
  
            {/* Logo 4 */}
            <div className="w-40 h-40 sm:w-60 sm:h-60 object-contain rounded-full shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-slate-950 hover:cursor-pointer">
            <Link
              to={'team/4'}
              >
              <img
                alt="toons logo"
                src="images/teams_logos/toons_logo_1.png"
                className="w-full h-full object-contain"
              />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  