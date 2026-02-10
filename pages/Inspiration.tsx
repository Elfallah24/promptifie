
import React, { useState } from 'react';
import { INSPIRATION_GALLERY } from '../constants';
import { InspirationItem } from '../types';
import { Copy, Check, X } from 'lucide-react';

const Inspiration: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<InspirationItem | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const categories = Array.from(new Set(INSPIRATION_GALLERY.map(item => item.category)));

  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Animation & Illustration</h1>
        <p className="text-slate-400">Discover hand-picked prompts used to create stunning visual artwork.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {INSPIRATION_GALLERY.map((item) => (
          <div 
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-transform hover:-translate-y-1"
          >
            <img 
              src={item.imageUrl} 
              alt={item.category} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs font-bold uppercase bg-indigo-600 px-2 py-1 rounded mb-2 inline-block">
                {item.category}
              </span>
              <p className="text-slate-200 text-sm line-clamp-2 italic font-light">
                "{item.prompt}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setSelectedItem(null)}></div>
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/10 animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <div className="md:w-1/2 h-64 md:h-auto">
              <img src={selectedItem.imageUrl} className="w-full h-full object-cover" alt="Selected" />
            </div>

            <div className="md:w-1/2 p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-indigo-400 mb-2 block">{selectedItem.category}</span>
                <h3 className="text-2xl font-bold mb-6">Generated Result</h3>
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 relative mb-6">
                  <p className="text-slate-300 text-lg leading-relaxed italic">
                    "{selectedItem.prompt}"
                  </p>
                </div>
              </div>

              <button
                onClick={() => copyPrompt(selectedItem.prompt)}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-lg shadow-lg"
              >
                {copySuccess ? <Check size={22} className="text-green-400" /> : <Copy size={22} />}
                {copySuccess ? 'Copied to Clipboard' : 'Copy Prompt'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inspiration;
