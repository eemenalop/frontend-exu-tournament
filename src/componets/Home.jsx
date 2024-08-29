import HomeBar from './HomeBar.jsx';
import Logos from './Logos.jsx';
import PlayerOfTheGame from './PlayerOfTheGame.jsx';
import Standing from './Standings.jsx';

function Home(){
  return (
    <>
        <HomeBar />
        <Logos />
        <PlayerOfTheGame/>
        <Standing />
    </>
  )
}

export default Home;
