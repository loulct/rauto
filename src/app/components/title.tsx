import { motion } from "motion/react"
import { springTransition, startSpringAnimation, endSpringAnimation } from "./const";
import "../styles/title.css"

const pixelSize: number = 144;
const circleRadius: string = "50%";

const avatar = {
    name: 'Rouen Autonome',
    desc: 'Collectif d\'Éducation Populaire Antifasciste',
    imageUrl: '/rauto/svg/favicon.svg',
    imageSize: pixelSize,
    borderRadius: circleRadius
};

function Avatar() {
    return (
        <>
            <img
                className="avatar"
                src={avatar.imageUrl}
                alt={'Image de ' + avatar.name}
                style={{
                    width: avatar.imageSize,
                    height: avatar.imageSize,
                    borderRadius: avatar.borderRadius
                }}
            />
        </>
    );
};

function Title() {
    const circle = {
        width: pixelSize,
        height: pixelSize,
        borderRadius: circleRadius,
    };
    const circleTap = { scale: 0.8 };
    const circleHover = { scale: 1.2 };
    return (
        <div className="title-wrapper">
            <motion.div
                initial={startSpringAnimation}
                animate={endSpringAnimation}
                transition={springTransition}
                whileHover={circleHover}
                whileTap={circleTap}
                style={circle}
            >
                <Avatar />
            </motion.div>
            <h1 className="title" data-text={avatar.name}><span>{avatar.name}</span></h1>
            <h2 className="desc">{avatar.desc}</h2>
        </div>
    );
};

export default Title;