import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyC6Y0qOQJrLWPrQBim7oKE7nnJ0l-k00b4");

export async function UseGeminiApiQuestion() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const qt_perguntas = 10;
    // const idioma_fonte = "italiano";
    const idioma_fonte = "portugues";
    const idioma_objeto = "inglês";
    const json_schema =
      ' Questão = {"question: any" : str, "reposta" : str, "alternatives" : str} ';
    const exemplo = `[{
        question: "Qual é a tradução da palavra 'Tree' em português?",
        answer: "Árvore",
        alternatives: ["Três", "Galho", "Tronco", "Árvore"],
      }]`;
    const prompt =
      "Me dê " +
      qt_perguntas +
      " perguntas aleatórias em formato de quiz a respeito da tradução de palavras " +
      "quaisquer no idioma fonte: " +
      idioma_fonte +
      " para o idioma objeto: " +
      idioma_objeto +
      ". Usando o seguinte esquema JSON: " +
      json_schema +
      " Retorne apenas um array de questões" +
      ". Seguindo exatamente no seguinte formato : " +
      exemplo +
      ". Deixe todas as palavras em formato UNICODE e lembre sempre de incluir a resposta no array de alternativas. O nome do campo de respostas deve ser answer";

    const result = await model.generateContent(prompt);

    const response = result.response;

    if (response) {
      const text = response
        .text()
        .replace("```json\n", "")
        .replace("\n```", "");
      return text;
    } else {
      throw new Error("Empty response received from Google Generative AI");
    }
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    throw error;
  }
}
