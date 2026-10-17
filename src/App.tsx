import Navbar from "./sections/navbar/Navbar.tsx"
import Hero from "./sections/hero/Hero.tsx"
import About from "./sections/about/About.tsx"
import Projects from "./sections/projects/Projects.tsx"
import Contact from "./sections/contact/Contact.tsx"
import Footer from "./sections/footer/Footer.tsx"
import Experience from "./sections/experience/Experience.tsx"
//import Clients from "./sections/clients/Clients.tsx"
import { AiChatWidget } from "./components/AiChat/AiChatWidget.tsx"
import { SmartRecommender } from "./components/SmartRecommender/SmartRecommender.tsx"

const App = () => {
  return (
    <main className="max-w-7xl mx-auto relative">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      {/*<Clients />*/}
      <Experience />
      <Contact />
      <Footer />

      {/* AI Enhancements */}
      <SmartRecommender />
      <AiChatWidget />
    </main>
  )
}

export default App