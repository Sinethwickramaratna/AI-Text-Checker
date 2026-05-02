import React from "react";

export default function Contact() {
  return (
    <>
      <main className="min-h-screen pt-32 pb-20 px-margin max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          {/* Left Sidebar: Contact Info & Status */}
          <div className="lg:col-span-4 flex flex-col gap-lg">
            <div className="flex flex-col gap-sm">
              <span className="font-label-caps text-primary uppercase tracking-[0.2em]">Contact Inquiry</span>
              <h1 className="font-h1 text-h1">Let's build the future of intelligence.</h1>
              <p className="text-on-surface-variant font-body-lg max-w-md">Our neural experts are ready to assist with custom API integrations, enterprise security inquiries, or simple technical support.</p>
            </div>
            <div className="glass-panel p-lg rounded-xl flex flex-col gap-md border border-white/5 shadow-xl">
              <div className="flex items-center gap-md">
                <div className="w-3 h-3 bg-primary rounded-full ai-pulse"></div>
                <div>
                  <p className="font-h3 text-h3 text-primary">Live Support Status</p>
                  <p className="text-on-surface-variant text-body-sm">Avg. Response Time: 4.2 Minutes</p>
                </div>
              </div>
              <div className="space-y-md mt-sm">
                <div className="flex items-start gap-md">
                  <span className="material-symbols-outlined text-primary" data-icon="alternate_email">alternate_email</span>
                  <div>
                    <p className="font-label-caps text-on-surface-variant">General Support</p>
                    <p className="font-body-md text-on-surface">hello@veritext.ai</p>
                  </div>
                </div>
                <div className="flex items-start gap-md">
                  <span className="material-symbols-outlined text-primary" data-icon="hub">hub</span>
                  <div>
                    <p className="font-label-caps text-on-surface-variant">API Technical Desk</p>
                    <p className="font-body-md text-on-surface">dev-ops@veritext.ai</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-md pt-md border-t border-white/10">
                <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
                  <span className="material-symbols-outlined" data-icon="terminal">terminal</span>
                </a>
                <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
                  <span className="material-symbols-outlined" data-icon="public">public</span>
                </a>
                <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
                  <span className="material-symbols-outlined" data-icon="share">share</span>
                </a>
              </div>
            </div>
            {/* Node Map Preview */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden glass-panel border border-white/5">
              <img alt="Active Node Map" className="w-full h-full object-cover opacity-40 grayscale" data-alt="A sophisticated digital world map with glowing blue network nodes and interconnected lines representing data flow across continents. The aesthetic is cinematic and futuristic, featuring a dark blue and black color palette with vibrant neon accents. Subtle light trails move between major tech hubs, symbolizing high-speed AI processing and global connectivity in a minimalist, high-tech environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaNIURYY89XTtRwcssHlLlFnzfqznvlM0qgZ2MUUVmKP6Xexx5u164YEoBTv-j06n1mzGBuykgSSsD83_LBDoDPJQw8fPnWn2dx1CniSqMupag5sSUK7gYyEmDctoXa49N_Uf36KV-ZdYPGYNvbt1VGzY8gUTNXYz9UO538qgU3lo2Cocux6IbTwetcTex9JCQ0PU_5pYzMm6sdGjz0IcThqYb0DmAFHQNdRHh2WtzPNYAFWl9dODjV5mPuM-XZvtGiSrSsbCHinfo" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
              <div className="absolute bottom-md left-md">
                <p className="font-label-caps text-primary">Active Node Cluster</p>
                <p className="text-body-sm text-on-surface-variant">San Francisco HQ / Tokyo Hub</p>
              </div>
              {/* Pulse Dot on Map */}
              <div className="absolute top-[40%] left-[20%] w-2 h-2 bg-primary rounded-full ai-pulse"></div>
              <div className="absolute top-[35%] left-[80%] w-2 h-2 bg-secondary rounded-full ai-pulse"></div>
            </div>
          </div>
          {/* Right Side: Contact Form */}
          <div className="lg:col-span-8">
            <div className="glass-panel p-lg md:p-xl rounded-xl border border-white/5 shadow-2xl relative overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-[100px]"></div>
              <form className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="md:col-span-1 flex flex-col gap-xs">
                  <label className="font-label-caps text-on-surface-variant ml-xs">Full Name</label>
                  <input className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface rounded-xl p-md input-glow transition-all font-body-md placeholder:text-outline" placeholder="John Doe" type="text" />
                </div>
                <div className="md:col-span-1 flex flex-col gap-xs">
                  <label className="font-label-caps text-on-surface-variant ml-xs">Email Address</label>
                  <input className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface rounded-xl p-md input-glow transition-all font-body-md placeholder:text-outline" placeholder="john@example.com" type="email" />
                </div>
                <div className="md:col-span-2 flex flex-col gap-xs">
                  <label className="font-label-caps text-on-surface-variant ml-xs">Subject</label>
                  <select className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface rounded-xl p-md input-glow transition-all font-body-md appearance-none">
                    <option>General Inquiry</option>
                    <option>Enterprise Integration</option>
                    <option>Security/Compliance</option>
                    <option>Media &amp; PR</option>
                  </select>
                </div>
                <div className="md:col-span-2 flex flex-col gap-xs">
                  <label className="font-label-caps text-on-surface-variant ml-xs">Message</label>
                  <textarea className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface rounded-xl p-md input-glow transition-all font-body-md placeholder:text-outline resize-none" placeholder="How can we help optimize your text analysis workflow?" rows="6"></textarea>
                </div>
                <div className="md:col-span-2 mt-md">
                  <button className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white px-lg py-md rounded-xl font-bold flex items-center justify-center gap-md hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] active:scale-[0.98] transition-all group" type="submit">
                    <span className="font-h3">Send Message</span>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" data-icon="send">send</span>
                  </button>
                </div>
              </form>
              <div className="mt-xl grid grid-cols-1 md:grid-cols-3 gap-md">
                <div className="p-md rounded-lg bg-white/5 border border-white/5">
                  <p className="text-primary font-h3">99.9%</p>
                  <p className="font-label-caps text-on-surface-variant">Uptime SLA</p>
                </div>
                <div className="p-md rounded-lg bg-white/5 border border-white/5">
                  <p className="text-primary font-h3">24/7</p>
                  <p className="font-label-caps text-on-surface-variant">Monitoring</p>
                </div>
                <div className="p-md rounded-lg bg-white/5 border border-white/5">
                  <p className="text-primary font-h3">AES-256</p>
                  <p className="font-label-caps text-on-surface-variant">Encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}