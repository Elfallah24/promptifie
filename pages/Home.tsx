import React, { useState, useRef } from 'react';
import { Upload, Copy, Check, History, Zap, Lock, RefreshCw, Sparkles, Wand2, Image as ImageIcon, ArrowUp, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PROMPT_MODELS } from '../constants';
import { PromptModel, UserState } from '../types';
import { generatePromptFromImage } from '../services/gemini';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = useState<PromptModel>(PromptModel.GENERAL);
  const [image, setImage] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Simulated User State
  const [user, setUser] = useState<UserState>({
    isSubscriber: false,
    tier: 'Free',
    dailyUsesLeft: 5,
    monthlyCredits: 0
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const onGenerate = async () => {
    if (!image) {
      setError("Please upload an image first.");
      return;
    }

    const modelInfo = PROMPT_MODELS.find(m => m.id === selectedModel);
    
    if (modelInfo?.isPremium && !user.isSubscriber) {
      setError("This is a Pro feature. Please upgrade your plan.");
      return;
    }

    if (user.dailyUsesLeft <= 0 && !user.isSubscriber) {
      setError("Daily limit reached. Please upgrade for more uses.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const prompt = await generatePromptFromImage(image, selectedModel);
      setGeneratedPrompt(prompt);
      
      if (!user.isSubscriber) {
        setUser(prev => ({ ...prev, dailyUsesLeft: Math.max(0, prev.dailyUsesLeft - 1) }));
      }
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div ref={topRef} className="pt-24 pb-16 px-4 max-w-5xl mx-auto min-h-screen space-y-24">
      {/* Hero Section */}
      <section className="space-y-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-br from-black via-slate-800 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent leading-tight tracking-tight">
            Turn any image into a powerful AI prompt
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            Upload an image, choose a model, and get a professional-grade prompt instantly.
          </p>
        </div>

        {/* Upload Area */}
        <div className="grid grid-cols-1 gap-8">
          <div 
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`relative h-80 rounded-[32px] border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden shadow-2xl
              ${image ? 'border-accent' : 'border-slate-300 dark:border-white/10 hover:border-accent hover:bg-slate-50 dark:hover:bg-white/5'}`}
          >
            {image ? (
              <div className="absolute inset-0 w-full h-full">
                <img src={image} alt="Preview" className="w-full h-full object-contain bg-slate-50 dark:bg-black" />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                  <p className="text-white font-bold bg-accent px-6 py-2 rounded-full shadow-xl">Change Image</p>
                </div>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-3xl flex items-center justify-center mb-4 shadow-inner">
                  <Upload className="text-slate-500 dark:text-slate-400" size={32} />
                </div>
                <p className="text-lg font-bold text-black dark:text-white">Drag & drop or click to upload</p>
                <p className="text-sm text-slate-500 mt-2 font-medium">JPG, PNG, WebP supported</p>
              </>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload} 
            />
          </div>

          {/* AI Model Selector */}
          <section className="space-y-4">
            <h2 className="text-xl font-black flex items-center gap-2 text-black dark:text-white">
              <Zap className="text-accent" size={24} />
              Select AI Model
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {PROMPT_MODELS.map((model) => {
                const isDisabled = model.isPremium && !user.isSubscriber;
                const isSelected = selectedModel === model.id;
                
                return (
                  <button
                    key={model.id}
                    onClick={() => !isDisabled && setSelectedModel(model.id as PromptModel)}
                    className={`relative p-5 rounded-2xl text-left border-2 transition-all group overflow-hidden shadow-sm
                      ${isSelected 
                        ? (model.isSpecial ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,0.2)]' : 'border-accent bg-accent/10') 
                        : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-accent'}
                      ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'active:scale-95'}
                    `}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`font-bold text-sm leading-tight ${isSelected ? 'text-accent dark:text-accent' : 'text-black dark:text-white'}`}>
                        {model.title}
                      </span>
                      {model.isPremium && (
                        <span className="text-[10px] uppercase font-black px-2 py-1 rounded-full text-white bg-accent flex items-center gap-0.5">
                          <Lock size={10} /> Pro
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      {model.description}
                    </p>
                    {isDisabled && (
                      <Link 
                        to="/pricing" 
                        className="absolute inset-0 z-10 bg-white/20 dark:bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      >
                        <span className="bg-accent text-white text-[10px] font-black px-4 py-2 rounded-full flex items-center gap-1 shadow-2xl scale-110">
                          Unlock Pro <Zap size={10} />
                        </span>
                      </Link>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Generator Actions */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-white dark:bg-white/5 rounded-3xl border border-black/5 dark:border-white/5 shadow-2xl">
              <div className="flex items-center gap-6 w-full md:w-auto">
                <button
                  disabled={!image || isGenerating || (user.dailyUsesLeft === 0 && !user.isSubscriber)}
                  onClick={onGenerate}
                  className={`flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-black text-lg transition-all active:scale-95 w-full md:w-auto
                    ${!image || isGenerating || (user.dailyUsesLeft === 0 && !user.isSubscriber)
                      ? 'bg-slate-200 dark:bg-white/10 text-slate-400 cursor-not-allowed shadow-none'
                      : 'bg-accent hover:bg-accent-hover text-white shadow-xl shadow-accent/20'}
                  `}
                >
                  {isGenerating ? <RefreshCw className="animate-spin" size={24} /> : <Zap size={24} />}
                  {isGenerating ? 'Analyzing...' : 'Generate Prompt'}
                </button>
                <div className="hidden md:block text-sm">
                  <div className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-1">Daily Limit</div>
                  <div className="text-black dark:text-white font-black text-lg">
                    {user.dailyUsesLeft} / 5 <span className="text-slate-500 text-xs font-bold">left</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <button className="flex-1 md:flex-none p-3 text-slate-600 dark:text-slate-400 hover:text-accent hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm font-bold">
                  <History size={18} /> History
                </button>
                <Link to="/pricing" className="flex-1 md:flex-none px-4 py-2 text-xs font-black bg-black dark:bg-white text-white dark:text-black rounded-xl transition-all hover:opacity-90 border border-black/10 text-center">
                  Get More
                </Link>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-500 dark:text-red-400 text-sm font-bold animate-pulse">
                {error}
              </div>
            )}

            {/* Output Field */}
            <div className="relative">
              <label className="block text-[10px] font-black text-slate-500 mb-3 uppercase tracking-widest ml-2">Generated Output</label>
              <div className="relative">
                <textarea
                  value={generatedPrompt}
                  readOnly
                  placeholder="Your professional AI prompt will appear here after analysis..."
                  className="w-full h-72 bg-white dark:bg-white/5 border-2 border-slate-100 dark:border-white/5 rounded-[32px] p-6 text-black dark:text-white focus:outline-none focus:border-accent transition-colors resize-none shadow-2xl placeholder:text-slate-300 dark:placeholder:text-slate-700 font-mono text-sm leading-relaxed"
                />
                {generatedPrompt && (
                  <button
                    onClick={() => copyToClipboard(generatedPrompt)}
                    className="absolute top-6 right-6 p-3 bg-accent text-white hover:bg-accent-hover rounded-2xl transition-all flex items-center gap-2 shadow-xl shadow-accent/20 active:scale-95"
                  >
                    {copySuccess ? <Check size={18} /> : <Copy size={18} />}
                    <span className="text-xs font-black">{copySuccess ? 'Copied!' : 'Copy'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="space-y-12 pb-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-black dark:text-white tracking-tight">Explore Our Tools</h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Unlock the full potential of creative AI with our specialized toolset.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link 
            to="/magic-enhance"
            className="group p-10 rounded-[40px] bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-accent transition-all shadow-xl flex flex-col h-full"
          >
            <div className="w-16 h-16 bg-accent/10 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-white transition-all">
              <Wand2 className="text-accent group-hover:text-white" size={32} />
            </div>
            <h3 className="text-2xl font-black mb-3 text-black dark:text-white">Magic Enhance</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 font-medium">Turn simple ideas into brilliant, detailed prompts with AI enrichment.</p>
            <div className="mt-auto flex items-center gap-2 text-accent font-black text-sm group-hover:translate-x-1 transition-transform">
              Launch Tool <ArrowRight size={18} />
            </div>
          </Link>

          <div 
            onClick={scrollToTop}
            className="group p-10 rounded-[40px] bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-emerald-500 transition-all shadow-xl cursor-pointer flex flex-col h-full"
          >
            <div className="w-16 h-16 bg-emerald-500/10 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-emerald-500 group-hover:text-white transition-all">
              <ImageIcon className="text-emerald-500 group-hover:text-white" size={32} />
            </div>
            <h3 className="text-2xl font-black mb-3 text-black dark:text-white">AI Describe Image</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 font-medium">Upload any picture to get a detailed analysis and reverse prompt.</p>
            <div className="mt-auto flex items-center gap-2 text-emerald-500 font-black text-sm group-hover:-translate-y-1 transition-transform">
              Use Generator <ArrowUp size={18} />
            </div>
          </div>

          <Link 
            to="/ai-image-generator"
            className="group p-10 rounded-[40px] bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-cyan-500 transition-all shadow-xl flex flex-col h-full"
          >
            <div className="w-16 h-16 bg-cyan-500/10 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-cyan-500 group-hover:text-white transition-all">
              <Sparkles className="text-cyan-500 group-hover:text-white" size={32} />
            </div>
            <h3 className="text-2xl font-black mb-3 text-black dark:text-white">AI Image Generator</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 font-medium">Bring your words to life. Generate stunning visuals from any text.</p>
            <div className="mt-auto flex items-center gap-2 text-cyan-500 font-black text-sm group-hover:translate-x-1 transition-transform">
              Launch Tool <ArrowRight size={18} />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;