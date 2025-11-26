import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Blog from "./components/Blog";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import FloatingContactButton from "./components/FloatingContactButton";

export default function Home() {
  return (
    <main className="flex flex-col w-full bg-white">
      <Hero />
      <Skills />
      <Portfolio />
      <Blog />
      <Testimonials />
      <Contact />

      {/* Floating Contact Button */}
      <FloatingContactButton />

      <footer className="py-8 bg-white border-t border-gray-100 text-center">
        <p className="text-gray-400 font-sans text-sm uppercase tracking-widest">
          © {new Date().getFullYear()} Deepanshu Kumar. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}
