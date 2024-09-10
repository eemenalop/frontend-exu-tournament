import NavBar from './NavBar.jsx';
import Logos from './Logos.jsx';
import PlayerOfTheGame from './PlayerOfTheGame.jsx';
import Standing from './Standings.jsx';
import Footer from './Footer.jsx';
import Carousel from './Corousel.jsx'

function Home() {
  return (
    <>
      <NavBar />
      <Carousel/>
      <Logos />
      <PlayerOfTheGame />
      <Standing />
      <Footer />
    </>
  )
}

export default Home;
