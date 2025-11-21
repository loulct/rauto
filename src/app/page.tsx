"use client"
import Counter from "./components/counter";
import Title from "./components/title";
import MarqueeText from "./components/marquee";
import Cards from "./components/cards";
import Experience from "./components/experience";
import { useState, useEffect } from "react"
import Loader from "./components/loader";
import Spiral from "./components/spiral";

const mediaPath =
  process.env.NODE_ENV === "production"
    ? "/rauto"
    : "/";

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
            className="home"
          >
            <main className="main">
              <Title />
              <Counter />
              <MarqueeText />
              <Cards />
              <link rel="icon" href={`${mediaPath}svg/favicon.svg`} sizes="any" type={`image${mediaPath}svg+xml`}></link>
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default Home;