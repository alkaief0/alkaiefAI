import React, { useState } from 'react';
import { PromptPart } from '../types';
import { User, MapPin, Target, AlertCircle, FileText, ArrowDown, ChevronDown } from 'lucide-react';

const parts: PromptPart[] = [
  {
    id: 'role',
    title: '1. الشخصية (Role)',
    description: 'حدد للذكاء الاصطناعي من هو؟',
    color: 'bg-blue-500',
    icon: 'User',
    example: '"تخيل أنك معلم فيزياء خبير..."'
  },
  {
    id: 'context',
    title: '2. السياق (Context)',
    description: 'أعطه خلفية عن الموضوع.',
    color: 'bg-purple-500',
    icon: 'MapPin',
    example: '"أشرح لطلاب في المرحلة المتوسطة لم يدرسوا الفضاء من قبل..."'
  },
  {
    id: 'task',
    title: '3. المهمة (Task)',
    description: 'ماذا تريد منه بالضبط؟',
    color: 'bg-green-500',
    icon: 'Target',
    example: '"اكتب مقالاً قصيراً يشرح الثقوب السوداء."'
  },
  {
    id: 'constraints',
    title: '4. القيود (Constraints)',
    description: 'ما هي الممنوعات أو الشروط؟',
    color: 'bg-red-500',
    icon: 'AlertCircle',
    example: '"لا تستخدم مصطلحات معقدة، ولا تتجاوز 100 كلمة."'
  },
  {
    id: 'format',
    title: '5. المخرجات (Format)',
    description: 'كيف تريد شكل الإجابة؟',
    color: 'bg-orange-500',
    icon: 'FileText',
    example: '"رتب الإجابة في نقاط واضحة."'
  }
];

const IconMap: Record<string, React.FC<any>> = {
  User, MapPin, Target, AlertCircle, FileText
};

export const InteractiveInfographic: React.FC = () => {
  const [activePart, setActivePart] = useState<string | null>(null);

  return (
    <div className="w-full py-10 px-4 bg-white rounded-3xl shadow-xl border border-gray-100 my-8 transition-all duration-500 hover:shadow-2xl">
      <style>{`
        @keyframes active-icon-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}</style>
      <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">خريطة الأمر الذكي</h2>
      <p className="text-center text-gray-500 mb-10">اضغط على كل جزء لتعرف سره</p>

      <div className="flex flex-col items-center max-w-4xl mx-auto space-y-2">
        {parts.map((part, index) => {
          const Icon = IconMap[part.icon];
          const isActive = activePart === part.id;
          
          return (
            <div key={part.id} className="relative w-full md:w-3/4 flex flex-col items-center group/item">
              {/* Connector Line */}
              {index !== 0 && (
                <div className={`h-6 w-0.5 bg-gray-200 mb-2 transition-all duration-500 ${isActive ? 'bg-indigo-300 h-8' : ''}`}></div>
              )}

              {/* Card */}
              <button
                onClick={() => setActivePart(isActive ? null : part.id)}
                className={`w-full group relative overflow-hidden transition-all duration-300 rounded-2xl border flex items-center justify-between text-right p-5
                  ${isActive 
                    ? `border-${part.color.split('-')[1]}-400 ring-2 ring-${part.color.split('-')[1]}-100 shadow-xl scale-[1.02]` 
                    : 'border-gray-100 hover:border-indigo-200 hover:shadow-lg hover:-translate-y-1 bg-white'}
                `}
              >
                 <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${isActive ? 'opacity-5 bg-gradient-to-r from-transparent to-' + part.color.split('-')[1] + '-500' : ''}`} />

                <div className="flex items-center gap-5 z-10 w-full">
                   <div 
                     className={`p-4 rounded-2xl text-white shadow-md transition-all duration-500 ease-out transform
                        ${part.color} 
                        ${isActive ? '' : 'group-hover:rotate-6 group-hover:scale-110'}
                     `}
                     style={isActive ? { animation: 'active-icon-pulse 2s infinite ease-in-out' } : {}}
                   >
                     <Icon size={28} className="drop-shadow-sm" />
                   </div>
                   
                   <div className="flex-1">
                     <h3 className={`text-xl font-bold transition-colors duration-300 ${isActive ? 'text-indigo-900' : 'text-gray-800'}`}>
                        {part.title}
                     </h3>
                     <p className="text-sm text-gray-500 mt-1">{part.description}</p>
                   </div>

                    <div className={`p-2 rounded-full transition-all duration-300 ${isActive ? 'bg-indigo-50 text-indigo-600 rotate-180' : 'text-gray-300 group-hover:text-indigo-400 group-hover:bg-gray-50'}`}>
                        <ChevronDown size={20} />
                    </div>
                </div>
              </button>

              <div 
                className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${
                  isActive ? 'max-h-48 opacity-100 mt-3 mb-4' : 'max-h-0 opacity-0'
                }`}
              >
                <div className={`
                    transform transition-all duration-500 delay-100
                    ${isActive ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
                    p-6 rounded-2xl border-r-4 ${part.color.replace('bg-', 'border-')} 
                    bg-gradient-to-l from-gray-50 to-white shadow-inner text-gray-700
                `}>
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                        <ArrowDown className={`w-5 h-5 ${part.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div>
                        <span className="font-bold block text-sm text-gray-400 uppercase tracking-wider mb-1">مثال تطبيقي:</span>
                        <span className="text-lg italic font-medium leading-relaxed text-gray-800"> {part.example} </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-12 p-6 bg-indigo-50 rounded-2xl max-w-4xl mx-auto text-center border border-indigo-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
        <p className="text-lg text-indigo-900 font-bold relative z-10">
          المعادلة السحرية = شخصية + سياق + مهمة + قيود + تنسيق 🚀
        </p>
      </div>
    </div>
  );
};