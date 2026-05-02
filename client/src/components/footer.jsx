import React from "react";
import { NavLink } from "react-router-dom";

let activeClassName = "text-blue-400 transition-colors";

export default function Footer() {
  return (
    <>
      <footer className="w-full py-12 border-t border-white/5 bg-slate-950">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 max-w-screen-2xl mx-auto gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold text-slate-200">VeriText AI</span>
            <p className="font-['Space_Grotesk'] text-xs font-medium uppercase tracking-widest text-slate-500">© {new Date().getFullYear()} VeriText AI. Engineered for Intelligence.</p>
          </div>
          <div className="flex gap-8 font-['Space_Grotesk'] text-xs font-medium uppercase tracking-widest">
            <NavLink className={({ isActive }) => isActive ? activeClassName : "text-slate-500 hover:text-slate-200 transition-colors"} to="/privacy-terms">
              Privacy Policy
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? activeClassName : "text-slate-500 hover:text-slate-200 transition-colors"} to="/terms-of-service">
              Terms of Service
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? activeClassName : "text-slate-500 hover:text-slate-200 transition-colors"} to="/api-docs">
              API Docs
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? activeClassName : "text-slate-500 hover:text-slate-200 transition-colors"} to="/support">
              Support
            </NavLink>
          </div>
        </div>
      </footer>
    </>
  )
}