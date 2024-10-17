import Navbar from "./sections/navbar/Navbar.tsx"
import Hero from "./sections/hero/Hero.tsx"
import About from "./sections/about/About.tsx"

const App = () => {
  return (
    <main className="max-w-7xl mx-auto">
      <Navbar />
      <Hero />
      <About />
    </main>
  )
}
export default App