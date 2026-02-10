
import React, { useState } from 'react';
import { Wand2, Zap, RefreshCw, Copy, Check, Sparkles } from 'lucide-react';
import { enhancePrompt } from '../services/gemini';

const MagicEnhance: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    try {
      const result = await enhancePrompt(input);
      setOutput(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="pt-32 pb-16 px-4 max-w-3xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-indigo-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-600/10">
          <Wand2 className="text-indigo-400" size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Magic Enhance</h1>
        <p className="text-slate-400 text-lg">Turn simple ideas into brilliant, detailed prompts.</p>
      </div>

      <div className="space-y-8">
        <div className="glass-effect rounded-[32px] p-8 border border-white/5 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider ml-1">Your Concept</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a basic prompt..."
              className="w-full h-40 bg-slate-900/50 border border-slate-700 rounded-2xl p-5 text-slate-200 focus:outline-none focus:border-indigo-500 transition-all resize-none text-lg leading-relaxed placeholder:text-slate-700"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !input.trim()}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/20"
          >
            {isLoading ? <RefreshCw className="animate-spin" size={24} /> : <Zap size={24} />}
            {isLoading ? 'Enhancing...' : 'Generate'}
          </button>
        </div>

        {output && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
            <div className="flex items-center justify-between ml-1">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles size={16} className="text-indigo-400" /> Enhanced Result
              </h3>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-bold"
              >
                {copySuccess ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                {copySuccess ? 'Copied!' : 'Copy Prompt'}
              </button>
            </div>
            <div className="glass-effect rounded-[32px] p-8 border border-indigo-500/20 bg-indigo-500/5">
              <p className="text-slate-200 text-lg leading-relaxed italic">
                "{output}"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MagicEnhance;
