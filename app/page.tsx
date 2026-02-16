"use client";

import { useScroll, AnimatePresence, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ZondaScrollCanvas from "@/components/ZondaScrollCanvas";
import ZondaExperience from "@/components/ZondaExperience";
import SpecsGrid from "@/components/SpecsGrid";
import Features from "@/components/Features";
import Footer from "@/components/Footer";


function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-heading text-white"
    >
      <div className="text-xl md:text-2xl tracking-[0.3em] text-pagani-gold animate-pulse">
        INITIALIZING SYSTEM
      </div>
      <div className="mt-6 w-64 h-0.5 bg-gray-800 relative overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-white"
        />
      </div>
    </motion.div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Lock body scroll during loading and reset position propery
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      // Force reset to top when loaded to start animation fresh
      window.scrollTo(0, 0);
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  return (
    <main className="bg-pagani-black text-white relative w-full selection:bg-pagani-gold selection:text-black">
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <Navbar />

      {/* Main Scroll Container */}
      <section ref={containerRef} className="h-[500vh] relative z-10 w-full">
        {/* Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
          <ZondaScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={181}
            imageFolderPath="/images/aston martin-jpg"
            onLoaded={() => setTimeout(() => setIsLoading(false), 800)}
          />

          {/* Only show experience once loaded to avoid pop-in */}

          <ZondaExperience scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* Content Below */}
      <div className="relative z-20 bg-pagani-black border-t border-white/10 shadow-[0_-50px_100px_rgba(0,0,0,0.8)]">
        <SpecsGrid />
        <Features />
        <Footer />
      </div>
    </main>
  );
}
