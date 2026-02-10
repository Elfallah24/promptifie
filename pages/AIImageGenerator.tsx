
import React, { useState } from 'react';
import { Sparkles, Zap, RefreshCw, Download, Image as ImageIcon } from 'lucide-react';
import { generateImageFromText } from '../services/gemini';

const AIImageGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    try {
      const result = await generateImageFromText(input);
      setImageUrl(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `promptifie-gen-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-32 pb-16 px-4 max-w-3xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-cyan-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-600/10">
          <Sparkles className="text-cyan-400" size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">AI Image Generator</h1>
        <p className="text-slate-400 text-lg">Bring your words to life. Generate images from any text.</p>
      </div>

      <div className="space-y-8">
        <div className="glass-effect rounded-[32px] p-8 border border-white/5 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider ml-1">Image Prompt</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe the image you want to create..."
              className="w-full h-40 bg-slate-900/50 border border-slate-700 rounded-2xl p-5 text-slate-200 focus:outline-none focus:border-cyan-500 transition-all resize-none text-lg leading-relaxed placeholder:text-slate-700"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !input.trim()}
            className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-xl shadow-cyan-600/20"
          >
            {isLoading ? <RefreshCw className="animate-spin" size={24} /> : <ImageIcon size={24} />}
            {isLoading ? 'Generating...' : 'Generate Image'}
          </button>
        </div>

        {imageUrl && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
            <div className="flex items-center justify-between ml-1">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <ImageIcon size={16} className="text-cyan-400" /> Result
              </h3>
              <button
                onClick={downloadImage}
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-bold"
              >
                <Download size={16} />
                Download Image
              </button>
            </div>
            <div className="rounded-[40px] overflow-hidden border border-white/10 shadow-2xl aspect-square bg-slate-900">
              <img src={imageUrl} alt="Generated result" className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIImageGenerator;
