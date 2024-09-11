import NavBar from './NavBar.jsx';
import Logos from './Logos.jsx';
import Standing from './Standings.jsx';
import Footer from './Footer.jsx';
import Carousel from './Corousel.jsx'

function Home() {
  return (
    <>
      <NavBar />
      <Carousel/>
      <Logos />
      <Standing />
      <Footer />
    </>
  )
}

export default Home;
