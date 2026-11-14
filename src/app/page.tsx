import { Nav } from "@/components/Nav";
import { About } from "@/components/sections/About";
import { Capacities } from "@/components/sections/Capacities";
import { Enduro } from "@/components/sections/Enduro";
import { Footer } from "@/components/sections/Footer";
import { Preorder } from "@/components/sections/Preorder";

export default function Home() {
  return (
    <>
      <main>
        {/* Hero: generadores eléctricos industriales con pestañas de capacidad. */}
        <Capacities />
        <About />
        <Enduro />
        <Preorder />
      </main>
      <Footer />
      {/* Va al final para que sus ScrollTriggers se calculen después de los pins de las secciones. */}
      <Nav />
    </>
  );
}
