import { animate, motion, useMotionValue, useTransform } from "motion/react"
import { useEffect } from "react"
import { springTransition, startSpringAnimation, endSpringAnimation } from "./const"
import "../styles/counter.css"

const currentValue: number = 2600;

function Counter() {
    const animationDuration: number = 3;

    const count = useMotionValue(0);
    const rounded = useTransform(() => Math.round(count.get()));

    useEffect(() => {
        const controls = animate(count, currentValue, { duration: animationDuration })
        return () => controls.stop()
    }, []);

    return (
        <motion.div
            className="counter-wrapper"
            initial={startSpringAnimation}
            animate={endSpringAnimation}
            transition={springTransition}
        >
            <motion.pre className="counter-content">{rounded}</motion.pre> Camarades
        </motion.div>
    );
};

export default Counter;