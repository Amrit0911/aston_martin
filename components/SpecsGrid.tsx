"use client";

import { CAR_SPECS } from "@/data/carData";
import { motion } from "framer-motion";

export default function SpecsGrid() {
    return (
        <section className="py-24 bg-pagani-black relative z-20 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-heading font-bold text-white uppercase mb-16 text-center tracking-widest"
                >
                    Technical <span className="text-pagani-gold">Specifications</span>
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {CAR_SPECS.map((spec, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group p-6 border border-white/5 hover:border-pagani-gold/50 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className="text-xs font-sans text-gray-400 uppercase tracking-widest mb-2 group-hover:text-pagani-gold transition-colors">{spec.label}</div>
                            <div className="text-xl md:text-2xl font-heading text-white font-bold">{spec.value}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
