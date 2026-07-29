import { SiteChrome } from "@/components/sections/site-chrome";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Timeline } from "@/components/sections/timeline";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <SiteChrome />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
