export default function Footer() {
    return (
        <footer className="py-12 bg-black text-center text-xs text-gray-500 font-sans tracking-widest relative z-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
                <div className="mb-8 w-24 h-px bg-white/10" />
                <p className="uppercase mb-4">Crafted for Excellence | <span className="text-pagani-gold font-bold">Aston Martin</span></p>
                <p>© 2026 Aston Martin Lagonda. All rights reserved.</p>
                <div className="mt-8 flex gap-8">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                    <a href="#" className="hover:text-white transition-colors">Imprint</a>
                </div>
            </div>
        </footer>
    );
}
