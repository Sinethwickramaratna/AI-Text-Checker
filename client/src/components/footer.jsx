import React from "react";

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
            <a className="text-blue-400 transition-colors" href="#">Privacy Policy</a>
            <a className="text-slate-500 hover:text-slate-200 transition-colors" href="#">Terms of Service</a>
            <a className="text-slate-500 hover:text-slate-200 transition-colors" href="#">API Docs</a>
            <a className="text-slate-500 hover:text-slate-200 transition-colors" href="#">Support</a>
          </div>
        </div>
      </footer>
    </>
  )
}