import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    ShoppingCart,
    Mail,
    User,
    ArrowRight,
    Clock,
    Flame,
    Tag,
    Percent,
    Menu,
    X,
    Star,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const CountdownUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-yellow-500/10 border border-yellow-600/30 flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.15)]">
            <span className="text-xl sm:text-2xl font-extrabold text-yellow-400">{String(value).padStart(2, "0")}</span>
        </div>
        <span className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">{label}</span>
    </div>
);

const Deals = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [flashDeals, setFlashDeals] = useState([]);
    const [weeklyDeals, setWeeklyDeals] = useState([]);
    const [loading, setLoading] = useState(true);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: "Deals", path: "/deals" },
        { name: "Contact", path: "/contact" },
    ];

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const res = await axios.get("https://fakestoreapi.com/products");
                const products = res.data;
                // First 4 = flash deals, next 4 = weekly deals
                const addDealInfo = (p, i) => ({
                    ...p,
                    discount: Math.floor(30 + Math.random() * 25),
                    originalPrice: +(p.price * (1.4 + Math.random() * 0.4)).toFixed(2),
                    soldPercent: Math.floor(40 + Math.random() * 45),
                });
                setFlashDeals(products.slice(0, 4).map(addDealInfo));
                setWeeklyDeals(products.slice(4, 8).map(addDealInfo));
            } catch (err) {
                console.error("Failed to fetch deals:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDeals();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-yellow-500/30 overflow-x-hidden">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/30 via-black to-black" />
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-yellow-700/20 rounded-full blur-[150px]" />
                <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-600/20 rounded-full blur-[130px]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#fbbf241a_1px,transparent_1px),linear-gradient(to_bottom,#fbbf241a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
            </div>

            {/* Navbar */}
            <nav className="relative z-50 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center px-5 py-2.5 rounded-full border border-yellow-600/40 bg-yellow-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(234,179,8,0.15)]">
                        <span className="text-lg font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-600">STORE NAME</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link key={link.name} to={link.path} className={`text-sm font-medium transition-colors duration-200 ${link.name === "Deals" ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"}`}>{link.name}</Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate("/auth")} className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-600/30 bg-yellow-500/10 text-yellow-400 text-sm font-medium hover:bg-yellow-500/20 transition-all duration-300">
                            <User className="h-4 w-4" /><span>Store</span>
                        </button>
                        <button className="p-2.5 rounded-full border border-yellow-600/30 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-all duration-300"><Mail className="h-4 w-4" /></button>
                        <button className="p-2.5 rounded-full border border-yellow-600/30 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-all duration-300"><ShoppingCart className="h-4 w-4" /></button>
                        <button className="md:hidden p-2.5 rounded-full border border-yellow-600/30 bg-yellow-500/10 text-yellow-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </button>
                    </div>
                </div>
                {mobileMenuOpen && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-xl border-b border-yellow-600/20 px-6 py-4 z-50">
                        {navLinks.map((link) => (<Link key={link.name} to={link.path} className="block py-3 text-sm font-medium text-gray-400 hover:text-yellow-400 transition-colors border-b border-white/5">{link.name}</Link>))}
                    </motion.div>
                )}
            </nav>

            {/* Hero Banner */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-2xl p-0.5 bg-gradient-to-r from-yellow-500/40 via-yellow-500/10 to-yellow-500/40 overflow-hidden"
                >
                    <div className="rounded-2xl bg-gradient-to-r from-black/80 via-amber-950/30 to-black/80 backdrop-blur-xl p-8 sm:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-yellow-600/5 to-transparent pointer-events-none" />

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Flame className="h-5 w-5 text-orange-400" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Flash Sale</span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">
                                    Up to 55% Off
                                </h1>
                                <p className="mt-2 text-gray-400 text-sm max-w-md">Limited time offers on premium products. Grab them before they're gone!</p>
                            </div>

                            {/* Countdown Timer */}
                            <div className="flex items-center gap-3">
                                <CountdownUnit value={2} label="Days" />
                                <span className="text-yellow-600 font-bold text-xl mt-[-16px]">:</span>
                                <CountdownUnit value={14} label="Hours" />
                                <span className="text-yellow-600 font-bold text-xl mt-[-16px]">:</span>
                                <CountdownUnit value={36} label="Mins" />
                                <span className="text-yellow-600 font-bold text-xl mt-[-16px]">:</span>
                                <CountdownUnit value={52} label="Secs" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Flash Deals */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center gap-3 mb-6">
                    <Flame className="h-5 w-5 text-orange-400" />
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-500">Flash Deals</h2>
                    <div className="flex items-center gap-1 ml-2 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/30">
                        <Clock className="h-3 w-3 text-red-400" />
                        <span className="text-[10px] font-bold text-red-400 uppercase">Limited Time</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {loading
                        ? Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="rounded-2xl p-0.5 bg-gradient-to-br from-yellow-500/15 via-yellow-500/5 to-yellow-500/10">
                                <div className="rounded-2xl bg-black/70 h-80 animate-pulse" />
                            </div>
                        ))
                        : flashDeals.map((deal, i) => (
                            <motion.div
                                key={deal.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group relative rounded-2xl p-0.5 bg-gradient-to-br from-yellow-500/30 via-yellow-500/5 to-yellow-500/20 cursor-pointer"
                            >
                                <div className="rounded-2xl bg-black/70 backdrop-blur-xl overflow-hidden h-full relative">
                                    <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-[10px] font-bold text-red-400">
                                        -{deal.discount}%
                                    </div>
                                    <div className="relative h-44 bg-gradient-to-br from-yellow-900/15 to-black/60 flex items-center justify-center p-6 overflow-hidden">
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-16 bg-yellow-600/15 rounded-full blur-2xl" />
                                        <img src={deal.image} alt={deal.title} className="relative z-10 h-full max-h-32 object-contain drop-shadow-[0_8px_20px_rgba(234,179,8,0.25)] group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-4 pt-3">
                                        <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-1">{deal.category}</p>
                                        <h3 className="text-white font-bold text-sm line-clamp-1">{deal.title}</h3>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                            <span className="text-xs text-yellow-400 font-medium">{deal.rating.rate}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-yellow-400 font-bold">$ {deal.price.toFixed(2)}</span>
                                            <span className="text-xs text-gray-600 line-through">$ {deal.originalPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="mt-3">
                                            <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                                                <span>{deal.soldPercent}% sold</span>
                                                <span>Hurry!</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-yellow-900/20 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${deal.soldPercent}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                                                    className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                </div>
            </section>

            {/* Weekly Deals */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
                <div className="flex items-center gap-3 mb-6">
                    <Tag className="h-5 w-5 text-yellow-400" />
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-500">Weekly Deals</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {loading
                        ? Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="rounded-2xl p-0.5 bg-gradient-to-br from-yellow-500/15 via-yellow-500/5 to-yellow-500/10">
                                <div className="rounded-2xl bg-black/70 h-80 animate-pulse" />
                            </div>
                        ))
                        : weeklyDeals.map((deal, i) => (
                            <motion.div
                                key={deal.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group relative rounded-2xl p-0.5 bg-gradient-to-br from-yellow-500/20 via-yellow-500/5 to-yellow-500/15 cursor-pointer"
                            >
                                <div className="rounded-2xl bg-black/70 backdrop-blur-xl overflow-hidden h-full relative">
                                    <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30">
                                        <Percent className="h-2.5 w-2.5 text-yellow-400" />
                                        <span className="text-[10px] font-bold text-yellow-400">{deal.discount}% OFF</span>
                                    </div>
                                    <div className="relative h-44 bg-gradient-to-br from-yellow-900/10 to-black/60 flex items-center justify-center p-6 overflow-hidden">
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-16 bg-yellow-600/10 rounded-full blur-2xl" />
                                        <img src={deal.image} alt={deal.title} className="relative z-10 h-full max-h-32 object-contain drop-shadow-[0_8px_20px_rgba(234,179,8,0.2)] group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-4 pt-3">
                                        <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-1">{deal.category}</p>
                                        <h3 className="text-white font-bold text-sm line-clamp-1">{deal.title}</h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-yellow-400 font-bold">$ {deal.price.toFixed(2)}</span>
                                            <span className="text-xs text-gray-600 line-through">$ {deal.originalPrice.toFixed(2)}</span>
                                        </div>
                                        <button className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-yellow-500/10 border border-yellow-600/30 text-yellow-400 text-xs font-semibold hover:bg-yellow-500/20 transition-all">
                                            <ShoppingCart className="h-3 w-3" /> Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-yellow-600/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <span className="text-sm font-bold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-600">STORE NAME</span>
                        <p className="text-xs text-gray-600">© 2026 Store Name. All rights reserved.</p>
                        <div className="flex gap-4">
                            {navLinks.map((link) => (<Link key={link.name} to={link.path} className="text-xs text-gray-500 hover:text-yellow-400 transition-colors">{link.name}</Link>))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Deals;
