import React, { useState, useEffect, useRef } from 'react';
import { generateResponse } from '../services/geminiService';
import { ChatMessage, FrameworkTemplate } from '../types';
import { Send, Sparkles, Loader2, ClipboardPlus, AlertCircle, Lightbulb, ArrowDown, Mic, MicOff, History, Clock, Trash2, X, Target, Maximize2, Minimize2 } from 'lucide-react';
import { frameworks } from '../data';

interface PlaygroundProps {
  activeFrameworkId: string;
}

export const Playground: React.FC<PlaygroundProps> = ({ activeFrameworkId }) => {
  const [input, setInput] = useState(() => {
    return localStorage.getItem('promptmaster_playground_input') || '';
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ChatMessage | null>(() => {
    const saved = localStorage.getItem('promptmaster_playground_response');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [history, setHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('promptmaster_playground_history');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showHistory, setShowHistory] = useState(false);
  
  const [generatingExample, setGeneratingExample] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const recognitionRef = useRef<any>(null);

  const activeFramework = frameworks.find(f => f.id === activeFrameworkId);

  useEffect(() => {
    localStorage.setItem('promptmaster_playground_input', input);
  }, [input]);

  useEffect(() => {
    if (response) {
      localStorage.setItem('promptmaster_playground_response', JSON.stringify(response));
    } else {
      localStorage.removeItem('promptmaster_playground_response');
    }
  }, [response]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFullScreen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const addToHistory = (text: string) => {
    if (!text.trim()) return;
    setHistory(prev => {
      const newHistory = [text, ...prev.filter(h => h !== text)].slice(0, 5);
      localStorage.setItem('promptmaster_playground_history', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('promptmaster_playground_history');
    setShowHistory(false);
  };

  const handleRestoreFromHistory = (text: string) => {
    setInput(text);
    setShowHistory(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    addToHistory(input);
    
    setLoading(true);
    setResponse(null);
    try {
      const text = await generateResponse(input);
      setResponse({ role: 'model', text });
    } catch (error) {
      setResponse({ role: 'model', text: 'عذراً، حدث خطأ أثناء الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت أو المحاولة مرة أخرى لاحقاً.', isError: true });
    } finally {
      setLoading(false);
    }
  };

  const handleImprove = () => {
    if (!input.trim()) return;
    addToHistory(input);

    const improvedPrompt = `تصرف كخبير هندسة أوامر. قم بتحسين الأمر التالي ليكون أكثر دقة واحترافية ليناسب طلاب المدارس باستخدام نموذج ${activeFramework?.name}: "${input}". 
    فقط اعطني الأمر المحسن مباشرة بدون مقدمات.`;
    setInput("جاري التحسين...");
    generateResponse(improvedPrompt).then(res => setInput(res));
  };

  const handleGenerateExample = async () => {
    if (!activeFramework) return;
    setGeneratingExample(true);
    setInput("");
    setResponse(null);
    
    try {
      let specificContext = "أن يكون موضوعه ممتعاً وجذاباً (مثلاً عن الألعاب، الفضاء، اختراع، قصة غريبة).";
      if (activeFramework.id === 'micro') {
        specificContext = "أن يركز المثال حصرياً على نقاط قوة نموذج MICRO وهي: العصف الذهني (Brainstorming) للأفكار الإبداعية، أو كتابة نصوص قصيرة لوسائل التواصل الاجتماعي (Social Media Captions).";
      }

      const metaPrompt = `
        تصرف كمعلم خبير في هندسة الأوامر.
        النموذج المختار: ${activeFramework.name} (${activeFramework.fullName}).
        المطلوب: اكتب مثالاً واحداً فقط لـ "أمر" (Prompt) يمكن استخدامه مع الذكاء الاصطناعي، بحيث يطبق خطوات هذا النموذج بدقة.
        
        شروط المثال:
        1. أن يكون باللغة العربية.
        2. ${specificContext}
        3. أن يكون واضح الهيكلية.
        4. لا تكتب أي شرح أو مقدمة، فقط اكتب نص الأمر الجاهز للنسخ.
      `;
      const text = await generateResponse(metaPrompt);
      setInput(text.trim());
    } catch (error) {
      setInput("حدث خطأ أثناء توليد المثال.");
    } finally {
      setGeneratingExample(false);
    }
  };

  const applyTemplate = (template: string) => {
    setInput(template);
    setResponse(null); 
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("عذراً، متصفحك لا يدعم خاصية تحويل الصوت إلى نص.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA';
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setInput(prev => {
           const separator = prev && !prev.endsWith(' ') ? ' ' : '';
           return prev + separator + finalTranscript;
        });
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const getTemplateIcon = (idx: number) => {
     const icons = [Sparkles, Lightbulb, ClipboardPlus, Target];
     const IconComp = icons[idx % icons.length];
     return <IconComp size={16} className="text-indigo-400" />;
  };

  return (
    <div 
      className={`bg-white shadow-xl border border-gray-200 transition-all duration-300 ease-in-out
        ${isFullScreen 
          ? 'fixed inset-0 z-50 w-full h-full rounded-none overflow-y-auto' 
          : 'rounded-3xl relative' 
        }
      `}
    >
      <div className={`bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white flex justify-between items-start ${!isFullScreen ? 'rounded-t-3xl' : ''}`}>
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="text-yellow-300" />
            مختبر الذكاء الاصطناعي
          </h3>
          <p className="opacity-90 mt-2 text-sm md:text-base">
            جرب كتابة أمر (Prompt) باستخدام نموذج 
            <span className="font-bold bg-white/20 px-2 py-0.5 rounded mx-1">{activeFramework?.name}</span>
             وشاهد النتيجة!
          </p>
        </div>
        
        <button 
          onClick={() => setIsFullScreen(!isFullScreen)}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
          title={isFullScreen ? "إنهاء وضع ملء الشاشة (ESC)" : "وضع ملء الشاشة"}
        >
          {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>
      </div>

      <div className="p-6 space-y-6">
        {activeFramework && !isFullScreen && (
          <div className="mb-6">
             <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-1">
               <ClipboardPlus size={14}/>
               قوالب جاهزة للتجربة:
             </p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
               {activeFramework.templates && activeFramework.templates.map((tpl: FrameworkTemplate, idx: number) => (
                 <div key={idx} className="flex items-start justify-between p-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all group relative overflow-hidden gap-3">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="p-1.5 bg-indigo-50 rounded-lg shrink-0 group-hover:bg-indigo-100 transition-colors text-indigo-500">
                                {tpl.icon ? <tpl.icon size={16} /> : getTemplateIcon(idx)}
                            </div>
                            <h5 className="text-xs font-bold text-gray-700 group-hover:text-indigo-700 transition-colors">{tpl.title}</h5>
                        </div>
                        <p className="text-[11px] text-gray-500 mb-2 leading-relaxed">{tpl.description}</p>
                        <p className="text-xs text-gray-600 truncate bg-gray-50 p-2 rounded border border-gray-100 font-mono group-hover:bg-white group-hover:border-indigo-100 transition-colors" title={tpl.prompt}>{tpl.prompt}</p>
                    </div>
                    <button
                        onClick={() => applyTemplate(tpl.prompt)}
                        className="shrink-0 mt-1 bg-indigo-50 text-indigo-600 p-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-all flex flex-col items-center justify-center gap-1 text-[10px] font-bold border border-indigo-100 w-16 h-full self-stretch"
                        title="نسخ القالب إلى مربع الكتابة"
                    >
                        <ArrowDown size={16} />
                        استخدم
                    </button>
                 </div>
               ))}
               
               {generatingExample ? (
                 <div className="relative flex flex-col justify-between p-3 bg-white border border-indigo-200 rounded-xl shadow-sm h-full min-h-[100px] overflow-hidden select-none">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-50 rounded-full blur-xl opacity-50"></div>
                    <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-purple-50 rounded-full blur-xl opacity-50"></div>

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent z-10 -translate-x-full" style={{ animation: 'shimmer 1.5s infinite' }}></div>
                    <style>{`
                        @keyframes shimmer {
                            0% { transform: translateX(-150%); }
                            50% { transform: translateX(100%); }
                            100% { transform: translateX(150%); }
                        }
                    `}</style>

                    <div className="relative z-0 opacity-50 space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                             <div className="w-8 h-8 rounded-lg bg-indigo-200 animate-pulse"></div>
                             <div className="h-4 w-24 bg-indigo-100 rounded animate-pulse"></div>
                        </div>
                        <div className="space-y-1.5">
                             <div className="h-2 w-full bg-gray-100 rounded animate-pulse"></div>
                             <div className="h-2 w-5/6 bg-gray-100 rounded animate-pulse"></div>
                             <div className="h-2 w-4/6 bg-gray-100 rounded animate-pulse"></div>
                        </div>
                    </div>
                    
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                         <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-indigo-100 flex items-center gap-2 text-indigo-600 animate-pulse">
                             <Sparkles size={16} className="animate-spin" style={{animationDuration: '3s'}}/>
                             <span className="text-xs font-bold">جاري استحضار الإبداع...</span>
                         </div>
                    </div>
                 </div>
               ) : (
                 <button
                   onClick={handleGenerateExample}
                   disabled={loading}
                   className="flex items-center justify-center gap-2 p-3 bg-indigo-50 border border-dashed border-indigo-300 rounded-xl text-indigo-700 hover:bg-indigo-100 transition-all text-sm font-bold min-h-[100px] group"
                 >
                   <div className="p-2 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                      <Lightbulb size={20} className="text-indigo-500" />
                   </div>
                   <span>توليد مثال جديد بالذكاء الاصطناعي</span>
                 </button>
               )}
             </div>
          </div>
        )}

        <div>
          <div className="flex flex-wrap justify-between items-end mb-2 gap-2">
            <label className="block text-sm font-medium text-gray-700">مساحة العمل:</label>
            
            <div className="flex items-center gap-2">
                <button
                    onClick={handleGenerateExample}
                    disabled={loading || generatingExample}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-200 disabled:opacity-50"
                    title="توليد مثال جديد يتوافق مع النموذج المختار"
                >
                    {generatingExample ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                    <span className="hidden sm:inline">مثال ذكي</span>
                </button>

                <div className="h-4 w-px bg-gray-300 mx-1"></div>

                <div className="relative">
                    <button 
                        onClick={() => setShowHistory(!showHistory)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors border text-xs font-bold ${showHistory ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                        disabled={generatingExample}
                    >
                        <History size={14} />
                        <span>السجل</span>
                    </button>

                    {showHistory && (
                        <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="p-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                                <h4 className="text-xs font-bold text-gray-500 flex items-center gap-1">
                                    <Clock size={12} />
                                    آخر المحاولات
                                </h4>
                                <div className="flex items-center gap-1">
                                    {history.length > 0 && (
                                        <button 
                                            onClick={clearHistory}
                                            className="text-[10px] text-red-500 hover:text-red-700 flex items-center gap-1 px-2 py-1 hover:bg-red-50 rounded"
                                            title="مسح السجل"
                                        >
                                            <Trash2 size={10} />
                                            مسح
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => setShowHistory(false)}
                                        className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-200 rounded transition-colors"
                                        title="إغلاق"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="max-h-60 overflow-y-auto">
                                {history.length === 0 ? (
                                    <div className="p-6 text-center text-gray-400 text-xs">
                                        لا يوجد سجل للأوامر بعد.
                                    </div>
                                ) : (
                                    <ul className="divide-y divide-gray-100">
                                        {history.map((item, idx) => (
                                            <li key={idx}>
                                                <button 
                                                    onClick={() => handleRestoreFromHistory(item)}
                                                    className="w-full text-right p-3 hover:bg-indigo-50 transition-colors group"
                                                >
                                                    <p className="text-xs text-gray-700 line-clamp-2 group-hover:text-indigo-700 font-medium">
                                                        {item}
                                                    </p>
                                                    <span className="text-[10px] text-indigo-400 mt-1 block opacity-0 group-hover:opacity-100 transition-opacity">
                                                        استعادة ↩
                                                    </span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {input && !generatingExample && (
                    <button 
                        onClick={() => setInput('')}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-xs font-bold border border-transparent hover:border-red-100"
                        title="مسح النص"
                    >
                        <Trash2 size={14} />
                        <span className="hidden sm:inline">مسح</span>
                    </button>
                )}
            </div>
          </div>

          {showHistory && (
                 <div className="fixed inset-0 z-40" onClick={() => setShowHistory(false)}></div>
          )}
          
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={generatingExample ? "جاري كتابة المثال..." : `اكتب أمرك هنا باستخدام هيكلية ${activeFramework?.name}...`}
              className={`w-full p-4 rounded-xl border-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all resize-none text-gray-800 leading-relaxed ${generatingExample ? 'bg-gray-50 border-indigo-100 animate-pulse text-gray-400' : 'bg-white border-gray-200'} ${isFullScreen ? 'h-[40vh]' : 'h-40'}`}
              disabled={generatingExample}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSend}
            disabled={loading || !input || generatingExample}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-indigo-200 min-w-[140px]"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
            نفذ الأمر
          </button>
          
          <button
            onClick={toggleVoiceInput}
            disabled={loading || generatingExample}
            className={`flex-none w-auto py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 font-bold border 
                ${isListening 
                    ? 'bg-red-50 text-red-600 border-red-200 animate-pulse ring-2 ring-red-100' 
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-800'
                }`}
             title="إدخال صوتي"
          >
             {isListening ? <MicOff size={20} /> : <Mic size={20} />}
             <span className="hidden sm:inline">{isListening ? 'جاري الاستماع...' : 'إملاء صوتي'}</span>
          </button>

          <button
            onClick={handleImprove}
            disabled={loading || !input || generatingExample}
            className="flex-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 border border-purple-200 hover:border-purple-300 disabled:opacity-50 min-w-[140px]"
          >
            <Sparkles size={20} />
            حسن الأمر
          </button>
        </div>

        {response && (
          <div className={`mt-8 p-6 rounded-2xl border animate-fade-in ${response.isError ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex justify-between items-start mb-3">
                <h4 className={`text-sm font-bold uppercase tracking-wide flex items-center gap-2 ${response.isError ? 'text-red-600' : 'text-gray-500'}`}>
                {response.isError ? (
                    <>
                    <AlertCircle size={18} className="text-red-600" />
                    تنبيه: حدث خطأ
                    </>
                ) : (
                    <>
                    <Sparkles size={14} className="text-indigo-500" />
                    النتيجة من Gemini:
                    </>
                )}
                </h4>
                
                <button 
                    onClick={() => setResponse(null)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-white rounded-full"
                    title="حذف النتيجة"
                >
                    <X size={16} />
                </button>
            </div>
            
            <div className={`prose prose-lg max-w-none whitespace-pre-wrap leading-relaxed ${response.isError ? 'text-red-800 font-medium' : 'text-gray-800'}`}>
              {response.text}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};