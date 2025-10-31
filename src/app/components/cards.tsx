import { AnimatePresence, motion } from "motion/react"
import { useState } from "react";
import { startSpringAnimation, endSpringAnimation } from "./const";
import "../styles/cards.css"
// import Menu from "./menu";

function CardContent({ card, onClose }: {
    card: {
        title: string,
        subtitle: string,
        imageUrl: string,
        text: string,
    },
    onClose: () => void
},) {
    const rows: number = 30;
    const cols: number = 50;
    const modalSpringTransition: { duration: number, scale: { type: string, visualDuration: number, bounce: number } } = {
        duration: 0.3,
        scale: { type: "spring", visualDuration: 0.3, bounce: 0.2 },
    };
    return (
        <motion.div
            className="overlay"
            onClick={onClose}
        >
            <motion.div
                className="modal-card"
                onClick={(e) => e.stopPropagation()}
                initial={startSpringAnimation}
                animate={endSpringAnimation}
                transition={modalSpringTransition}
            >
                <button className="close-button" onClick={onClose}>
                    Fermer
                </button>
                <h1>{card.title}</h1>
                <h2>{card.subtitle}</h2>
                <hr></hr>
                <br></br>
                <textarea rows={rows} cols={cols} disabled value={card.text}></textarea>
            </motion.div>
        </motion.div>
    );
};

function Card({ card }: {
    card: {
        title: string,
        subtitle: string,
        imageUrl: string,
        text: string,
    },
},
) {
    const cardStyle: { height: number, width: number, borderRadius: string } = {
        height: 480,
        width: 384,
        borderRadius: "5%",
    };
    const cardHover: { scale: number } = { scale: 1.1 };

    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="modal-wrapper">
            <button className="open-button" onClick={() => setIsOpen(true)}>
                <motion.div
                    whileHover={cardHover}
                    style={{ padding: "5%" }}
                >
                    <img
                        className="card"
                        src={card.imageUrl}
                        alt={'Image de ' + card.title}
                        style={cardStyle}
                    />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && <CardContent card={card} onClose={() => setIsOpen(false)} />}
            </AnimatePresence>
        </div>
    );
};

function GenerateCards({ cards, state }: {
    cards: {
        title: string,
        subtitle: string,
        imageUrl: string,
        text: string,
    }[],
    state: string,
}) {
    const activeId: string = "announcements";

    return (
        <div className="flex my-24">
            <motion.div className="cards-container flex flex-shrink-0">
                {/* <Menu state={state} stateFunc={() => null} /> */}
                {cards.map((card: any, index: number) => {
                    return (
                        <motion.div
                            key={index}
                            animate={state === activeId ? { scale: 1 } : { scale: 0 }}
                        >
                            <Card card={card} />
                        </motion.div>
                    )
                })}
            </motion.div>
        </div>
    );
};


const card_list = [
    {
        title: 'Le spécisme',
        subtitle: '1er pas vers la déhumanisation',
        imageUrl: '/img/test.jpg',
        text: ""
    },
    {
        title: 'New Age',
        subtitle: 'Profit des croyanc€s',
        imageUrl: '/img/test_2.jpg',
        text: ""
    },
    {
        title: 'New Age',
        subtitle: 'Profit des croyanc€s',
        imageUrl: '/img/test_2.jpg',
        text: ""
    },
    {
        title: 'New Age',
        subtitle: 'Profit des croyanc€s',
        imageUrl: '/img/test_2.jpg',
        text: ""
    },
    {
        title: 'New Age',
        subtitle: 'Profit des croyanc€s',
        imageUrl: '/img/test_2.jpg',
        text: ""
    },
];

function Cards({ state }: { state: string }) {
    return (
        <div className="overflow-hidden select-none">
            <GenerateCards cards={card_list} state={state} />
        </div>
    );
};

export default Cards;