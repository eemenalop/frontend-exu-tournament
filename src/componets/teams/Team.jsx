import NavBar from "../NavBar.jsx"
import PresentationPage from '../PresentationPage.jsx'
import Footer from "../Footer.jsx"
import { useParams } from "react-router-dom"
import TeamTabs from '../teams/TeamTabs.jsx'

const Team = () => {
    const {teamId} = useParams();
    return (
        <>
            <NavBar />
            <PresentationPage 
            className=''
            imageURL='https://ulznkxovycorqeblrjxk.supabase.co/storage/v1/object/public/PresentationPage%20Images/basketball-game-concept.webp?t=2024-09-02T17%3A13%3A10.428Z'/>
            <TeamTabs teamId={teamId}/>
            <Footer />
        </>
    )
}

export default Team