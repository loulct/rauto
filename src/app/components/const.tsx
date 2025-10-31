export const
    springTransition: { duration: number, scale: { type: string, visualDuration: number, bounce: number } } = {
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
    },
    startSpringAnimation: { opacity: number, scale: number } = { opacity: 0, scale: 0 },
    endSpringAnimation: { opacity: number, scale: number } = { opacity: 1, scale: 1 };