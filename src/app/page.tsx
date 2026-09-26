"use client"

import { useState, useEffect } from "react"
import Loader from "./components/loader";
import Spiral from "./components/spiral";
import PageTest from "./components/pagetest"

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
              <PageTest />
              <link rel="icon" href="/svg/favicon.svg" sizes="any" type="image/svg+xml"></link>
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
