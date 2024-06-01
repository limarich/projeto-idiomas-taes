import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyC6Y0qOQJrLWPrQBim7oKE7nnJ0l-k00b4');
  
async function useGeminiApiQuestion() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const qt_perguntas = 10;
    const idioma_fonte = "italiano";
    const idioma_objeto = "inglês";
    const json_schema =
      ' Questão = {"question: any" : str, "reposta" : str, "alternatives" : str} ';
    const exemplos = `[
      {
        "question": "Como você traduziria a palavra \\"pato\\" para o inglês?",
        "answer": "duck",
        "alternatives": ["money", "chicken", "pig", "duck"]
      },
      {
        "question": "Qual a tradução de \\"falcão\\" para o inglês?",
        "answer": "hawk",
        "alternatives": ["hawk", "bird", "tree", "fracture"]
      },
      {
        "question": "Como se diz \\"Sol\\" em inglês?",
        "answer": "Sun",
        "alternatives": ["Moon", "Star", "Sun", "Sum"]
      },
      {
        "question": "Qual é a tradução da palavra \\"Tree\\" em português?",
        "answer": "Árvore",
        "alternatives": ["Três", "Galho", "Tronco", "Árvore"]
      },
      {
        "question": "Como se diz \\"Book\\" em português?",
        "answer": "Livro",
        "alternatives": ["Livro", "Mesa", "Caderno", "Folha"]
      }
    ]`; // Exemplos de perguntas no formato JSON
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
      " Retorne apenas list[Questão]" +
      ". Seguindo os exemplos: " +
      exemplos +
      ". Deixe todas as palavras em formato UNICODE";

    const result = await model.generateContent(prompt);

    const response = await result.response;

    if (response) {
      const text = response.text().replace("```json\n", '').replace("\n```", '');
      // console.log(text);
      return text;
    } else {
      throw new Error("Empty response received from Google Generative AI");
    }
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    throw error;
  }
}

export default useGeminiApiQuestion;
