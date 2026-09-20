import React, { useState } from 'react';
import { ChevronLeft, Download, CheckCircle, FileText, Loader2 } from 'lucide-react';
import { Material } from '../types';

interface PdfViewerScreenProps {
  material: Material;
  isDownloaded: boolean;
  onDownloadToggle: () => void;
  onBack: () => void;
}

const PdfViewerScreen: React.FC<PdfViewerScreenProps> = ({ material, isDownloaded, onDownloadToggle, onBack }) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(material.url)}`;

  const handleDownload = () => {
    if (isDownloaded) return;

    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      onDownloadToggle();
      
      const link = document.createElement('a');
      link.href = material.url;
      link.download = material.title;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#122C34] flex flex-col animate-in slide-in-from-right duration-300">
      
      {/* Top Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#122C34]/95 backdrop-blur-xl">
        <div className="flex items-center gap-3.5 overflow-hidden">
          <button 
            onClick={onBack}
            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-all cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex flex-col overflow-hidden">
            <h1 className="text-xs md:text-sm font-bold text-white truncate pr-4 leading-none mb-1">{material.title}</h1>
            <span className="text-[9px] text-[#0E98A8] font-bold uppercase tracking-wider">Lecture et étude hors-ligne</span>
          </div>
        </div>
        
        <button 
          onClick={handleDownload}
          disabled={isDownloading || isDownloaded}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
            isDownloaded 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
              : 'bg-[#F26522] text-white hover:bg-[#EE591D] shadow-lg'
          }`}
        >
          {isDownloading ? (
            <Loader2 size={13} className="animate-spin" />
          ) : isDownloaded ? (
            <>
              <CheckCircle size={13} /> 
              <span>Enregistré</span>
            </>
          ) : (
            <>
              <Download size={13} /> 
              <span>Télécharger</span>
            </>
          )}
        </button>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 bg-[#1A2B32] relative overflow-hidden">
        {!isIframeLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#122C34] z-20">
            <div className="relative mb-4">
              <div className="w-14 h-14 border-2 border-[#0A7A94]/20 rounded-full" />
              <div className="absolute inset-0 w-14 h-14 border-t-2 border-[#0A7A94] rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <FileText size={18} className="text-[#0E98A8]" />
              </div>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest animate-pulse">
              Chargement du support pédagogique...
            </p>
          </div>
        )}
        
        <iframe 
          src={viewerUrl}
          className={`w-full h-full transition-opacity duration-500 ${isIframeLoaded ? 'opacity-100' : 'opacity-0'}`}
          title={material.title}
          frameBorder="0"
          onLoad={() => setIsIframeLoaded(true)}
        />
      </div>
      
      {isDownloaded && (
        <div className="bg-emerald-600 p-2 text-center">
          <p className="text-[10px] text-white font-bold uppercase tracking-wider flex items-center justify-center gap-2">
            <CheckCircle size={12} />
            Disponible hors-ligne dans vos téléchargements Cercle Hub
          </p>
        </div>
      )}
    </div>
  );
};

export default PdfViewerScreen;
