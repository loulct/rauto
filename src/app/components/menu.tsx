import { useRef } from "react"
import { motion, stagger } from "motion/react"
import "../styles/menu.css"

const items = [
  {
    name: 'announcements',
    desc: 'Annonces',
    imageUrl: '/svg/announcements.svg',
  },
  {
    name: 'methods',
    desc: 'Méthodes',
    imageUrl: '/svg/methods.svg',
  },
  {
    name: 'music',
    desc: 'Musique',
    imageUrl: '/svg/music.svg',
  },
  {
    name: 'art',
    desc: 'Art',
    imageUrl: '/svg/art.svg',
  },
];

const MenuItem = (
  { state, stateFunc, i }:
    {
      state: string,
      stateFunc: (state: string) => void,
      i: number
    }
) => {
  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  const imageSize: number = 92;
  const borderRadius: string = '50%';

  const circleHover: {} = { scale: 1.1 };
  const circleTap: {} = { scale: 0.95 };

  return (
    <motion.li
      className={`menu-item-list ${state === items[i].name ? "active" : ""}`}
      onClick={() => stateFunc(items[i].name)}
      variants={itemVariants}
      whileHover={circleHover}
      whileTap={circleTap}
    >
      <div className="menu-item-icon">
        <img
          className={items[i].name}
          src={items[i].imageUrl}
          alt={'Image de ' + items[i].name}
          style={{
            width: imageSize,
            height: imageSize,
            borderRadius: borderRadius
          }}
        />
      </div>
      <div
        className="menu-item-text"
        style={
          state === items[i].name ? { color: "white", backgroundColor: "black" } : {}
        }>
        <h1>{items[i].desc}</h1>
      </div>
    </motion.li>
  );
};

function Navigation(
  { state, stateFunc }:
    {
      state: string,
      stateFunc: (state: string) => void
    }
) {
  const navVariants = {
    open: {
      transition: { delayChildren: stagger(0.07, { startDelay: 0.2 }) },
    },
    closed: {
      transition: { delayChildren: stagger(0.05, { from: "last" }) },
    },
  };

  return (
    <motion.ul className="menu-list" variants={navVariants}>
      {items.map((i) => (
        <MenuItem state={state} stateFunc={stateFunc} i={items.indexOf(i)} key={items.indexOf(i)} />
      ))}
    </motion.ul>
  );
};

function Menu(
  { state, stateFunc }:
    {
      state: string,
      stateFunc: (state: string) => void
    }
) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div className="menu">
      <div className="menu-container">
        <motion.nav
          className="menu-nav"
          initial={false}
          ref={containerRef}
        >
          <motion.div className="menu-background" />
          <Navigation state={state} stateFunc={stateFunc} />
        </motion.nav>
      </div>
    </motion.div>
  );
};

export default Menu;