import React, { useState, useEffect } from 'react';
import { FrameworkExplorer } from './components/FrameworkExplorer';
import { ComparisonTable } from './components/ComparisonTable';
import { Playground } from './components/Playground';
import { InteractiveInfographic } from './components/InteractiveInfographic';
import { Bot, BookOpen, PenTool, LayoutTemplate, GraduationCap, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [activeFrameworkId, setActiveFrameworkId] = useState<string>(() => {
    return localStorage.getItem('promptmaster_framework_id') || 'co-star';
  });

  useEffect(() => {
    localStorage.setItem('promptmaster_framework_id', activeFrameworkId);
  }, [activeFrameworkId]);

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 pb-20">
      {/* Hero Section */}
      <header className="bg-white border-b border-gray-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-10 translate-x-10"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-10 -translate-x-10"></div>
        
        <div className="max-w-5xl mx-auto px-6 py-16 relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-2 px-4 mb-6 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold tracking-wide shadow-sm border border-indigo-100">
            <Bot size={18} className="ml-2" />
            دليلك الاحترافي للذكاء الاصطناعي
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight text-gray-900">
            فن <span className="gradient-text">هندسة الأوامر</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            انتقل من الأوامر العشوائية إلى الهندسة الاحترافية باستخدام أحدث النماذج العالمية (CO-STAR, ICDF) لتحصل على نتائج مبهرة.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 space-y-24 mt-12">
        
        {/* Section 1: Concept & Basic Anatomy */}
        <section id="concept" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
              <BookOpen size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">تشريح الأمر الذكي</h2>
          </div>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            قبل الغوص في النماذج المتقدمة، دعنا نفهم المكونات الأساسية لأي أمر ناجح للذكاء الاصطناعي.
          </p>
          <InteractiveInfographic />
        </section>

        {/* Section 2: Frameworks */}
        <section id="frameworks" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-8">
             <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
              <LayoutTemplate size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">أشهر النماذج الهندسية</h2>
          </div>
          <p className="text-gray-600 mb-6 text-lg">
            إليك أقوى 4 نماذج يستخدمها الخبراء عالمياً. اضغط على النموذج لاستكشافه وتفعيل أمثلته في المختبر:
          </p>
          <FrameworkExplorer 
            activeTab={activeFrameworkId} 
            onTabChange={setActiveFrameworkId} 
          />
        </section>

        {/* Section 3: Comparison */}
        <section id="comparison" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-green-100 rounded-xl text-green-600">
              <PenTool size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">الفرق في النتائج</h2>
          </div>
          <ComparisonTable />
        </section>

        {/* Section 4: Playground */}
        <section id="playground" className="scroll-mt-20">
           <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
              <GraduationCap size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">مختبر التطبيق العملي</h2>
              <p className="text-gray-500 mt-1 flex items-center gap-2">
                 <Zap size={16} className="text-yellow-500 fill-yellow-500" />
                 يستخدم حالياً نموذج: <span className="font-bold text-indigo-600 uppercase">{activeFrameworkId}</span>
              </p>
            </div>
          </div>
          <Playground activeFrameworkId={activeFrameworkId} />
        </section>

      </main>

      <footer className="mt-24 py-12 bg-white border-t border-gray-200 text-center">
        <p className="text-gray-500 font-medium">منصة تعليمية لتطوير مهارات المستقبل © 2024</p>
        <p className="text-gray-400 text-sm mt-2">مدعوم بتقنيات Gemini AI المتطورة</p>
      </footer>
    </div>
  );
};

export default App;