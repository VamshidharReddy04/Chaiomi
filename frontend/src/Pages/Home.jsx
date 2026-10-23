// Home page combines all customer-facing sections.
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import HowItWorks from "../Components/HowItWorks";
import CustomerJourney from "../Components/CustomerJourney";
import Location from "../Components/Location";
import AppSection from "../Components/AppSection";
import About from "../Components/About";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";
import ScrollReveal from "../Components/ScrollReveal";
import "../Styles/home.css";

function Home() {
  return (
    <div className="home-page">
      <Navbar overlay />
      <ScrollReveal>
        <Hero />
      </ScrollReveal>
      <ScrollReveal>
        <HowItWorks />
      </ScrollReveal>
      <ScrollReveal>
        <CustomerJourney />
      </ScrollReveal>
      <ScrollReveal>
        <About />
      </ScrollReveal>
      <ScrollReveal>
        <Contact />
      </ScrollReveal>
      <ScrollReveal>
        <AppSection />
      </ScrollReveal>
      <ScrollReveal>
        <Location />
      </ScrollReveal>
      <Footer />
    </div>
  );
}

export default Home;
