import Hero from "../components/Hero/Hero";
import GetStarted from "../components/GetStarted/GetStarted";
import About from "../components/About/About";
import Services from "../components/Services/Services";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import Careers from "../components/Careers/Careers";
import Contact from "../components/Contact/Contact";

const Home = () => {
  return (
    <>
      <Hero />
      <GetStarted />
      <About />
      <Services />
      <WhyChooseUs />
      <Careers />
      <Contact />
    </>
  );
};
export default Home;