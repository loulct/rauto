import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react";
import { startSpringAnimation, endSpringAnimation } from "./const";
import Menu from "./menu";
import Image from "next/image";

function CardContent({ blob, onClose }: {
    blob: { url: string, name: string }
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
                <h1>{blob.name}</h1>
                <h2>{blob.name}</h2>
                <hr></hr>
                <br></br>
                <textarea rows={rows} cols={cols} disabled value={blob.name}></textarea>
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

function AnnouncementCard({ blob }: {
    blob: { url: string, name: string },
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
                        src={blob.url}
                        width={cardStyle.width}
                        height={cardStyle.height}
                        alt={'Image de ' + blob.name}
                        style={cardStyle}
                    />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && <CardContent blob={blob} onClose={() => setIsOpen(false)} />}
            </AnimatePresence>
        </div>
    );
};

function GenerateCards({ announcementblobs, methodcards, musiccards, artcards }: {
    announcementblobs: { url: string, name: string }[],
    methodcards: object[],
    musiccards: object[],
    artcards: object[],
}) {
    const announcementsId: string = "announcements";
    const methodsId: string = "methods";
    const musicId: string = "music";
    const artId: string = "art";
    const [isActive, setIsActive] = useState(announcementsId);

    return (
        <div className="flex my-24">
            <motion.div className="cards-container flex flex-shrink-0">
                <Menu state={isActive} stateFunc={setIsActive} />
                <AnimatePresence>
                    {announcementblobs.map((blob: { url: string, name: string }, index: number) => {
                        if (methodcards.length == 0 || musiccards.length == 0 || artcards.length == 0) {
                            return (
                                <motion.div
                                    key={announcementsId + index}
                                    animate={isActive === announcementsId ? { scale: 1 } : { scale: 0 }}
                                >
                                    <AnnouncementCard blob={blob} />
                                </motion.div>
                            )
                        } else {
                            return (
                                <motion.div
                                    key={announcementsId + index}
                                    animate={isActive === announcementsId ? { scale: 1 } : { scale: 0, display: "none" }}
                                >
                                    {/* <AnnouncementCard card={card} /> */}
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

function Cards() {
    const [blobs, setBlobs] = useState<{url: string, name: string}[]>([]);

    useEffect(() => {
        fetch("/api/files?prefix=test")
            .then((res) => res.json())
            .then((data) => data.filter((b: { url: string, name: string }) => !b.name.endsWith("/")))
            .then((data) => setBlobs(data));
    }, []);

    return (
        <div className="overflow-hidden select-none">
            <GenerateCards announcementblobs={blobs} methodcards={[]} musiccards={[]} artcards={[]} />
        </div>
    );
};

export default Cards;