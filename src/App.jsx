import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChoose from './components/WhyChoose';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans text-gray-900 bg-white">
      <Navbar />
      <Hero />
      <WhyChoose />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;