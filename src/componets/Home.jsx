import NavBar from './NavBar.jsx';
import Logos from './Logos.jsx';
import PlayerOfTheGame from './PlayerOfTheGame.jsx';
import Standing from './Standings.jsx';
import Footer from './Footer.jsx'
import TeamRoster from './teams/TeamRoster.jsx'

function Home() {
  return (
    <>
      <NavBar />
      <Logos />
      <PlayerOfTheGame />
      <Standing />
      <TeamRoster/>
      <Footer />
    </>
  )
}

export default Home;
