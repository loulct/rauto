import React from "react";
import { motion } from "motion/react"
import Image from "next/image";
import "../styles/marquee.css"

const fromDefault: string = "100%";
const toDefault: string = "-100%";
const marqueeTransition: any = { duration: 30, repeat: Infinity, ease: "linear" };

function MarqueeTextContent({ texts, from = fromDefault, to = toDefault }: {
    texts: string[],
    from?: string,
    to?: string
}) {
    return (
        <div className="flex my-24">
            <motion.div
                initial={{ x: `${from}` }}
                animate={{ x: `${to}` }}
                transition={marqueeTransition}
                className="flex flex-shrink-0"
            >
                {texts.map((text: any, index: number) => {
                    return <h4 className="marquee-text-content" key={index}>--- {text} ---</h4>
                })}
            </motion.div>
        </div>
    );
};


function MarqueeText() {
    const text_list = [
        "Collectif d\'Éducation Populaire Antifasciste",
        "Pour une autonomie organisée!",
        "Groupuscule pseudo-militant",
    ]

    return (
        <div className="marquee-text-container overflow-hidden select-none">
            <MarqueeTextContent texts={text_list} />
        </div>
    );
};

function MarqueeSticker({ stickers, from = fromDefault, to = toDefault }: {
    stickers: string[],
    from?: string,
    to?: string
}) {
    const imgSize : number = 144;
    return (
        <div className="flex my-24">
            <motion.div
                initial={{ x: `${from}` }}
                animate={{ x: `${to}` }}
                transition={marqueeTransition}
                className="flex flex-shrink-0"
            >
                {stickers.map((sticker: any, index: number) => {
                    return <Image width={imgSize} height={imgSize} alt={`marqueImg${index}`}
                        className="object-contain pr-20" src={sticker} key={index} />
                })}
            </motion.div>
        </div>
    );
};

let stickers = [
    "/svg/favicon.svg",
];

export function MarqueeStickers() {
    return (
        <div className="container mx-auto overflow-hidden select-none">
            <MarqueeSticker stickers={stickers} />
        </div>
    );
};

export default MarqueeText;