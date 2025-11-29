import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
      <table className="w-full text-right bg-white">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="p-5 text-gray-700 font-bold text-lg w-1/2">أمر ضعيف (عام جداً)</th>
            <th className="p-5 text-gray-700 font-bold text-lg w-1/2">أمر هندسي (متقن)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          <tr className="hover:bg-gray-50 transition-colors">
            <td className="p-5 align-top">
              <div className="flex gap-3">
                <XCircle className="text-red-500 shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-red-900 bg-red-50 px-2 py-1 rounded inline-block mb-2">"اكتب عن الفضاء"</p>
                  <p className="text-sm text-gray-500">النتيجة: نص عشوائي، قد يكون صعباً أو بسيطاً جداً، وغير محدد.</p>
                </div>
              </div>
            </td>
            <td className="p-5 align-top">
              <div className="flex gap-3">
                <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-green-900 bg-green-50 px-2 py-1 rounded inline-block mb-2">"أنت رائد فضاء، اشرح الحياة في المحطة الدولية لطفل عمره 10 سنوات في 3 نقاط."</p>
                  <p className="text-sm text-gray-500">النتيجة: نص ممتع، مناسب للعمر، محدد الهيكل، وغني بالمعلومات.</p>
                </div>
              </div>
            </td>
          </tr>
          <tr className="hover:bg-gray-50 transition-colors">
            <td className="p-5 align-top">
              <div className="flex gap-3">
                <XCircle className="text-red-500 shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-red-900 bg-red-50 px-2 py-1 rounded inline-block mb-2">"لخص لي هذا النص"</p>
                  <p className="text-sm text-gray-500">النتيجة: تلخيص قد يهمل النقاط التي تهمك.</p>
                </div>
              </div>
            </td>
            <td className="p-5 align-top">
              <div className="flex gap-3">
                <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-green-900 bg-green-50 px-2 py-1 rounded inline-block mb-2">"لخص النص التالي في جدول يوضح الإيجابيات والسلبيات فقط."</p>
                  <p className="text-sm text-gray-500">النتيجة: جدول منظم يركز بالضبط على ما تريد مقارنته.</p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};