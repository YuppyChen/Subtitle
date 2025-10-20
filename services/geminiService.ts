import { GoogleGenAI, Type } from "@google/genai";
import type { SubtitleEntry } from '../types';

const model = 'gemini-2.5-pro';

const srtSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      startTime: {
        type: Type.STRING,
        description: "The start time of the subtitle entry in 'HH:MM:SS,mmm' format.",
      },
      endTime: {
        type: Type.STRING,
        description: "The end time of the subtitle entry in 'HH:MM:SS,mmm' format.",
      },
      text: {
        type: Type.STRING,
        description: 'The transcribed text for this time segment.',
      },
    },
    required: ['startTime', 'endTime', 'text'],
  },
};

export const transcribeAudio = async (base64Data: string, mimeType: string): Promise<SubtitleEntry[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const audioPart = {
    inlineData: {
      data: base64Data,
      mimeType: mimeType,
    },
  };

  const textPart = {
    text: "转录提供的音频文件。为每个句子或短语生成准确、连续的时间戳。确保输出是符合所提供 schema 的有效 JSON 数组。",
  };

  try {
    const response = await ai.models.generateContent({
      model,
      contents: { parts: [audioPart, textPart] },
      config: {
        responseMimeType: 'application/json',
        responseSchema: srtSchema,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    if (!Array.isArray(result)) {
        throw new Error('API 未返回有效的字幕数组。');
    }
    
    // Basic validation of the result structure
    if (result.length > 0 && (!result[0].startTime || !result[0].endTime || !result[0].text)) {
        throw new Error('返回的字幕数据结构不正确。');
    }

    return result as SubtitleEntry[];
  } catch (error) {
    console.error("Error during transcription:", error);
    throw new Error("音频转录失败。模型可能无法处理该请求。");
  }
};

export const translateSubtitles = async (subtitles: SubtitleEntry[], targetLanguage: string): Promise<SubtitleEntry[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `将以下 JSON 数组中每个对象的 'text' 字段翻译成 ${targetLanguage}。保持完全相同的 JSON 结构，包括所有的 'startTime' 和 'endTime' 值。只修改 'text' 字段为翻译后的内容。\n\n${JSON.stringify(subtitles, null, 2)}`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
       config: {
        responseMimeType: 'application/json',
        responseSchema: srtSchema,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);

    if (!Array.isArray(result) || result.length !== subtitles.length) {
        throw new Error('API 未返回有效的翻译字幕数组。');
    }
    
    return result as SubtitleEntry[];
  } catch (error) {
    console.error("Error during translation:", error);
    throw new Error("字幕翻译失败。");
  }
};
