import React from "react";

export default function HowItWorks() {
  return (
    <>
      <main className="pt-32 pb-20 px-margin">
        {/* Hero Section (The Overview) */}
        <section className="max-w-4xl mx-auto text-center mb-lg">
          <h1 className="font-h1 text-h1 mb-md">
            <span className="gradient-text">How VeriText AI Works</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Delivering clinical precision in AI detection. We combine advanced neural intelligence with linguistic analysis to separate human creativity from synthetic generation.
          </p>
        </section>
        {/* Steps Section (The Process) */}
        <section className="max-w-7xl mx-auto mb-xl relative">
          <div className="hidden md:block absolute top-1/4 left-0 w-full h-[2px] process-line opacity-20 -z-10"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-surface-container-highest border border-primary/30 flex items-center justify-center mb-md shadow-[0_0_20px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500">
                <span className="material-symbols-outlined text-primary text-3xl" data-icon="description">description</span>
              </div>
              <h3 className="font-h3 text-h3 mb-sm">Input Text</h3>
              <p className="text-on-surface-variant font-body-md px-4">
                Simply paste your text or upload documents (PDF, DOCX) into our secure portal.
              </p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-surface-container-highest border border-secondary/30 flex items-center justify-center mb-md shadow-[0_0_20px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-500">
                <span className="material-symbols-outlined text-secondary text-3xl" data-icon="psychology">psychology</span>
              </div>
              <h3 className="font-h3 text-h3 mb-sm">AI Analysis</h3>
              <p className="text-on-surface-variant font-body-md px-4">
                Our proprietary BERT-based models scan for linguistic patterns, perplexity, and burstiness.
              </p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-surface-container-highest border border-primary/30 flex items-center justify-center mb-md shadow-[0_0_20px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500">
                <span className="material-symbols-outlined text-primary text-3xl" data-icon="analytics">analytics</span>
              </div>
              <h3 className="font-h3 text-h3 mb-sm">Instant Results</h3>
              <p className="text-on-surface-variant font-body-md px-4">
                Receive a detailed probability score and a breakdown of AI vs. human markers.
              </p>
            </div>
          </div>
        </section>
        {/* Technical Section (The Science) */}
        <section className="max-w-7xl mx-auto mb-xl">
          <div className="mb-md">
            <h2 className="font-h2 text-h2 mb-sm">The Science of Certainty</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Card 1 */}
            <div className="glass-card glow-border p-md rounded-xl transition-all duration-300 group">
              <div className="h-48 mb-md rounded-lg overflow-hidden bg-slate-900">
                <img alt="Neural network visualization" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" data-alt="A sophisticated neural network visualization featuring interconnected glowing blue and purple nodes against a deep obsidian background. The lighting is cinematic with soft ethereal glimmers suggesting high-speed data processing. The overall aesthetic is futuristic and high-tech, aligning with a dark mode glassmorphism UI. Each link between nodes represents a synaptic firing in an artificial intelligence framework." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDglNvW_uR5NbXV0Yz7gxo6UkR6KTujxuzQssJ-JQkKw7DQZqPU5mgieLsxIyhmzX0QxYf5F47c6vsQpcQij39Enl4LqLuKZ0pHnDXSn-5xjSACglc01v2YlwcI01gSVbCV_OkL876dhmaOMTKXaQsqp07XWtUiFdMheX9UL3VSHUuDbkuBaT10HTpEZ9Gh_P5x_f9qOomMryf8xNin7L1w0Sg2g826KKQfRkEyP0Ju0rQRG5O7iQy0i8x3OX4955u1kwcIKHDpJn4T" />
              </div>
              <h4 className="font-h3 text-h3 mb-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" data-icon="hub">hub</span>
                BERT Model
              </h4>
              <p className="text-on-surface-variant font-body-sm leading-relaxed">
                We leverage Bidirectional Encoder Representations from Transformers to understand the deep semantic context of every sentence. Unlike standard detectors, our model reads text in both directions to capture nuanced linguistic intent.
              </p>
            </div>
            {/* Card 2 */}
            <div className="glass-card glow-border p-md rounded-xl transition-all duration-300 group">
              <div className="h-48 mb-md rounded-lg overflow-hidden bg-slate-900">
                <img alt="Linguistic pattern abstract" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" data-alt="A macro digital abstract representation of linguistic structures as flowing translucent ribbons of light. The colors range from deep indigo to electric violet, creating a sense of movement and structural integrity. The scene is set in a dark, infinite void that emphasizes the brilliance of the light patterns. This cinematic visual symbolizes the analysis of structural and semantic consistency in advanced natural language processing." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEZl6tzhz-gT9k6kOKEySkrBt9AEPpRdnDgReOBrcNPILxcXNYaXxb7DQ7xZuXQoQ3nnLHKs-PXmLXRJUxbge52fM0irQFurIQRgUepT7QjgZsAe4rKNSsH8HPXZRTpY9Rr6dg-UyKLVvDdHVR80GcEKf6SV10QL3-ymRDo2egij6fA5iVbuHsWD83l3sLnW0GTvTUiFizPSqzx3Lr4DY_DOucJr_0p_GIdM0hY7y9CnxaCSov_7-xztyyLth9k2RVcTptbS1roYgQ" />
              </div>
              <h4 className="font-h3 text-h3 mb-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" data-icon="pattern">pattern</span>
                NLP Pattern Detection
              </h4>
              <p className="text-on-surface-variant font-body-sm leading-relaxed">
                AI often produces text with specific mathematical "fingerprints." Our NLP engine analyzes structural integrity, looking for the lack of natural variance in sentence length and vocabulary choice—key indicators of synthetic generation.
              </p>
            </div>
            {/* Card 3 */}
            <div className="glass-card glow-border p-md rounded-xl transition-all duration-300 group">
              <div className="h-48 mb-md rounded-lg overflow-hidden bg-slate-900">
                <img alt="Data analytics glow" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" data-alt="A clean, minimalist 3D rendering of data visualization charts floating in a dark glass-like environment. Glowing probability arcs and percentage indicators are illuminated in a vibrant blue-to-purple gradient. The atmosphere is sophisticated and professional, using soft ambient shadows and high-contrast light to depict precision and intelligence. This represents the final weighting of multiple features within a neural network to calculate confidence scores." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHeuh2_ZQcR8MiU5EQa6kjjsf9LBsHv2fOsZJGOj8VelB6PRwKJrZsYbqKcETwYrVlGl-wKkyYVgrpqrDrYlm8VPtWYe091LNjplGI6lN45pYY13kdpG135UXvrkov-jD1q1O8_HgXEiaOxLct3Tyvfi3OShsj4daCq-174hI7uPBmqn7pvCxUmtBArDA3p-6vFceGGvX36SIpyiXwNugphPOPs95onOCss4P1tODN3qCG-OYm8QJ5babbahrErZyy6p3Xepk1Zqjv" />
              </div>
              <h4 className="font-h3 text-h3 mb-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" data-icon="calculate">calculate</span>
                Probability Scoring
              </h4>
              <p className="text-on-surface-variant font-body-sm leading-relaxed">
                Our final output isn't just a guess. Our neural network weighs hundreds of unique features simultaneously to calculate a final confidence level, providing you with a statistically rigorous probability score you can trust.
              </p>
            </div>
          </div>
        </section>
        {/* Final CTA */}
        <section className="max-w-5xl mx-auto glass-card rounded-2xl p-xl text-center relative overflow-hidden">
          {/* Background glow effect */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 blur-[100px]"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/20 blur-[100px]"></div>
          <div className="relative z-10">
            <h2 className="font-h2 text-h2 mb-md">Ready to verify your content?</h2>
            <p className="text-on-surface-variant font-body-lg mb-lg max-w-xl mx-auto">
              Join 10,000+ professionals using VeriText AI to maintain the integrity of their written work.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg px-10 py-4 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all active:scale-95">
              Try It Now
            </button>
          </div>
        </section>
      </main>
    </>
  )
}