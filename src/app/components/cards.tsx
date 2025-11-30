import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react";
import { startSpringAnimation, endSpringAnimation, articlesId, methodsId, musicId, artId, hostname } from "./const";
import Menu from "./menu";
import Image from "next/image";

function CardContent({ menu, blob, onClose }: {
    menu: string,
    blob: { url: string, name: string }
    onClose: () => void
},) {
    const [text, setText] = useState<string>();

    useEffect(() => {
        fetch(`${hostname}/${menu}/${blob.name}.txt`)
            .then((res) => res.text())
            .then((data) => setText(data));
    }, []);

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
                <hr></hr>
                <br></br>
                <textarea rows={rows} cols={cols} disabled value={text}></textarea>
            </motion.div>
        </motion.div>
    );
};

function Card({ menu, blob, hasContent }: {
    menu: string,
    blob: { url: string, name: string },
    hasContent: boolean
},
) {
    const cardStyle: { height: number, width: number } = {
        height: 480,
        width: 384,
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
                        style={{height: "auto", borderRadius: "5%"}}
                    />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && hasContent && <CardContent menu={menu} blob={blob} onClose={() => setIsOpen(false)} />}
            </AnimatePresence>
        </div>
    );
};

function GenerateCards({ articlesBlobs, methodsBlobs, musicBlobs, artBlobs }: {
    articlesBlobs: { url: string, name: string }[],
    methodsBlobs: { url: string, name: string }[],
    musicBlobs: { url: string, name: string }[],
    artBlobs: { url: string, name: string }[],
}) {
    const [isActive, setIsActive] = useState(articlesId);

    return (
        <div className="flex my-24">
            <motion.div className="cards-container flex flex-shrink-0">
                <Menu menu={isActive} menuFunc={setIsActive} />
                <AnimatePresence>
                    {articlesBlobs.map((blob: { url: string, name: string }, index: number) => {
                        return (
                            <motion.div
                                key={articlesId + index}
                                style={{ transition: "all 0.25s", transitionBehavior: "allow-discrete" }}
                                animate={isActive === articlesId ? { scale: 1 } : { scale: 0, display: "none" }}
                            >
                                <Card menu={isActive} blob={blob} hasContent={true} />
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
                <AnimatePresence>
                    {methodsBlobs.map((blob: { url: string, name: string }, index: number) => {
                        return (
                            <motion.div
                                key={methodsId + index}
                                style={{ transition: "all 0.25s", transitionBehavior: "allow-discrete" }}
                                animate={isActive === methodsId ? { scale: 1 } : { scale: 0, display: "none" }}
                            >
                                <Card menu={isActive} blob={blob} hasContent={true} />
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
                <AnimatePresence>
                    {musicBlobs.map((blob: { url: string, name: string }, index: number) => {
                        return (
                            <motion.div
                                key={musicId + index}
                                style={{ transition: "all 0.25s", transitionBehavior: "allow-discrete" }}
                                animate={isActive === musicId ? { scale: 1 } : { scale: 0, display: "none" }}
                            >
                                <Card menu={isActive} blob={blob} hasContent={false} />
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
                <AnimatePresence>
                    {artBlobs.map((blob: { url: string, name: string }, index: number) => {
                        return (
                            <motion.div
                                key={artId + index}
                                style={{ transition: "all 0.25s", transitionBehavior: "allow-discrete" }}
                                animate={isActive === artId ? { scale: 1 } : { scale: 0, display: "none" }}
                            >
                                <Card menu={isActive} blob={blob} hasContent={false} />
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

function Cards() {
    const [articlesBlobs, setArticlesBlobs] = useState<{ url: string, name: string }[]>([]);
    const [methodsBlobs, setMethodsBlobs] = useState<{ url: string, name: string }[]>([]);
    const [musicBlobs, setMusicBlobs] = useState<{ url: string, name: string }[]>([]);
    const [artBlobs, setArtBlobs] = useState<{ url: string, name: string }[]>([]);

    useEffect(() => {
        fetch(`/api/img?prefix=articles`)
            .then((res) => res.json())
            .then((data) => setArticlesBlobs(data));
    }, []);
    useEffect(() => {
        fetch(`/api/img?prefix=methods`)
            .then((res) => res.json())
            .then((data) => setMethodsBlobs(data));
    }, []);
    useEffect(() => {
        fetch(`/api/img?prefix=music`)
            .then((res) => res.json())
            .then((data) => setMusicBlobs(data));
    }, []);
    useEffect(() => {
        fetch(`/api/img?prefix=design`)
            .then((res) => res.json())
            .then((data) => setArtBlobs(data));
    }, []);

    return (
        <div className="overflow-hidden select-none">
            <GenerateCards articlesBlobs={articlesBlobs} methodsBlobs={methodsBlobs} musicBlobs={musicBlobs} artBlobs={artBlobs} />
        </div>
    );
};

export default Cards;