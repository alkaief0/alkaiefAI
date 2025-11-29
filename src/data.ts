import { FrameworkData } from './types';
import { 
  GraduationCap, Code, FileText, Briefcase, Calculator, Book, 
  Lightbulb, MessageSquare 
} from 'lucide-react';

export const frameworks: FrameworkData[] = [
  {
    id: 'co-star',
    name: 'CO-STAR',
    fullName: 'Context, Objective, Style, Tone, Audience, Response',
    description: 'الإطار الذهبي والأكثر شمولاً. يستخدم للمهام المعقدة التي تتطلب دقة عالية في الأسلوب.',
    bestFor: 'كتابة المحتوى الإبداعي (قصص، مقالات)، التسويق وصياغة الإعلانات، الرسائل الرسمية الحساسة، وإنشاء شخصيات افتراضية.',
    steps: [
      { letter: 'C', name: 'Context (السياق)', description: 'أعط خلفية عن الموضوع.', color: 'bg-blue-500' },
      { letter: 'O', name: 'Objective (الهدف)', description: 'ماذا تريد أن تحقق؟', color: 'bg-purple-500' },
      { letter: 'S', name: 'Style (الأسلوب)', description: 'أسلوب الكتابة (رسمي، فكاهي..).', color: 'bg-pink-500' },
      { letter: 'T', name: 'Tone (النبرة)', description: 'المشاعر (حماسي، هادئ..).', color: 'bg-orange-500' },
      { letter: 'A', name: 'Audience (الجمهور)', description: 'من سيقرأ هذا؟', color: 'bg-green-500' },
      { letter: 'R', name: 'Response (الشكل)', description: 'جدول، قائمة، كود..', color: 'bg-indigo-500' },
    ],
    fullExample: 'أنا مدير تسويق (C). أريد كتابة منشور لفيسبوك للترويج لمنتج قهوة جديد (O). استخدم أسلوب "ستوري تيلينج" (S). اجعل النبرة حماسية ونشيطة (T). جمهوري هم طلاب الجامعات (A). اجعل الرد عبارة عن نص قصير مع 3 هاشتاقات مقترحة (R).',
    templates: [
      {
        title: "الشرح التعليمي",
        description: "مثالي للمعلمين والطلاب لتبسيط المفاهيم المعقدة.",
        icon: GraduationCap,
        prompt: "أنا [طالب/معلم] (C). هدفي [شرح درس/كتابة مقال] عن [الموضوع] (O). بأسلوب [قصصي/علمي] (S). ونبرة [مشجعة/رسمية] (T). موجه لـ [الأطفال/الزملاء] (A). التنسيق [قائمة نقاط/جدول] (R)."
      },
      {
        title: "المبرمج المساعد",
        description: "للحصول على شرح للكود أو مفاهيم برمجية.",
        icon: Code,
        prompt: "Context: أنا مطور برمجيات مبتدئ. Objective: أريد فهم مفهوم الـ Recursion. Style: شرح مبسط مع تشبيهات من الواقع. Tone: ودود ومشجع. Audience: طلاب برمجة. Response: شرح نصي + كود بايثون بسيط."
      }
    ]
  },
  {
    id: 'icdf',
    name: 'ICDF',
    fullName: 'Instruction, Context, Data, Format',
    description: 'نموذج مباشر وسريع. ممتاز للمهام التحليلية أو التي تتطلب معالجة نصوص.',
    bestFor: 'تحليل النصوص، التلخيص المركز، استخراج البيانات والمعلومات من التقارير، الترجمة التقنية، وتنظيف النصوص.',
    steps: [
      { letter: 'I', name: 'Instruction (التعليمة)', description: 'الأمر المباشر (لخص، ترجم..).', color: 'bg-red-500' },
      { letter: 'C', name: 'Context (السياق)', description: 'لماذا نقوم بذلك؟', color: 'bg-blue-500' },
      { letter: 'D', name: 'Data (البيانات)', description: 'النص أو المعلومات التي سيعمل عليها.', color: 'bg-yellow-500' },
      { letter: 'F', name: 'Format (التنسيق)', description: 'شكل المخرجات النهائي.', color: 'bg-gray-600' },
    ],
    fullExample: 'قم بتلخيص النص التالي (I). أنا طالب أحتاج لمراجعة سريعة قبل الاختبار (C). [هنا تضع نص الدرس الطويل...] (D). اجعل الناتج على شكل نقاط رئيسية بوليت بوينتس (F).',
    templates: [
        {
          title: "استخراج التواريخ",
          description: "استخرج الأحداث التاريخية المهمة من نص طويل.",
          icon: FileText,
          prompt: "Instruction: استخرج التواريخ والأحداث المهمة. Context: لعمل جدول زمني لمشروع التاريخ. Data: [الصق النص التاريخي هنا]. Format: جدول زمني مرتب (سنة - حدث)."
        },
        {
          title: "قاموس المصطلحات",
          description: "ترجمة قائمة كلمات مع أمثلة.",
          icon: Book,
          prompt: "Instruction: ترجم المصطلحات العلمية. Context: لتحضير قاموس مصطلحات للطلاب. Data: [ضع قائمة الكلمات الإنجليزية هنا]. Format: جدول (الكلمة - الترجمة - مثال)."
        }
    ]
  },
  {
    id: 'rcr',
    name: 'RCR-EOC',
    fullName: 'Role, Context, Result - Example, Output, Constraint',
    description: 'النموذج الهندسي المتقدم. يقسم الأمر لمرحلتين: التعريف ثم التفاصيل. ممتاز للبرمجة والمشاكل المعقدة.',
    bestFor: 'كتابة وتصحيح الكود البرمجي (Coding)، حل المسائل الرياضية المعقدة، التخطيط الاستراتيجي، وبناء الأدلة الإرشادية.',
    steps: [
      { letter: 'R', name: 'Role (الدور)', description: 'من هو الذكاء الاصطناعي؟', color: 'bg-indigo-600' },
      { letter: 'C', name: 'Context (السياق)', description: 'خلفية المشكلة.', color: 'bg-blue-500' },
      { letter: 'R', name: 'Result (النتيجة)', description: 'ماذا نريد تحقيقه؟', color: 'bg-purple-600' },
      { letter: 'E', name: 'Example (مثال)', description: 'أعطه مثالاً ليقلده (One-shot).', color: 'bg-green-600' },
      { letter: 'O', name: 'Output (المخرج)', description: 'كيف يبدو الشكل النهائي؟', color: 'bg-orange-500' },
      { letter: 'C', name: 'Constraint (قيد)', description: 'ما يجب تجنبه.', color: 'bg-red-500' },
    ],
    fullExample: 'أنت خبير تغذية (R). لدي عميل يريد إنقاص وزنه 5 كيلو (C). صمم خطة وجبات (Result). مثل: "الفطور: بيض مسلوق.." (E). أريد الجدول في ملف CSV (O). ممنوع استخدام المكسرات لأنه يعاني من حساسية (C).',
    templates: [
        {
          title: "صانع المسائل الرياضية",
          description: "توليد مسائل للطلاب مع حلولها.",
          icon: Calculator,
          prompt: "Role: مدرس رياضيات خبير. Context: الطلاب يجدون صعوبة في فهم الكسور. Result: مجموعة مسائل تدريبية متدرجة الصعوبة. Example: (1/2 + 1/4 = ?). Output: قائمة من 5 مسائل مع الحلول. Constraint: لا تستخدم كسوراً عشرية."
        },
        {
          title: "بناء واجهة موقع",
          description: "كود HTML/CSS لعناصر واجهة المستخدم.",
          icon: Code,
          prompt: "Role: مساعد برمجي. Context: أبني موقعاً شخصياً. Result: كود لإنشاء قائمة تنقل (Navbar). Example: مثل موقع آبل. Output: HTML & CSS code. Constraint: يجب أن يكون متجاوباً مع الجوال."
        }
    ]
  },
  {
    id: 'micro',
    name: 'MICRO',
    fullName: 'Mission, Input, Context, Role, Output',
    description: 'نموذج رشيق وسهل التذكر. يركز على المهمة الأساسية أولاً.',
    bestFor: 'العصف الذهني السريع (Brainstorming)، كتابة التسميات التوضيحية (Captions) لوسائل التواصل، والردود القصيرة الفورية.',
    steps: [
      { letter: 'M', name: 'Mission (المهمة)', description: 'الهدف الرئيسي باختصار.', color: 'bg-teal-500' },
      { letter: 'I', name: 'Input (المدخلات)', description: 'التفاصيل المتوفرة لديك.', color: 'bg-cyan-500' },
      { letter: 'C', name: 'Context (السياق)', description: 'الظروف المحيطة.', color: 'bg-blue-500' },
      { letter: 'R', name: 'Role (الدور)', description: 'الشخصية المقترحة.', color: 'bg-indigo-500' },
      { letter: 'O', name: 'Output (المخرجات)', description: 'تحديد الشكل والكمية.', color: 'bg-violet-500' },
    ],
    fullExample: 'اكتب بريد اعتذار (M). المدخلات: تأخرت عن الاجتماع بسبب الزحام (I). المدير صارم جداً ويهتم بالوقت (C). اكتب كسكرتير محترف (R). فقرة واحدة رسمية جداً (O).',
    templates: [
        {
          title: "عصف ذهني للمشاريع",
          description: "توليد أفكار إبداعية لمشاريع مدرسية.",
          icon: Lightbulb,
          prompt: "Mission: اقتراح أفكار لمشروع علوم. Input: موضوع الطاقة المتجددة، أدوات منزلية. Context: معرض العلوم المدرسي للصف التاسع. Role: مرشد علمي مبدع. Output: 3 أفكار مميزة وقابلة للتنفيذ."
        },
        {
          title: "منشور تواصل اجتماعي",
          description: "كتابة وصف (Caption) جذاب للصور.",
          icon: MessageSquare,
          prompt: "Mission: كتابة كابشن لصورة. Input: صورة كوب قهوة وكتاب في يوم ممطر. Context: حساب انستغرام شخصي مهتم بالقراءة. Role: مؤثر هادئ وملهم. Output: عبارة شاعرية قصيرة + سؤال للمتابعين + 3 هاشتاقات."
        }
    ]
  }
];