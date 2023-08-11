import HeroNav from "@components/main/HeroNav";
import Hero from "@components/main/Hero";

const LandingPage = () => {
  return (
    <div className="gradient min-h-screen w-screen">
      <HeroNav />
      <Hero />
    </div>
  );
};

export default LandingPage;
