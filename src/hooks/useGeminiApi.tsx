import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

const genAI = new GoogleGenerativeAI("AIzaSyC6Y0qOQJrLWPrQBim7oKE7nnJ0l-k00b4");

export const useGeminiApi = () => {
  const [isLoading, setIsLoading] = useState(false);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const requestApi = async <T,>(prompt: string): Promise<T> => {
    setIsLoading(true);
    try {
      const result = await model.generateContent(prompt);

      if (result && result.response) {
        setIsLoading(false);

        const data = result.response
          .text()
          .replace("```json\n", "")
          .replace("\n```", "");
        return JSON.parse(data) as T;
      } else {
        throw new Error("Empty response received from Google Generative AI");
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      throw err;
    }
  };
  return {
    requestApi,
    isLoading,
  };
};
