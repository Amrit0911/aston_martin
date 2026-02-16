"use client";

import { MotionValue, useTransform, motion } from "framer-motion";

interface ZondaExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export default function ZondaExperience({ scrollYProgress }: ZondaExperienceProps) {
    // Phase 1: HERO (0% - 33%)
    const heroOpacity = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -50]);
    const heroScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.95]);

    // Phase 2: DESIGN (33% - 66%)
    const designOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
    const designX = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [-50, 0, 0, -50]);

    // Phase 3: ENGINE (66% - 100%)
    const engineOpacity = useTransform(scrollYProgress, [0.65, 0.75, 1], [0, 1, 1]);
    const engineX = useTransform(scrollYProgress, [0.65, 0.75], [50, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 w-full h-full overflow-hidden">
            {/* HUD Grid Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* HERO SECTION */}
            <motion.div
                style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
                className="absolute inset-0 flex flex-col justify-center items-center text-center p-4"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-xs font-sans tracking-[0.5em] text-pagani-gold uppercase whitespace-nowrap opacity-60">
                        Automotive Art
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-heading font-black tracking-tighter uppercase text-white mb-2 drop-shadow-2xl">
                        Aston Martin <span className="text-pagani-gold">DB11</span>
                    </h1>
                    <div className="w-24 h-1 bg-pagani-gold mx-auto mb-6" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="space-y-6"
                >
                    <p className="text-xl md:text-2xl font-sans tracking-[0.2em] text-gray-300 uppercase">
                        From €205,000
                    </p>
                    <button className="pointer-events-auto px-10 py-4 border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-pagani-gold hover:text-black hover:border-pagani-gold transition-all duration-300 font-heading uppercase text-sm tracking-[0.25em]">
                        Inquire Now
                    </button>
                </motion.div>
            </motion.div>

            {/* DESIGN SECTION */}
            <motion.div
                style={{ opacity: designOpacity, x: designX }}
                className="absolute top-1/2 -translate-y-1/2 left-8 md:left-24 max-w-xl"
            >
                <div className="border-l-2 border-pagani-gold pl-6 md:pl-8 py-2 bg-black/40 backdrop-blur-sm rounded-r-xl">
                    <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase mb-4 text-white tracking-wide">
                        Design
                    </h2>
                    <p className="text-lg md:text-xl font-sans text-gray-300 leading-relaxed tracking-wide">
                        Aerodynamic grand touring silhouette sculpted with bonded aluminum architecture and signature <span className="text-pagani-gold">Aston Martin grille</span>.
                    </p>
                </div>
            </motion.div>

            {/* ENGINE SECTION */}
            <motion.div
                style={{ opacity: engineOpacity, x: engineX }}
                className="absolute top-1/2 -translate-y-1/2 right-8 md:right-24 max-w-xl text-right"
            >
                <div className="border-r-2 border-pagani-gold pr-6 md:pr-8 py-2 bg-black/40 backdrop-blur-sm rounded-l-xl">
                    <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase mb-8 text-white tracking-wide">
                        Engine
                    </h2>
                    <div className="space-y-8 flex flex-col items-end">
                        <div className="group">
                            <div className="text-xs font-sans text-pagani-gold uppercase tracking-[0.3em] mb-1 group-hover:text-white transition-colors">Engine</div>
                            <div className="text-3xl md:text-4xl font-heading text-white uppercase tracking-wider">5.2L Twin-Turbo V12</div>
                        </div>
                        <div className="group">
                            <div className="text-xs font-sans text-pagani-gold uppercase tracking-[0.3em] mb-1 group-hover:text-white transition-colors">Power</div>
                            <div className="text-3xl md:text-4xl font-heading text-white uppercase tracking-wider">630 HP</div>
                        </div>
                        <div className="group">
                            <div className="text-xs font-sans text-pagani-gold uppercase tracking-[0.3em] mb-1 group-hover:text-white transition-colors">Top Speed</div>
                            <div className="text-3xl md:text-4xl font-heading text-white uppercase tracking-wider">334 KM/H</div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
