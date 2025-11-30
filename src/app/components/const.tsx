export const
    springTransition: { duration: number, scale: { type: string, visualDuration: number, bounce: number } } = {
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
    },
    startSpringAnimation: { opacity: number, scale: number } = { opacity: 0, scale: 0 },
    endSpringAnimation: { opacity: number, scale: number } = { opacity: 1, scale: 1 },
    articlesId: string = "articles",
    methodsId: string = "methods",
    musicId: string = "music",
    artId: string = "art",
    hostname = "https://jm8ktdnojji1jl4w.public.blob.vercel-storage.com";