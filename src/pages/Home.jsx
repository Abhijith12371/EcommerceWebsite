import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Star,
  Mail,
  User,
  ArrowRight,
  Zap,
  Shirt,
  Watch,
  Menu,
  X,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import shoeImg from "../assets/shoe.png";
import headphonesImg from "../assets/headphones.png";
import { useContext } from "react";
import { UserAuthContext } from "../contexts/UserAuthContext";

const Home = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [topDeals, setTopDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [store,setStore]=useState()
  const {isLoggedIn,setisLoggedIn}=useContext(UserAuthContext)
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Deals", path: "/deals" },
    { name: "Contact", path: "/contact" },
  ];

  const categories = [
    {
      name: "Electronics",
      desc: "Explore the latest gadgets and tech",
      icon: <Zap className="h-6 w-6 text-yellow-400" />,
    },
    {
      name: "Clothing",
      desc: "Elevate your style with trendy fashion",
      icon: <Shirt className="h-6 w-6 text-yellow-400" />,
    },
    {
      name: "Accessories",
      desc: "Complete your look with premium accessories",
      icon: <Watch className="h-6 w-6 text-yellow-400" />,
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/products/getProducts/4");
        setTopDeals(res.data.products);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleStoreClick=async ()=>{
    console.log("the user is currently",isLoggedIn)
    if(isLoggedIn){
      const response=await axios.get("http://localhost:3000/api/auth/logout/",{
        withCredentials:true
      })
      if(response.status===200){
        setisLoggedIn(false)
        navigate("/auth")
      }
    }
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-500/30 overflow-x-hidden">
      {/* ===== ANIMATED BACKGROUND ===== */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/30 via-black to-black" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2], x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-yellow-700/20 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.4, 0.15], x: [0, -40, 0], y: [0, -60, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-600/20 rounded-full blur-[130px]"
        />
        {/* Gold Particles Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fbbf241a_1px,transparent_1px),linear-gradient(to_bottom,#fbbf241a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
      </div>

      {/* ===== NAVBAR ===== */}
      <nav className="relative z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center px-5 py-2.5 rounded-full border border-yellow-600/40 bg-yellow-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(234,179,8,0.15)]"
          >
            <span className="text-lg font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-600">
              STORE NAME
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${link.name === "Home"
                  ? "text-yellow-400"
                  : "text-gray-400 hover:text-yellow-400"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleStoreClick()}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-600/30 bg-yellow-500/10 text-yellow-400 text-sm font-medium hover:bg-yellow-500/20 transition-all duration-300"
            >
              <User className="h-4 w-4" />
              <span>{isLoggedIn&&"Store"}</span>
            </button>
            <button className="p-2.5 rounded-full border border-yellow-600/30 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-all duration-300">
              <Mail className="h-4 w-4" />
            </button>
            <button className="p-2.5 rounded-full border border-yellow-600/30 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-all duration-300">
              <ShoppingCart className="h-4 w-4" />
            </button>
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2.5 rounded-full border border-yellow-600/30 bg-yellow-500/10 text-yellow-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-xl border-b border-yellow-600/20 px-6 py-4 z-50"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block py-3 text-sm font-medium text-gray-400 hover:text-yellow-400 transition-colors border-b border-white/5"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 drop-shadow-[0_4px_20px_rgba(234,179,8,0.3)]">
                Discover Amazing
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
                Products
              </span>
            </h1>
            <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-md">
              Explore the latest arrivals and best sellers
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-yellow-500/40 bg-yellow-500/10 backdrop-blur-md text-yellow-400 font-bold text-sm shadow-[0_0_25px_rgba(234,179,8,0.2)] hover:bg-yellow-500/20 hover:shadow-[0_0_35px_rgba(234,179,8,0.3)] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
              <span className="relative z-10">Shop Now</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform relative z-10" />
            </motion.button>
          </motion.div>

          {/* Right Product Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="grid grid-cols-5 gap-3"
          >
            {/* Main Hero Image */}
            <div className="col-span-3 relative rounded-2xl overflow-hidden border border-yellow-600/20 bg-gradient-to-br from-yellow-900/20 to-black/80 p-4 aspect-[4/3] flex items-end justify-center shadow-[0_0_40px_rgba(234,179,8,0.15)]">
              {/* Glowing ring effect */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-8 bg-yellow-500/40 rounded-full blur-xl" />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[60%] h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full" />
              <img
                src={shoeImg}
                alt="Premium Sneakers"
                className="relative z-10 w-full max-w-[280px] object-contain drop-shadow-[0_10px_30px_rgba(234,179,8,0.4)]"
              />
            </div>

            {/* Side Image */}
            <div className="col-span-2 rounded-2xl overflow-hidden border border-yellow-600/20 bg-gradient-to-br from-yellow-900/10 to-black/80 p-4 flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.1)]">
              <img
                src={headphonesImg}
                alt="Premium Headphones"
                className="w-full max-w-[180px] object-contain drop-shadow-[0_10px_25px_rgba(234,179,8,0.3)]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED CATEGORIES ===== */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-500"
        >
          Featured Categories
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl p-0.5 bg-gradient-to-br from-yellow-500/30 via-yellow-500/5 to-yellow-500/20 cursor-pointer"
            >
              <div className="rounded-2xl bg-black/70 backdrop-blur-xl p-6 h-full relative overflow-hidden">
                {/* Subtle shine */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-white/3 to-transparent pointer-events-none" />

                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-yellow-500/10 border border-yellow-600/30 shadow-[0_0_12px_rgba(234,179,8,0.15)]">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                </div>
                <p className="text-sm text-gray-400 mb-5">{cat.desc}</p>
                <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-600/30 text-yellow-400 text-xs font-semibold hover:bg-yellow-500/20 transition-all duration-300">
                  Shop Now <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== TOP DEALS ===== */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-500"
        >
          Top Deals
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl p-0.5 bg-gradient-to-br from-yellow-500/15 via-yellow-500/5 to-yellow-500/10">
                <div className="rounded-2xl bg-black/70 h-72 animate-pulse" />
              </div>
            ))
            : topDeals.map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl p-0.5 bg-gradient-to-br from-yellow-500/25 via-yellow-500/5 to-yellow-500/15 cursor-pointer"
              >
                <div className="rounded-2xl bg-black/70 backdrop-blur-xl overflow-hidden h-full relative">
                  <div className="relative h-48 bg-gradient-to-br from-yellow-900/15 to-black/60 flex items-center justify-center p-6 overflow-hidden">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-16 bg-yellow-600/20 rounded-full blur-2xl" />
                    <img
                      src={product.image}
                      alt={product.title}
                      className="relative z-10 h-full max-h-36 object-contain drop-shadow-[0_8px_20px_rgba(234,179,8,0.3)] group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 pt-3">
                    <h3 className="text-white font-bold text-sm line-clamp-1">{product.title}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs text-yellow-400 font-medium">{product.rating.rate}</span>
                      <span className="text-[10px] text-gray-600">({product.rating.count})</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-gray-500 capitalize">{product.category}</span>
                      <span className="text-yellow-400 font-bold text-sm">$ {product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 border-t border-yellow-600/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm font-bold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-600">
              STORE NAME
            </span>
            <p className="text-xs text-gray-600">
              © 2026 Store Name. All rights reserved.
            </p>
            <div className="flex gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-xs text-gray-500 hover:text-yellow-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
