"use client"
import Counter from "./components/counter";
import Title from "./components/title";
import MarqueeText from "./components/marquee";
import MenuWrapper from "./components/menuWrapper";
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

  const activeId: string = "announcements";
  const [isActive, setIsActive] = useState(activeId);

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
              <MenuWrapper state={isActive} stateFunc={setIsActive}/>
              <link rel="icon" href="/svg/favicon.svg" sizes="any" type="image/svg+xml"></link>
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