import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;



export default function Homepage() {
  const [fileUpload, setFileUpload] = useState(false);

  return (
    <>
      <main className="pt-24 min-h-screen">
        {/* Hero Section */}
        <section className="relative px-8 py-16 lg:py-24 overflow-hidden">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 z-10">
              <h1 className="font-h1 text-h1 text-on-background mb-6">
                Detect <span className="text-gradient">AI-Generated</span> Text Instantly
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl">
                Leverage our advanced neural analysis engine to distinguish between human creativity and machine-generated content with 99.9% precision.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full">
                  <span className="material-symbols-outlined text-primary" data-icon="bolt">bolt</span>
                  <span className="font-label-caps text-label-caps text-primary">Fast</span>
                </div>
                <div className="flex items-center gap-2 bg-tertiary/10 border border-tertiary/20 px-4 py-2 rounded-full">
                  <span className="material-symbols-outlined text-tertiary" data-icon="verified">verified</span>
                  <span className="font-label-caps text-label-caps text-tertiary">Accurate</span>
                </div>
                <div className="flex items-center gap-2 bg-secondary/10 border border-secondary/20 px-4 py-2 rounded-full">
                  <span className="material-symbols-outlined text-secondary" data-icon="lock">lock</span>
                  <span className="font-label-caps text-label-caps text-secondary">Private</span>
                </div>
                <div className="flex items-center gap-2 bg-outline/10 border border-outline/20 px-4 py-2 rounded-full">
                  <span className="material-symbols-outlined text-outline" data-icon="description">description</span>
                  <span className="font-label-caps text-label-caps text-outline">Multi-format</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative glass-panel rounded-xl p-6 border border-white/10 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-h3 text-h3 text-primary">Analysis Result</h3>
                  <span className="bg-error-container/30 text-error px-3 py-1 rounded-full text-xs font-bold border border-error/20">Likely AI</span>
                </div>
                <div className="flex flex-col items-center py-6">
                  <div className="relative w-48 h-48 mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle className="text-surface-container-high" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="8"></circle>
                      <circle className="drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" cx="96" cy="96" fill="transparent" r="80" stroke="url(#gradient)" strokeDasharray="502" strokeDashoffset="75" strokeLinecap="round" strokeWidth="12"></circle>
                      <defs>
                        <linearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6"></stop>
                          <stop offset="100%" stopColor="#9333ea"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold font-h1">85%</span>
                      <span className="text-xs uppercase tracking-widest text-on-surface-variant">Probability</span>
                    </div>
                  </div>
                  <p className="text-center font-body-sm text-body-sm text-on-surface-variant">
                    Neural patterns detected typical of large language models. Structural entropy indicates low variation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Main Tool Area */}
        {
          fileUpload ? <FileMainToolArea setFileUpload={setFileUpload} /> : <TextMainToolArea setFileUpload={setFileUpload} />
        }
        {/* How It Works Section */}
        <section className="px-8 py-24 bg-surface-dim">
          <div className="max-w-screen-2xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-h2 text-h2 text-on-background mb-4">How It Works</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Our three-step process ensures cinematic accuracy in every detection.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="glass-panel p-8 rounded-2xl border border-white/5 relative group hover:border-primary/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 text-primary">
                  <span className="material-symbols-outlined" data-icon="input">input</span>
                </div>
                <h3 className="font-h3 text-h3 text-on-background mb-4">1. Input Text</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Paste your content or upload documents. Our engine supports multi-format ingestion including PDFs, academic papers, and source code.
                </p>
              </div>
              {/* Step 2 */}
              <div className="glass-panel p-8 rounded-2xl border border-white/5 relative group hover:border-tertiary/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-tertiary/20 flex items-center justify-center mb-6 text-tertiary">
                  <span className="material-symbols-outlined" data-icon="psychology">psychology</span>
                </div>
                <h3 className="font-h3 text-h3 text-on-background mb-4">2. Neural Analysis</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Our proprietary LLM-profile engine scans for perplexity patterns, burstiness, and structural markers unique to AI generation.
                </p>
              </div>
              {/* Step 3 */}
              <div className="glass-panel p-8 rounded-2xl border border-white/5 relative group hover:border-secondary/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-6 text-secondary">
                  <span className="material-symbols-outlined" data-icon="query_stats">query_stats</span>
                </div>
                <h3 className="font-h3 text-h3 text-on-background mb-4">3. Detailed Report</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Receive an instant probability score and a highlighted heatmap showing specific sentences that exhibit high AI characteristics.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Call to Action Section */}
        <section className="px-8 py-24">
          <div className="max-w-4xl mx-auto glass-panel p-12 rounded-3xl border border-primary/20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <h2 className="font-h1 text-h2 md:text-h1 text-on-background mb-6">Ready to verify?</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">
              Join thousands of professors, editors, and publishers who trust VeriText AI for absolute authenticity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-h3 text-h3 px-12 py-4 rounded-xl neon-glow">
                Get Started Free
              </button>
              <button className="border border-white/10 hover:bg-white/5 text-on-background font-h3 text-h3 px-12 py-4 rounded-xl transition-colors">
                Enterprise Solutions
              </button>
            </div>
            <div className="mt-12 flex justify-center items-center gap-8 grayscale opacity-50">
              <img alt="Partner Logo" className="h-6 object-contain" data-alt="A clean, minimalist monochrome logo of a tech organization displayed on a dark surface. The lighting is subtle, creating a professional and established brand feel consistent with the high-tech UI design." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9R3EiLtInCWKq_HLUyP3rgO0NeUrSG_UMp89oc5o_sLLogeNflUXywjN-NKvZW6x3T49pma5fXkmxyAFiOaTtcsEvDcsnCINw9a18q1uueh0vWQSYhd3oF7Je6yo0GmDvCQSvbL8ThW4s_i1zQ1BBvHfdkbp0FvsyNSKU7n5dows9MTiv5iXo8Jzzf_NLwwRoyKbS0YOT3F0yERlTv-c8SA_j8WW4sUuvhqgg5cau6UQ94Rlbhyoxqgzzu5W2JM6f-gg-fZSfn2C5" />
              <img alt="Partner Logo" className="h-6 object-contain" data-alt="A modern, abstract logo in a white hue set against a deep navy background. The logo represents a digital security company, emphasizing strength and reliability through clean lines and geometric balance in a cinematic dark theme." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-3bdXUdNrHsYbfm-3xxVCXz4sgwhRk63KgXcwv6goDz-XCh53h3iaKKaC3ZkrjaIKwmyMNdwhp59UTzHPhjANbT4D7GZj-TTa38rniJJx3DQPYJDz10yyrZot4rbJybneuYF51POnfKSiZ-JW910bwyoDJUEsQzZXCq-VjBWj2WL5NzVg_zJvq9etkifKaL7uTHY_qUJQBE0x3Wz6tfgWrUr5wzYxblWBTlXNOZsjJUMsUh7mQYR2h7yS1PMTnH_Meb_8mAmjjyLr" />
              <img alt="Partner Logo" className="h-6 object-contain" data-alt="An elegant, corporate logo for an educational institution, rendered in a simple light-colored stroke style. It rests on a semi-transparent dark glass surface with soft ambient blue lighting that complements the overall aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpLeB1KGR0dR6JEZIvVYwsaLMdSPZY-x6Z87WnTuMyXt4_2nY48RVnJY4dFmU8gNXDne98uoybHWU0X-sNXQPRnhEEGYMPfmfCW0A7AsPQ8_DdzhILkHKVhjVPuSpMVd50coOxn76hbKJDOLrZOLGr_EOKDvuoHQyNaqZ33FZNtdqvEWXqH5ld0UtXvQL00Q7BKmTcpa8KytsFty8Aahg4kHMZJBIoV73Ph19n6Gmfh45sKAcs-Hn40j3xkXmS1QRZZvevBAmbzQ2D" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function TextMainToolArea({ setFileUpload }) {

  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError("Please enter some text to analyze.");
      return;
    }
    setError("");
    setResult("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/predict`, {
        text: text
      });

      console.log(res.data);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(err.response.data.detail || err.response.data.error || "An error occurred while processing your request.");
      } else {
        setError("Server not reachable");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="px-3 py-20 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          <div className="glass-panel border border-white/5 rounded-2xl overflow-hidden shadow-2xl w-full lg:flex-1">
            <div className="flex border-b border-white/5 bg-white/5 px-6 py-4 justify-between items-center">
              <div className="flex gap-4">
                <button className="font-label-caps text-label-caps hover:text-white transition-colors text-primary border-b-2 border-primary pb-1" onClick={() => setFileUpload(false)}>
                  Paste Text
                </button>
                <button className="font-label-caps text-label-caps text-on-surface-variant hover:text-white transition-colors" onClick={() => setFileUpload(true)}>
                  Upload File
                </button>
              </div>
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-error/40"></span>
                <span className="w-3 h-3 rounded-full bg-tertiary/40"></span>
                <span className="w-3 h-3 rounded-full bg-primary/40"></span>
              </div>
            </div>

            {error && (
              <div className="mx-6 mt-6 p-4 bg-error-container/20 border border-error/30 text-error rounded-xl flex items-center gap-3 font-body-sm">
                <span className="material-symbols-outlined text-lg" data-icon="error">error</span>
                <span>{error}</span>
              </div>
            )}

            <div className="p-1">
              <textarea
                className="w-full h-80 bg-surface-container-low border-none focus:ring-2 focus:ring-primary/50 text-on-surface font-body-md text-body-md p-8 placeholder:text-outline transition-all duration-300 resize-none"
                placeholder="Enter the text you want to analyze..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5">
              <div className="flex items-center gap-4 text-outline font-body-sm">
                <span>Words: {result.word_count || 0} / 100000</span>
                <span className="w-px h-4 bg-white/10"></span>
                <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors" onClick={() => setFileUpload(true)}>
                  <span className="material-symbols-outlined text-sm" data-icon="cloud_upload">cloud_upload</span>
                  <span>Upload PDF instead</span>
                </div>
              </div>
              <button
                className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-h3 text-h3 text-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg neon-glow flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleSubmit()}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  "Analyze Text"
                )}
              </button>
            </div>
          </div>
          <ResultSection result={result} />
        </div>
      </section>
    </>
  );
}

function FileMainToolArea({ setFileUpload }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = React.useRef(null);

  const pdfUrl = React.useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  React.useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("Please upload a PDF file only.");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError("");
      setResult("");
      setShowPreview(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("Please upload a PDF file only.");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError("");
      setResult("");
      setShowPreview(false);
    }
  };

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a PDF file to analyze.");
      return;
    }
    setError("");
    setResult("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(`${API_URL}/api/predict-pdf`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(err.response.data.detail || err.response.data.error || "An error occurred while processing your request.");
      } else {
        setError("Server not reachable");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="px-3 py-20 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          <div className="glass-panel border border-white/5 rounded-2xl overflow-hidden shadow-2xl w-full lg:flex-1">
            <div className="flex border-b border-white/5 bg-white/5 px-6 py-4 justify-between items-center">
              <div className="flex gap-4">
                <button className="font-label-caps text-label-caps text-on-surface-variant hover:text-white transition-colors" onClick={() => setFileUpload(false)}>Paste Text</button>
                <button className="font-label-caps text-label-caps hover:text-white transition-colors text-primary border-b-2 border-primary pb-1" onClick={() => setFileUpload(true)}>Upload File</button>
              </div>
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-error/40"></span>
                <span className="w-3 h-3 rounded-full bg-tertiary/40"></span>
                <span className="w-3 h-3 rounded-full bg-primary/40"></span>
              </div>
            </div>

            {error && (
              <div className="mx-6 mt-6 p-4 bg-error-container/20 border border-error/30 text-error rounded-xl flex items-center gap-3 font-body-sm">
                <span className="material-symbols-outlined text-lg" data-icon="error">error</span>
                <span>{error}</span>
              </div>
            )}

            <div className="p-6">
              {file ? (
                <div className="w-full h-80 bg-surface-container-low/50 border-2 border-solid border-primary/40 rounded-xl flex flex-col items-center justify-center gap-6 p-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center relative">
                    <span className="material-symbols-outlined text-4xl text-primary relative z-10" data-icon="picture_as_pdf">picture_as_pdf</span>
                  </div>
                  <div className="text-center max-w-md">
                    <p className="font-h3 text-h3 text-on-background mb-1 truncate">{file.name}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button
                    type="button"
                    className="text-error font-label-caps text-label-caps hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      setResult("");
                      setError("");
                      setShowPreview(false);
                    }}
                    disabled={loading}
                  >
                    Remove File
                  </button>
                </div>
              ) : (
                <div
                  className={`w-full h-80 bg-surface-container-low/50 border-2 border-dashed ${isDragging ? 'border-primary bg-primary/5' : 'border-primary/30'} rounded-xl flex flex-col items-center justify-center gap-6 group hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 cursor-pointer`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={handleBoxClick}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all"></div>
                    <span className="material-symbols-outlined text-4xl text-primary relative z-10" data-icon="cloud_upload">cloud_upload</span>
                  </div>
                  <div className="text-center">
                    <p className="font-h3 text-h3 text-on-background mb-2">Drag &amp; drop PDF here or <span className="text-primary">click to browse</span></p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Supported format: PDF (Max 25MB)</p>
                  </div>
                </div>
              )}
            </div>

            {file && (
              <div className="p-6 border-t border-white/5 bg-white/[0.01]">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-body-lg text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm" data-icon="visibility">visibility</span>
                    <span>Document Visual Preview</span>
                  </h4>
                  <button
                    type="button"
                    className="text-primary font-label-caps text-label-caps hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    <span>{showPreview ? "Hide Preview" : "Show Preview"}</span>
                    <span className="material-symbols-outlined text-sm" data-icon={showPreview ? "keyboard_arrow_up" : "keyboard_arrow_down"}>
                      {showPreview ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                    </span>
                  </button>
                </div>

                {showPreview && pdfUrl && (
                  <div className="w-full h-[500px] rounded-xl overflow-hidden border border-white/10 bg-white shadow-inner">
                    <iframe
                      src={pdfUrl}
                      className="w-full h-full border-none"
                      title="PDF Document Preview"
                    />
                  </div>
                )}
              </div>
            )}

            {result && result.extracted_text && (
              <div className="p-6 border-t border-white/5 bg-white/[0.02]">
                <h4 className="font-body-lg text-primary mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm" data-icon="description">description</span>
                  <span>Extracted PDF Text</span>
                </h4>
                <div className="max-h-60 overflow-y-auto p-4 bg-surface-container-low rounded-xl text-on-surface-variant font-body-sm whitespace-pre-wrap border border-white/5">
                  {result.extracted_text}
                </div>
              </div>
            )}

            <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5">
              <div className="text-outline font-body-sm">
                {result.word_count ? (
                  <span>Words: {result.word_count} / 1000</span>
                ) : (
                  <span>PDF size limit: 25MB</span>
                )}
              </div>
              <button
                className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-h3 text-h3 text-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg neon-glow flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleSubmit()}
                disabled={loading || !file}
              >
                {loading ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  "Analyze PDF"
                )}
              </button>
            </div>
          </div>
          <ResultSection result={result} />
        </div>
      </section>
    </>
  );
}

function ResultSection({ result }) {
  const hasResult = result && Object.keys(result).length > 0;
  return (
    <>
      <div className="relative group w-full lg:w-[380px]">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative glass-panel rounded-xl p-6 border border-white/10 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-h3 text-h3 text-primary">Detection Score</h3>
          </div>
          <div className={`flex flex-col items-center py-6 ${hasResult ? result.AI ? 'bg-error-container/15 border-error/30' : 'bg-green-500/15 border-green-400/30' : 'bg-gray-900/60'} rounded-xl border`}>
            {hasResult ? <ResultVisible result={result} /> : <NoResult />}
          </div>
        </div>
      </div>
    </>
  )
}

function ResultVisible({ result }) {
  const circumference = 502;
  const offset = result.AI ? circumference - (result.prediction.ai * circumference) : circumference - (result.prediction.human * circumference);
  return (
    <>
      <div className="flex flex-col items-center py-6">
        <div className="relative w-48 h-48 mb-10">
          <svg className="w-full h-full transform -rotate-90">
            <circle className="text-surface-container-high" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="8"></circle>
            <circle cx="96" cy="96" fill="transparent" r="80" stroke="url(#gradient-2)" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" strokeWidth="12" filter={result.AI ? "url(#glow-red)" : "url(#glow-green)"}></circle>
            <defs>
              <linearGradient id="gradient-2" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor={`${result.AI ? '#ef4444' : '#3cf6cb'}`}></stop>
                <stop offset="100%" stopColor={`${result.AI ? '#ef4444' : '#08b55e'}`}></stop>
              </linearGradient>
              <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="rgb(239,68,68)" floodOpacity="0.8" />
              </filter>

              <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="rgb(59,246,202)" floodOpacity="0.8" />
              </filter>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold font-h1">{result.AI ? (result.prediction.ai * 100).toFixed(0) : (result.prediction.human * 100).toFixed(0)}%</span>
            <span className="text-xs uppercase tracking-widest text-on-surface-variant">{result.AI ? "AI" : "Human"}</span>
          </div>
        </div>
        <span
          className={`${result.AI
            ? "bg-error-container/30 text-error border-error/20"
            : "bg-green-500/20 text-green-400 border-green-400/20"
            } px-3 py-1 rounded-full text-xs font-bold border`}
        >
          {result.AI ? "Likely AI" : "Likely Human"}
        </span>
      </div>
    </>
  )
}

function NoResult() {
  return (
    <>
      <div className="flex size-10 items-center justify-center rounded-full bg-muted bg-black/50 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="text-center">
        <p>
          No score yet
        </p>
        <p className="text-center font-body-sm text-body-sm text-on-surface-variant">
          Submit your text to see the analysis results.
        </p>
      </div>
    </>
  )
}