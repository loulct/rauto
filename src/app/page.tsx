"use client"
import Counter from "./components/counter";
import Title from "./components/title";
import MarqueeText from "./components/marquee";
import Cards from "./components/cards";
import Experience from "./components/experience";
import { useState, useEffect } from "react"
import Loader from "./components/loader";
import Spiral from "./components/spiral";

function Home() {
  const [loading, setLoading] = useState(true);
  const delay: number = 3000;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Spiral />
          <Experience />
          <div
            style={
              {
                position: 'relative',
                zIndex: 1
              }
            }
            className="font-sans grid grid-rows-[20px_1fr_20px] items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"
          >
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
              <Title />
              <Counter />
              <MarqueeText />
              <Cards />
              <link rel="icon" href="/rauto/svg/favicon.svg" sizes="any" type="image/rauto/svg+xml"></link>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
            </footer>
          </div>
        </>
      )}
    </>
  );
};

export default Home;