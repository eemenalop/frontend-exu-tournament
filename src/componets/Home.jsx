import NavBar from './NavBar.jsx';
import Standing from './Standings.jsx';
import Footer from './Footer.jsx';
import Carousel from './Corousel.jsx'
import CalendarImg from  './CalendarImg.jsx'
import LogosCloud from './LogosCloud.jsx'

function Home() {
  return (
    <>
      <NavBar />
      <Carousel/>
      <LogosCloud />
      <CalendarImg/>
      <Standing />
      <Footer />
    </>
  )
}

export default Home;
