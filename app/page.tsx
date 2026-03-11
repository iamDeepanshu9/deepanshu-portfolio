import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Blog from "./components/Blog";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import FloatingContactButton from "./components/FloatingContactButton";

export default function Home() {
  return (
    <main className="flex flex-col w-full relative">
      <Hero />
      <Skills />
      <Portfolio />
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full gap-8">
        <div className="flex-1">
          <Blog />
        </div>
        <div className="flex-1">
          <Testimonials />
        </div>
      </div>
      <Contact />

      {/* Floating Contact Button */}
      <FloatingContactButton />
    </main>
  );
}
