import React, { useState } from 'react';
import { 
  Target, List, Layers, Sparkles, Copy, Check, ClipboardCopy, RotateCcw, ChevronDown, MousePointer2 
} from 'lucide-react';
import { frameworks } from '../data';

interface FrameworkExplorerProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

export const FrameworkExplorer: React.FC<FrameworkExplorerProps> = ({ activeTab, onTabChange }) => {
  const selectedFramework = frameworks.find(f => f.id === activeTab) || frameworks[0];
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleStepClick = (letter: string) => {
    setActiveStep(prev => prev === letter ? null : letter);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden my-8">
      <div className="bg-slate-900 p-6 text-white relative">
        <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">مستكشف النماذج الاحترافية</h2>
            <p className="text-slate-300">اختر النموذج المناسب لمهمتك لضمان أفضل النتائج</p>
        </div>
        
        {activeTab !== 'co-star' && (
           <button 
             onClick={() => onTabChange('co-star')}
             className="absolute top-4 left-4 p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white/80 hover:text-white transition-all text-xs md:text-sm font-medium flex items-center gap-2 backdrop-blur-sm border border-white/10"
             title="العودة للنموذج الافتراضي (CO-STAR)"
           >
             <RotateCcw size={16} />
             <span className="hidden md:inline">استعادة الافتراضي</span>
           </button>
         )}
      </div>

      <div className="flex overflow-x-auto bg-slate-100 p-2 gap-2 hide-scrollbar">
        {frameworks.map((f) => (
          <button
            key={f.id}
            onClick={() => onTabChange(f.id)}
            className={`flex-1 min-w-[100px] py-3 px-4 rounded-xl font-bold transition-all text-sm md:text-base whitespace-nowrap
              ${activeTab === f.id 
                ? 'bg-white text-indigo-600 shadow-md transform scale-105' 
                : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'}`}
          >
            {f.name}
          </button>
        ))}
      </div>

      <div className="p-6 md:p-8">
        <div className="mb-8 border-b border-gray-100 pb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div>
                <h3 className="text-4xl font-black text-indigo-900 mb-1">{selectedFramework.name}</h3>
                <p className="text-sm font-mono text-indigo-400 mb-2">{selectedFramework.fullName}</p>
             </div>
             <div className="bg-indigo-50 px-4 py-3 rounded-lg border border-indigo-100 text-indigo-700 text-sm flex items-start gap-3 md:max-w-md">
                <Target size={18} className="mt-1 shrink-0" />
                <span className="leading-relaxed"><strong>أفضل استخدام:</strong> {selectedFramework.bestFor}</span>
             </div>
          </div>
          <p className="text-gray-600 mt-4 text-lg">{selectedFramework.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-3">
             <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
               <Layers size={20} className="text-indigo-500"/>
               تفكيك النموذج:
               <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-full flex items-center gap-1 font-normal opacity-80">
                 <MousePointer2 size={10} />
                 مرر الماوس للتفاصيل
               </span>
             </h4>
             <div className="flex flex-col gap-3" onMouseLeave={() => setHoveredStep(null)}>
               {selectedFramework.steps.map((step, idx) => {
                 const isHovered = hoveredStep === step.letter;
                 const isClicked = activeStep === step.letter;
                 const isActive = isHovered || isClicked;
                 const isAnyHovered = hoveredStep !== null;
                 const colorName = step.color.split('-')[1] || 'gray';

                 return (
                   <div 
                     key={idx} 
                     className={`flex items-start group cursor-help select-none transition-opacity duration-300 ${isAnyHovered && !isActive ? 'opacity-40 grayscale-[0.5]' : 'opacity-100'}`}
                     onMouseEnter={() => setHoveredStep(step.letter)}
                     onMouseLeave={() => setHoveredStep(null)}
                     onClick={() => handleStepClick(step.letter)}
                   >
                      <div className={`w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl ${step.color} text-white flex items-center justify-center text-xl md:text-2xl font-black shadow-md transition-all duration-300 relative z-10 ring-2 ring-white ${isActive ? 'scale-110 rotate-3 shadow-xl' : 'group-hover:scale-105'}`}>
                        {step.letter}
                      </div>
                      
                      <div className="h-12 md:h-14 flex items-center justify-center mx-1 md:mx-2">
                        <div className={`h-1 w-4 md:w-6 rounded-full transition-all duration-300 ${isActive ? 'bg-indigo-300 w-8' : 'bg-gray-100'}`}></div>
                      </div>
                      
                      <div className={`flex-1 p-3 md:p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden
                        ${isActive 
                          ? `bg-white border-${colorName}-200 shadow-lg ring-1 ring-${colorName}-100 translate-x-1` 
                          : 'bg-gray-50 border-gray-100 hover:bg-white hover:border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                            <p className={`font-bold text-sm md:text-base transition-colors ${isActive ? `text-${colorName}-700` : 'text-gray-700'}`}>
                              {step.name}
                            </p>
                            <ChevronDown size={16} className={`text-gray-300 transition-all duration-300 ${isActive ? `text-${colorName}-500 rotate-180` : ''}`} />
                        </div>
                        
                        <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                            <div className="overflow-hidden">
                                 <p className={`text-xs md:text-sm text-gray-600 mt-2 pt-2 border-t border-gray-100 leading-relaxed transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                                    {step.description}
                                 </p>
                            </div>
                        </div>
                      </div>
                   </div>
                 );
               })}
             </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col h-full shadow-inner relative overflow-hidden">
            <div className="flex justify-between items-center mb-4 relative z-10">
                 <h4 className="font-bold text-gray-800 flex items-center gap-2">
                   <Sparkles size={20} className="text-yellow-500"/>
                   مثال عملي:
                 </h4>
                 <button 
                    onClick={() => handleCopy(selectedFramework.fullExample, 999)}
                    className="text-xs flex items-center gap-1 text-indigo-500 hover:text-indigo-700 bg-white px-2 py-1 rounded border border-indigo-100 hover:border-indigo-300 transition-colors shadow-sm"
                    title="نسخ المثال كامل"
                 >
                    {copiedIndex === 999 ? <Check size={14} className="text-green-500"/> : <Copy size={14} />}
                    {copiedIndex === 999 ? <span className="text-green-600">تم النسخ</span> : 'نسخ الكل'}
                 </button>
            </div>
             
             <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex-1 font-medium text-gray-700 leading-8 relative overflow-hidden select-text cursor-text transition-colors duration-300 z-10">
                {selectedFramework.fullExample.split(/(\([A-Z]\))/g).map((part, i) => {
                  if (part.match(/\([A-Z]\)/)) {
                     const letter = part.replace(/[()]/g, '');
                     const step = selectedFramework.steps.find(s => s.letter === letter);
                     const isHighlighted = hoveredStep === letter || activeStep === letter;
                     
                     return (
                       <span 
                         key={i} 
                         className={`
                           inline-block mx-1 px-2 py-0.5 rounded-md text-xs font-bold text-white align-middle transition-all duration-300
                           ${step?.color || 'bg-gray-400'}
                           ${isHighlighted ? 'ring-4 ring-offset-2 ring-indigo-200 scale-125 z-10 shadow-lg' : 'shadow-sm'}
                         `}
                       >
                         {letter}
                       </span>
                     );
                  }
                  
                  const isAnyHighlighted = hoveredStep !== null || activeStep !== null;
                  return <span key={i} className={`transition-all duration-300 ${isAnyHighlighted && !part.match(/\([A-Z]\)/) ? 'opacity-40 blur-[0.5px]' : 'opacity-100'}`}>{part}</span>;
                })}
             </div>

             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 opacity-5 pointer-events-none z-0">
               <Target size={200} className="text-indigo-500" />
             </div>

             <div className="mt-4 flex gap-2 text-xs text-gray-400 relative z-10">
               <List size={14} />
               <span>مرر الماوس على القائمة يمينًا لترى مكان كل خطوة في المثال</span>
             </div>
          </div>
        </div>

        {selectedFramework.templates && selectedFramework.templates.length > 0 && (
          <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
            <h4 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                <ClipboardCopy size={20} className="text-indigo-600" />
                قوالب جاهزة إضافية (اضغط للنسخ):
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedFramework.templates.map((template, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => handleCopy(template.prompt, idx)}
                      className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group relative overflow-hidden select-none"
                      title="اضغط لنسخ القالب"
                    >
                        <div className="flex gap-3">
                           <div className="flex-1">
                             <div className="flex items-center gap-2 mb-1">
                                {template.icon && React.createElement(template.icon, { size: 16, className: 'text-indigo-500' })}
                                <h5 className="font-bold text-gray-800 text-sm">{template.title}</h5>
                             </div>
                             <p className="text-xs text-gray-500 mb-2 leading-relaxed">{template.description}</p>
                             <div className="text-sm text-gray-700 leading-relaxed font-mono bg-gray-50 p-2.5 rounded border border-gray-100 group-hover:bg-indigo-50/50 group-hover:border-indigo-100 transition-colors line-clamp-2">
                               {template.prompt}
                             </div>
                           </div>
                           <div className="shrink-0 flex flex-col justify-center items-center gap-1 text-indigo-300 group-hover:text-indigo-600 transition-colors">
                             {copiedIndex === idx ? <Check size={20} className="text-green-500 scale-110 duration-200" /> : <Copy size={20} />}
                           </div>
                        </div>
                        {copiedIndex === idx && (
                           <div className="absolute inset-0 bg-green-50/95 flex flex-col items-center justify-center text-green-700 font-bold backdrop-blur-sm transition-all animate-in fade-in zoom-in duration-200 z-10">
                             <Check size={32} className="mb-2" />
                             <span>تم النسخ بنجاح!</span>
                           </div>
                        )}
                    </div>
                ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};