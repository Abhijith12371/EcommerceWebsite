import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    ShoppingCart,
    Mail,
    User,
    Send,
    MapPin,
    Phone,
    Clock,
    MessageSquare,
    Menu,
    X,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const Contact = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: "Deals", path: "/deals" },
        { name: "Contact", path: "/contact" },
    ];

    const contactInfo = [
        { icon: <MapPin className="h-5 w-5 text-yellow-400" />, title: "Visit Us", detail: "123 Gold Avenue, Premium District", sub: "New York, NY 10001" },
        { icon: <Phone className="h-5 w-5 text-yellow-400" />, title: "Call Us", detail: "+1 (555) 123-4567", sub: "Mon - Fri, 9am - 6pm" },
        { icon: <Mail className="h-5 w-5 text-yellow-400" />, title: "Email Us", detail: "support@storename.com", sub: "We reply within 24 hours" },
        { icon: <Clock className="h-5 w-5 text-yellow-400" />, title: "Working Hours", detail: "Mon - Sat: 9:00 AM - 8:00 PM", sub: "Sunday: 10:00 AM - 5:00 PM" },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit logic here
        console.log("Form submitted:", formData);
    };

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
                            <Link key={link.name} to={link.path} className={`text-sm font-medium transition-colors duration-200 ${link.name === "Contact" ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"}`}>{link.name}</Link>
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

            {/* Page Header */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <div className="inline-block p-3 rounded-full bg-yellow-500/10 mb-4 border border-yellow-600/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                        <MessageSquare className="h-8 w-8 text-yellow-500" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">
                        Get in Touch
                    </h1>
                    <p className="mt-2 text-gray-400 text-sm max-w-md mx-auto">
                        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </motion.div>
            </section>

            {/* Contact Info Cards */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {contactInfo.map((info, i) => (
                        <motion.div
                            key={info.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="rounded-2xl p-0.5 bg-gradient-to-br from-yellow-500/25 via-yellow-500/5 to-yellow-500/15"
                        >
                            <div className="rounded-2xl bg-black/70 backdrop-blur-xl p-5 h-full text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-white/3 to-transparent pointer-events-none" />
                                <div className="inline-flex p-2.5 rounded-xl bg-yellow-500/10 border border-yellow-600/30 mb-3 shadow-[0_0_12px_rgba(234,179,8,0.15)]">
                                    {info.icon}
                                </div>
                                <h3 className="text-white font-bold text-sm">{info.title}</h3>
                                <p className="text-yellow-400 text-xs font-medium mt-1">{info.detail}</p>
                                <p className="text-gray-500 text-[10px] mt-0.5">{info.sub}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Contact Form + Map */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3 rounded-2xl p-0.5 bg-gradient-to-br from-yellow-500/30 via-yellow-500/5 to-yellow-500/20"
                    >
                        <div className="rounded-2xl bg-black/70 backdrop-blur-xl p-6 sm:p-8 h-full relative overflow-hidden">
                            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/3 to-transparent -rotate-12 pointer-events-none" />

                            <h2 className="text-xl font-bold text-white mb-6">Send a Message</h2>
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] uppercase tracking-wider text-gray-500 mb-1.5 block">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-yellow-600/20 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 transition-colors text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase tracking-wider text-gray-500 mb-1.5 block">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-yellow-600/20 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 transition-colors text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase tracking-wider text-gray-500 mb-1.5 block">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="How can we help?"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-yellow-600/20 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 transition-colors text-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase tracking-wider text-gray-500 mb-1.5 block">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="Tell us more about your inquiry..."
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-yellow-600/20 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 transition-colors text-sm resize-none"
                                        required
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-yellow-500/10 border border-yellow-600/30 text-yellow-400 font-bold text-sm shadow-[0_0_20px_rgba(234,179,8,0.15)] hover:bg-yellow-500/20 hover:shadow-[0_0_30px_rgba(234,179,8,0.25)] transition-all duration-300 relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                                    <span className="relative z-10">Send Message</span>
                                    <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform relative z-10" />
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Info Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 rounded-2xl p-0.5 bg-gradient-to-br from-yellow-500/25 via-yellow-500/5 to-yellow-500/15"
                    >
                        <div className="rounded-2xl bg-black/70 backdrop-blur-xl p-6 sm:p-8 h-full relative overflow-hidden flex flex-col justify-between">
                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-white/3 to-transparent pointer-events-none" />

                            <div>
                                <h2 className="text-xl font-bold text-white mb-4">FAQ</h2>
                                <div className="space-y-4">
                                    {[
                                        { q: "What are the shipping options?", a: "We offer free shipping on orders over $100. Standard delivery takes 3-5 business days." },
                                        { q: "What is your return policy?", a: "You can return any item within 30 days of purchase for a full refund." },
                                        { q: "Do you offer international shipping?", a: "Yes! We ship to over 50 countries worldwide with tracked delivery." },
                                    ].map((faq, i) => (
                                        <div key={i} className="border-b border-white/5 pb-3">
                                            <h4 className="text-sm font-semibold text-yellow-400">{faq.q}</h4>
                                            <p className="text-xs text-gray-500 mt-1">{faq.a}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 p-4 rounded-xl bg-yellow-500/5 border border-yellow-600/20">
                                <p className="text-xs text-gray-400 text-center">
                                    Need immediate help? Call us at{" "}
                                    <span className="text-yellow-400 font-semibold">+1 (555) 123-4567</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>
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

export default Contact;
