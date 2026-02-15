# Premium Auth Component (Black & Gold Theme)

This documentation provides the source code for the premium "Black & Gold" authentication component, featuring glassmorphism, static shine effects, animated background elements, and a **Forgot Password** flow.

## Prerequisites

Ensure you have the following dependencies installed in your project:

```bash
npm install framer-motion lucide-react axios react-toastify react-router-dom
```

## Source Code (`Auth.jsx`)

Copy the following code into your `src/components/Auth.jsx` file:

```jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Mail, ArrowRight, ArrowLeft, Send, KeyRound } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Auth = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [isForgotPassword, setIsForgotPassword] = useState(false);
	const [otpSent, setOtpSent] = useState(false);
	
	const navigate = useNavigate();
	const [details, setDetails] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setDetails((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!isLogin) {
			console.log("the details are ", details);
			// Example registration logic
			try {
				const response = await axios.post("http://localhost:3000/api/auth/register", details);
				if (response.status == 200) {
					toast("User registered Successfully");
					navigate("/auth");
				} else {
					toast.error("Error Occured");
				}
			} catch (error) {
				console.error(error);
				toast.error("Registration failed");
			}
		} else {
			console.log(details);
			// Example login logic
			try {
				const response = await axios.post("http://localhost:3000/api/auth/login", details);
				if (response.status == 200) {
					toast("User Logged In Successfully");
					navigate("/");
				} else {
					toast.error("Invalid Credentials");
				}
			} catch (error) {
				console.error(error);
				toast.error("Login failed");
			}
		}
	};

	// Dummy handlers for UI flow
	const handleSendOtp = (e) => {
		e.preventDefault();
		// Logic to be implemented by user
		setOtpSent(true);
		toast.info("OTP sent (UI Demo)");
	};

	const handleVerifyOtp = (e) => {
		e.preventDefault();
		// Logic to be implemented by user
		toast.success("OTP Verified (UI Demo)");
	};

	return (
		<div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white selection:bg-yellow-500/30">
			{/* Animated Background */}
			<div className="absolute inset-0 z-0">
				{/* Deep Gold Radial Gradient Backdrop */}
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/40 via-black to-black" />

				{/* Gold Blobs */}
				<motion.div
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.6, 0.3],
						x: [0, 50, 0],
						y: [0, 30, 0],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut",
					}}
					className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-600/30 rounded-full blur-[120px]"
				/>

				<motion.div
					animate={{
						scale: [1, 1.1, 1],
						opacity: [0.3, 0.6, 0.3],
						x: [0, -30, 0],
						y: [0, -50, 0],
					}}
					transition={{
						duration: 10,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 1,
					}}
					className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-600/30 rounded-full blur-[120px]"
				/>

				{/* Grid Pattern */}
				<div className="absolute inset-0 bg-[linear-gradient(to_right,#fbbf241a_1px,transparent_1px),linear-gradient(to_bottom,#fbbf241a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>
			</div>

			{/* Premium Glass Card */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				className="relative z-10 w-full max-w-md p-0.5 rounded-2xl bg-gradient-to-br from-yellow-500/60 via-yellow-500/10 to-yellow-500/30 shadow-[0_0_50px_-10px_rgba(234,179,8,0.4)]"
			>
				<div className="relative overflow-hidden rounded-2xl bg-black/60 backdrop-blur-xl h-full w-full">
					{/* Static Shine Effects */}
					<div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/5 to-transparent -rotate-12 pointer-events-none" />
					<div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent opacity-50 pointer-events-none" />

					<div className="p-8 sm:p-10">
						<AnimatePresence mode="wait">
							{isForgotPassword ? (
								<motion.div
									key="forgot-password"
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{ duration: 0.3 }}
								>
									<div className="mb-8 text-center">
										<div className="inline-block p-3 rounded-full bg-yellow-500/10 mb-4 border border-yellow-600/30 relative shadow-[0_0_15px_rgba(234,179,8,0.2)]">
											<div className="absolute inset-0 rounded-full blur-md bg-yellow-500/20"></div>
											<KeyRound className="h-8 w-8 text-yellow-500 relative z-10" />
										</div>
										<h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 drop-shadow-[0_2px_10px_rgba(234,179,8,0.3)]">
											Recover Password
										</h2>
										<p className="mt-2 text-sm text-gray-400">
											{otpSent ? "Enter the OTP sent to your email" : "Enter your email to receive an OTP"}
										</p>
									</div>

									<form className="space-y-6" onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
										{!otpSent ? (
											<div className="relative group">
												<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
													<Mail className="h-5 w-5 text-gray-500 group-focus-within:text-yellow-400 transition-colors" />
												</div>
												<input
													type="email"
													className="block w-full pl-10 pr-3 py-3 bg-transparent border-b border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 transition-all duration-300"
													placeholder="Email Address"
													required
												/>
											</div>
										) : (
											<div className="relative group">
												<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
													<Lock className="h-5 w-5 text-gray-500 group-focus-within:text-yellow-400 transition-colors" />
												</div>
												<input
													type="text"
													className="block w-full pl-10 pr-3 py-3 bg-transparent border-b border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 transition-all duration-300 tracking-widest text-center"
													placeholder="• • • • • •"
													maxLength={6}
													required
												/>
											</div>
										)}

										<motion.button
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											className="group w-full flex items-center justify-center py-3.5 px-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold shadow-lg hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
										>
											{/* Static Shine/Gloss Effect */}
											<div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50 pointer-events-none"></div>
											<div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

											<span className="mr-2 relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-500">
												{otpSent ? "VERIFY OTP" : "SEND OTP"}
											</span>
											<Send className="h-4 w-4 text-yellow-500 group-hover:translate-x-1 transition-transform relative z-10" />
										</motion.button>
									</form>

									<div className="mt-8 text-center text-sm text-gray-400">
										<button
											onClick={() => {
												setIsForgotPassword(false);
												setOtpSent(false);
											}}
											className="flex items-center justify-center mx-auto space-x-2 font-medium text-yellow-500 hover:text-yellow-300 transition-colors"
										>
											<ArrowLeft className="h-4 w-4" />
											<span>Back to Login</span>
										</button>
									</div>
								</motion.div>
							) : (
								<motion.div
									key={isLogin ? "login" : "signup"}
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{ duration: 0.3 }}
								>
									<div className="mb-8 text-center">
										<div className="inline-block p-3 rounded-full bg-yellow-500/10 mb-4 border border-yellow-600/30 relative shadow-[0_0_15px_rgba(234,179,8,0.2)]">
											<div className="absolute inset-0 rounded-full blur-md bg-yellow-500/20"></div>
											<User className="h-8 w-8 text-yellow-500 relative z-10" />
										</div>
										<h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 drop-shadow-[0_2px_10px_rgba(234,179,8,0.3)]">
											{isLogin ? "Welcome Back" : "Create Account"}
										</h2>
										<p className="mt-2 text-sm text-gray-400">
											{isLogin
												? "Enter your credentials to access your account"
												: "Join us and start your journey today"}
										</p>
									</div>

									<form className="space-y-6" onSubmit={handleSubmit}>
										{!isLogin && (
											<div className="relative group">
												<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
													<User className="h-5 w-5 text-gray-500 group-focus-within:text-yellow-400 transition-colors" />
												</div>
												<input
													type="text"
													name="firstName"
													className="block w-full pl-10 pr-3 py-3 bg-transparent border-b border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 transition-all duration-300"
													placeholder="Full Name"
													onChange={(e) => handleChange(e)}
												/>
											</div>
										)}

										<div className="relative group">
											<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
												<Mail className="h-5 w-5 text-gray-500 group-focus-within:text-yellow-400 transition-colors" />
											</div>
											<input
												type="email"
												name="email"
												className="block w-full pl-10 pr-3 py-3 bg-transparent border-b border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 transition-all duration-300"
												placeholder="Email Address"
												onChange={(e) => handleChange(e)}
											/>
										</div>

										<div className="relative group">
											<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
												<Lock className="h-5 w-5 text-gray-500 group-focus-within:text-yellow-400 transition-colors" />
											</div>
											<input
												type="password"
												name="password"
												className="block w-full pl-10 pr-3 py-3 bg-transparent border-b border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 transition-all duration-300"
												placeholder="Password"
												onChange={(e) => handleChange(e)}
											/>
										</div>

										<div className="flex items-center justify-between text-xs text-gray-400">
											<label className="flex items-center space-x-2 cursor-pointer hover:text-yellow-400 transition-colors">
												<input
													type="checkbox"
													className="form-checkbox h-3 w-3 rounded border-gray-600 text-yellow-500 focus:ring-yellow-500 bg-transparent"
												/>
												<span>Remember me</span>
											</label>
											<button
												type="button"
												onClick={() => setIsForgotPassword(true)}
												className="hover:text-yellow-400 transition-colors"
											>
												Forgot Password?
											</button>
										</div>

										{/* Submit Button */}
										<motion.button
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											className="group w-full flex items-center justify-center py-3.5 px-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold shadow-lg hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
										>
											{/* Static Shine/Gloss Effect */}
											<div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50 pointer-events-none"></div>
											<div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

											<span className="mr-2 relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-500">
												{isLogin ? "LOGIN" : "SIGN UP"}
											</span>
											<ArrowRight className="h-4 w-4 text-yellow-500 group-hover:translate-x-1 transition-transform relative z-10" />
										</motion.button>
									</form>

									{/* Toggle Login/Signup */}
									<div className="mt-8 text-center text-sm text-gray-400">
										<p>
											{isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
											<button
												onClick={() => setIsLogin(!isLogin)}
												className="font-medium text-yellow-500 hover:text-yellow-300 transition-colors"
											>
												{isLogin ? "Create New Account" : "Log In"}
											</button>
										</p>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default Auth;
```

## Styling Notes

- **Tailwind CSS**: The component relies heavily on Tailwind utilities. Ensure Tailwind is configured in your project.
- **Glassmorphism**: Uses `backdrop-blur` and semi-transparent backgrounds (`bg-white/5`).
- **Gradients**: Uses standard Tailwind colors (Yellow/Amber/Gray) for the gold effect.
