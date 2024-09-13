import NavBar from "../NavBar.jsx"
import PresentationPage from '../PresentationPage.jsx'
import Footer from "../Footer.jsx"
import { useParams, useLocation } from "react-router-dom"
import TeamTabs from '../teams/TeamTabs.jsx'
import { useEffect } from "react"

const Team = () => {
    const {teamId} = useParams();
    const location = useLocation();
    useEffect(() => {
        window.scrollTo({
            top:0,
            behavior: 'smooth'
        });
      }, [location.key]);
    return (
        <>
            <NavBar />
            <PresentationPage teamId={parseInt(teamId,10)}/>
            <TeamTabs teamId={teamId}/>
            <Footer />
        </>
    )
}

export default Team