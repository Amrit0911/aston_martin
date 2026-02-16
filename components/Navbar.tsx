"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 w-full z-50 px-6 py-4 transition-colors duration-500 ${scrolled
                    ? "bg-pagani-black/80 backdrop-blur-md border-b border-white/10"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-xl md:text-2xl font-bold tracking-[0.2em] text-white uppercase font-heading cursor-pointer">
                    Aston Martin
                </div>
                <button className="px-6 py-2 border border-white/30 text-white text-xs md:text-sm tracking-[0.2em] hover:bg-pagani-gold hover:border-pagani-gold hover:text-black transition-all duration-300 uppercase font-sans font-medium">
                    Inquire
                </button>
            </div>
        </motion.nav>
    );
}
