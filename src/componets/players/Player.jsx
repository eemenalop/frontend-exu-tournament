import Navbar from '../NavBar.jsx'
import Footer from '../Footer.jsx'
import { PlayerProfile }  from './PlayerProfile.jsx'
import { useParams } from "react-router-dom"



export default function Player(){

  const {playerId} = useParams();
  return (
    <>
      <Navbar />
      <PlayerProfile playerId={playerId}/>
      <Footer />
    </>
  )
}
