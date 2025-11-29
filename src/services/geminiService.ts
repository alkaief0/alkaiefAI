import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  // يقرأ المفتاح من المتغيرات البيئية سواء محلياً أو على الخادم
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables");
  }
  return new GoogleGenAI({ apiKey: apiKey || '' });
};

export const generateResponse = async (prompt: string): Promise<string> => {
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "عذراً، لم أتمكن من إنشاء رد.";
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("حدث خطأ أثناء الاتصال بالذكاء الاصطناعي.");
  }
};