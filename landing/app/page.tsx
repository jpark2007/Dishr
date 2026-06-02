import { ScrollProgressBar } from "@/components/ui";
import { Nav, Hero, Ticker, Problem, Features, Alive, Closer, Footer } from "@/components/sections";
import { Showpiece } from "@/components/Showpiece";

export default function Home() {
  return (
    <main>
      <ScrollProgressBar />
      <Nav />
      <Hero />
      <Ticker />
      <Problem />
      <div id="how">
        <Showpiece />
      </div>
      <Features />
      <Alive />
      <Ticker tone="dark" />
      <Closer />
      <Footer />
    </main>
  );
}
