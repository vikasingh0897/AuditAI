import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: process.env.MODEL || 'gemini-2.5-flash',
  systemInstruction:
    'You are a specialized finance auditor for startups. Your job is to provide a concise, professional summary of AI tool spend.',
});

export const generateAuditSummary = async (auditData: any) => {
  const prompt = `
    Analyze the following AI spend data for a startup:
    ${JSON.stringify(auditData)}

    Write a ~100-word summary explaining the findings.
    Focus on the biggest waste and the value of switching to recommendations.
    Be professional and logical enough for a CFO.
  `;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    const savings = auditData?.totalMonthlySavings || 0;
    const topTool = auditData?.tools?.[0]?.toolName || 'your AI tools';
    return `Your audit shows a potential monthly saving of $${savings}. We recommend reviewing your seat counts for ${topTool} to optimize your spend immediately.`;
  }
};
