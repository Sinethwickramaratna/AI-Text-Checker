import React from "react";
import { NavLink } from "react-router-dom";

let activeClassName = "text-blue-400 font-bold border-b-2 border-blue-500 pb-1 font-['Space_Grotesk'] text-sm tracking-tight";
let inactiveClassName = "text-slate-400 hover:text-white transition-colors duration-200 font-['Space_Grotesk'] text-sm tracking-tight hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]";

export default function NavBar(){
  return(
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
        <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
          <span className="text-2xl font-black bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">VeriText AI</span>
          <div className="hidden md:flex gap-8 items-center">
            <NavLink className={({ isActive }) => isActive ? activeClassName : inactiveClassName} to="/">Home</NavLink>
            <NavLink className={({ isActive }) => isActive ? activeClassName : inactiveClassName} to="/how-it-works">How It Works</NavLink>
            <NavLink className={({ isActive }) => isActive ? activeClassName : inactiveClassName} to="/about">About</NavLink>
            <NavLink className={({ isActive }) => isActive ? activeClassName : inactiveClassName} to="/contact">Contact</NavLink>
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-['Space_Grotesk'] text-sm font-bold px-6 py-2 rounded-full neon-glow active:scale-95 transition-all duration-150 ease-in-out">
            Get Started
          </button>
        </div>
      </nav>
    </>
  )
}