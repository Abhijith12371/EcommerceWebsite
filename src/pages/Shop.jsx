import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShoppingCart,
    Mail,
    User,
    ArrowRight,
    Search,
    SlidersHorizontal,
    Star,
    Heart,
    Menu,
    X,
    ChevronDown,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserAuthContext } from "../contexts/UserAuthContext";

const Shop = () => {
    const navigate = useNavigate();

    const { isLoggedIn, setisLoggedIn } = useContext(UserAuthContext)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("Popular");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {LikedIds, setLikedIds} = useContext(UserAuthContext)
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: "Deals", path: "/deals" },
        { name: "Contact", path: "/contact" },
    ];

    const categories = ["All", "electronics", "jewelery", "men's clothing", "women's clothing"];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/products/getProducts/limit=4");
                setProducts(res.data.products);
            } catch (err) {
                console.error("Failed to fetch products:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);



    const handleStoreClick = async () => {
        try {
            await axios.get("http://localhost:3000/api/auth/logout", {
                withCredentials: true
            });

            setisLoggedIn(false);
            navigate("/auth");

        } catch (err) {
            console.log(err);
        }
    };


    const handleLike = async (id) => {
        if (LikedIds.includes(id)) {
            const response = await axios.post("http://localhost:3000/api/products/dislikeProduct/", {
                id: id
            }, { withCredentials: true })
            setLikedIds(prev => prev.filter(item => item !== id))
        }

        else {

            const response = await axios.post("http://localhost:3000/api/products/likeProduct/", {
                id: id
            }, { withCredentials: true })
            if (response.status === 200) {
                // toast.sucess("Datareceive")
                console.log("The item liked")
                setLikedIds(prev => [...prev, id])
            }
        }
        console.log("the liked IDS", LikedIds)
    }

    const filteredProducts = products
        .filter((p) => {
            const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
            const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
            if (sortBy === "Price: Low") return a.price - b.price;
            if (sortBy === "Price: High") return b.price - a.price;
            if (sortBy === "Rating") return b.rating.rate - a.rating.rate;
            return b.rating.count - a.rating.count; // Popular = most reviews
        });

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
                            <Link key={link.name} to={link.path} className={`text-sm font-medium transition-colors duration-200 ${link.name === "Shop" ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"}`}>{link.name}</Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => handleStoreClick()} className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-600/30 bg-yellow-500/10 text-yellow-400 text-sm font-medium hover:bg-yellow-500/20 transition-all duration-300">
                            <User className="h-4 w-4" /><span>{isLoggedIn ? "Logout" : "Login"}</span>
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
            <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">Shop</h1>
                    <p className="mt-2 text-gray-400 text-sm">Browse our premium collection</p>
                </motion.div>
            </section>

            {/* Search & Filter Bar */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-yellow-600/20 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 transition-colors backdrop-blur-md text-sm"
                        />
                    </div>
                    {/* Sort */}
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none w-full sm:w-44 px-4 py-3 pr-10 rounded-xl bg-white/5 border border-yellow-600/20 text-gray-300 focus:outline-none focus:border-yellow-500/50 transition-colors backdrop-blur-md text-sm cursor-pointer"
                        >
                            <option value="Popular" className="bg-black">Popular</option>
                            <option value="Price: Low" className="bg-black">Price: Low to High</option>
                            <option value="Price: High" className="bg-black">Price: High to Low</option>
                            <option value="Rating" className="bg-black">Top Rated</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                    </div>
                </div>

                {/* Category Chips */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border capitalize ${selectedCategory === cat
                                ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.2)]"
                                : "bg-white/5 border-white/10 text-gray-400 hover:border-yellow-600/30 hover:text-yellow-400"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Product Grid */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
                <p className="text-xs text-gray-500 mb-4">{filteredProducts.length} products found</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <AnimatePresence mode="popLayout">
                        {loading
                            ? Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="rounded-2xl p-0.5 bg-gradient-to-br from-yellow-500/15 via-yellow-500/5 to-yellow-500/10">
                                    <div className="rounded-2xl bg-black/70 h-80 animate-pulse" />
                                </div>
                            ))
                            : filteredProducts.map((product, i) => {

                                const isLiked = LikedIds.includes(product._id)

                                return (
                                    <motion.div
                                        key={product._id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: i * 0.05 }}
                                        whileHover={{ y: -5 }}
                                        className="group relative rounded-2xl p-0.5 bg-gradient-to-br from-yellow-500/25 via-yellow-500/5 to-yellow-500/15 cursor-pointer"
                                    >
                                        <div className="rounded-2xl bg-black/70 backdrop-blur-xl overflow-hidden h-full relative">
                                            {/* Badge */}
                                            {product.rating.rate >= 4.5 && (
                                                <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-[10px] font-bold text-yellow-400 uppercase tracking-wider">
                                                    Top Rated
                                                </div>
                                            )}
                                            {/* Wishlist */}
                                            <button
                                                onClick={() => handleLike(product._id)}
                                                className={`absolute top-3 right-3 z-20 p-2 rounded-full 
    bg-black/40 border border-white/10 
    transition-all
    ${isLiked
                                                        ? "text-red-500 border-red-500/40"
                                                        : "text-gray-500 hover:text-red-400 hover:border-red-400/30"
                                                    }`}
                                            >
                                                <Heart className={`h-3.5 w-3.5 ${isLiked ? "fill-red-500" : ""}`} />
                                            </button>

                                            {/* Image */}
                                            <div className="relative h-48 bg-gradient-to-br from-yellow-900/15 to-black/60 flex items-center justify-center p-6 overflow-hidden">
                                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-16 bg-yellow-600/15 rounded-full blur-2xl" />
                                                <img src={product.image} alt={product.title} className="relative z-10 h-full max-h-36 object-contain drop-shadow-[0_8px_20px_rgba(234,179,8,0.25)] group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                            {/* Info */}
                                            <div className="p-4 pt-3">
                                                <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-1">{product.category}</p>
                                                <h3 className="text-white font-bold text-sm line-clamp-1">{product.title}</h3>
                                                <div className="flex items-center gap-1 mt-1.5">
                                                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                                    <span className="text-xs text-yellow-400 font-medium">{product.rating.rate}</span>
                                                    <span className="text-[10px] text-gray-600">({product.rating.count})</span>
                                                </div>
                                                <div className="flex items-center justify-between mt-3">
                                                    <span className="text-yellow-400 font-bold">$ {product.price.toFixed(2)}</span>
                                                    <button className="p-2 rounded-full bg-yellow-500/10 border border-yellow-600/30 text-yellow-400 hover:bg-yellow-500/20 transition-all">
                                                        <ShoppingCart className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                    </AnimatePresence>
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

export default Shop;
