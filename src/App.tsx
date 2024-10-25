import Navbar from "./sections/navbar/Navbar.tsx"
import Hero from "./sections/hero/Hero.tsx"
import About from "./sections/about/About.tsx"
import Projects from "./sections/projects/Projects.tsx"
import Clients from "./sections/clients/Clients.tsx"
import Contact from "./sections/contact/Contact.tsx"
import Footer from "./sections/footer/Footer.tsx"

const App = () => {

  return (
    <main className="max-w-7xl mx-auto">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Clients />
      <Contact />
      <Footer />
    </main>
  )
}

export default App