import { AnimatePresence, motion } from "motion/react"
import { useState } from "react";
import { startSpringAnimation, endSpringAnimation } from "./const";
import Menu from "./menu";
import Image from "next/image";
import fetch from "../backend/fetch";

const mediaPath =
    process.env.NEXT_PUBLIC_PLATFORM === "vercel"
        ? ""
        : process.env.NEXT_PUBLIC_PLATFORM === "local" ? "" : "/rauto";

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
function MethodCard({ card }: {
    card: object,
},
) {
    return (<></>)
}

function MusicCard({ card }: {
    card: object,
},
) {
    return (<></>)
}

function ArtCard({ card }: {
    card: object,
},
) {
    return (<></>)
}

function AnnouncementCard({ card }: {
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
                    <Image
                        className="card"
                        src={card.imageUrl}
                        width={cardStyle.width}
                        height={cardStyle.height}
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

function GenerateCards({ announcementcards, methodcards, musiccards, artcards }: {
    announcementcards: {
        title: string,
        subtitle: string,
        imageUrl: string,
        text: string,
    }[],
    methodcards: object[],
    musiccards: object[],
    artcards: object[],
}) {
    const announcementsId: string = "announcements";
    const methodsId: string = "methods";
    const musicId: string = "music";
    const artId: string = "art";
    const [isActive, setIsActive] = useState(announcementsId);

    const test = fetch("test/")
    console.log(test)

    return (
        <div className="flex my-24">
            <motion.div className="cards-container flex flex-shrink-0">
                <Menu state={isActive} stateFunc={setIsActive} />
                <AnimatePresence>
                    {announcementcards.map((card: {
                        title: string,
                        subtitle: string,
                        imageUrl: string,
                        text: string,
                    }, index: number) => {
                        if (methodcards.length == 0 || musiccards.length == 0 || artcards.length == 0) {
                            return (
                                <motion.div
                                    key={announcementsId + index}
                                    animate={isActive === announcementsId ? { scale: 1 } : { scale: 0 }}
                                >
                                    <AnnouncementCard card={card} />
                                </motion.div>
                            )
                        } else {
                            return (
                                <motion.div
                                    key={announcementsId + index}
                                    animate={isActive === announcementsId ? { scale: 1 } : { scale: 0, display: "none" }}
                                >
                                    <AnnouncementCard card={card} />
                                </motion.div>
                            )
                        }
                    })}
                </AnimatePresence>
                <AnimatePresence>
                    {methodcards.map((card: object, index: number) => {
                        return (
                            <motion.div
                                key={methodsId + index}
                                animate={isActive === methodsId ? { scale: 1 } : { scale: 0, display: "none" }}
                            >
                                <MethodCard card={card} />
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
                <AnimatePresence>
                    {musiccards.map((card: object, index: number) => {
                        return (
                            <motion.div
                                key={musicId + index}
                                animate={isActive === musicId ? { scale: 1 } : { scale: 0, display: "none" }}
                            >
                                <MusicCard card={card} />
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
                <AnimatePresence>
                    {artcards.map((card: object, index: number) => {
                        return (
                            <motion.div
                                key={artId + index}
                                animate={isActive === artId ? { scale: 1 } : { scale: 0, display: "none" }}
                            >
                                <ArtCard card={card} />
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

const announcement_card_list = [
    {
        title: 'Le spécisme',
        subtitle: '1er pas vers la déhumanisation',
        imageUrl: `${mediaPath}/img/test.jpg`,
        text: ""
    },
    {
        title: 'New Age',
        subtitle: 'Profit des croyanc€s',
        imageUrl: `${mediaPath}/img/test_2.jpg`,
        text: ""
    },
    {
        title: 'New Age',
        subtitle: 'Profit des croyanc€s',
        imageUrl: `${mediaPath}/img/test_2.jpg`,
        text: ""
    },
    {
        title: 'New Age',
        subtitle: 'Profit des croyanc€s',
        imageUrl: `${mediaPath}/img/test_2.jpg`,
        text: ""
    },
    {
        title: 'New Age',
        subtitle: 'Profit des croyanc€s',
        imageUrl: `${mediaPath}/img/test_2.jpg`,
        text: ""
    },
];

function Cards() {
    return (
        <div className="overflow-hidden select-none">
            <GenerateCards announcementcards={announcement_card_list} methodcards={[]} musiccards={[]} artcards={[]} />
        </div>
    );
};

export default Cards;