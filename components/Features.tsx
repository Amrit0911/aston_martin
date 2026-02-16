"use client";

import { CAR_FEATURES } from "@/data/carData";
import { motion } from "framer-motion";

export default function Features() {
    return (
        <section className="py-24 bg-pagani-black relative z-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-heading font-black text-white uppercase mb-16 text-right tracking-[0.2em]"
                >
                    Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-pagani-gold to-yellow-500">Excellence</span>
                </motion.h2>

                <div className="space-y-16">
                    {CAR_FEATURES.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            <div className="flex-1 w-full relative group">
                                <div className="absolute inset-0 bg-pagani-gold/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="border border-white/10 p-8 relative z-10 bg-white/5 backdrop-blur-md rounded-xl hover:border-pagani-gold/30 transition-all duration-300">
                                    <div className="text-pagani-gold text-xs font-sans uppercase tracking-[0.4em] mb-4">
                                        Feature 0{index + 1}
                                    </div>
                                    <h3 className="text-2xl md:text-4xl font-heading font-bold text-white mb-6 uppercase tracking-wider">{feature.title}</h3>
                                    <p className="text-gray-300 font-sans leading-relaxed text-lg">{feature.description}</p>
                                </div>
                            </div>
                            <div className="flex-1 w-full hidden md:block">
                                {/* Imagine a relevant image here, for now using decorative elements */}
                                <div className={`w-full h-px bg-gradient-to-r from-transparent via-pagani-gold to-transparent opacity-30 ${index % 2 !== 0 ? "scale-x-[-1]" : ""}`} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
