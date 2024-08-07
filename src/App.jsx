import HomeBar from './componets/HomeBar';
import Standing from './componets/Standings';
import Logos from './componets/Logos';
import PlayerOfTheGame from './componets/PlayerOfTheGame';

function App() {
  return (
    <div>
      <HomeBar />
      <Logos />
      <PlayerOfTheGame/>
      <Standing />
    </div>
  );
}

export default App;
