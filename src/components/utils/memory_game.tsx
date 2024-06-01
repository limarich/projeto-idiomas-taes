import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyC6Y0qOQJrLWPrQBim7oKE7nnJ0l-k00b4');

async function useGeminiApiMemoryCard() {
    try{
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const qt_pares = 15;
        const idioma1 = "russo";
        const idioma2 = "português";
        
        const json_schema = 'ParDePalavra = {"palavra1" : str, "palavra2 : str}'
        
        const exemplos = `[
           {
            "palavra1": "pato",
            "palavra2": "duck"
           },
           {
            "palavra1": "árvore",
            "palavra2": "tree"
           },
           {
            "palavra1": "fiore",
            "palavra2": "flower"
           },
           {
            "palavra1": "gatto",
            "palavra2": "gato"
           },
           {
            "palavra1": "book",
            "palavra2": "livro"
           },
           {
            "palavra1": "love",
            "palavra2": "amore"
           },
           {
            "palavra1": "猫 (neko)",
            "palavra2": "Gato
          },
          {
            "palavra1": "нога (noga)",
            "palavra2": "pé"
          }
        ]`;
        
        const prompt = "Me dê " +
            qt_pares +
            " pares de palavras, onde cada par correponde à uma primeira palavra escrita em " +
            idioma1 +
            " e outra segunda palavra que corresponde à sua tradução em " + 
            idioma2 +
            ". Usando o seguinte esquema JSON: " +
            json_schema + " Retorne apenas list[ParDePalavra] . Seguindo os exemplos: " +
            exemplos +
            " Deixe toda a resposta em formato UNICODE." + 
            " Coloque a pronúncia de cada palavra em seu respectivo idioma ao lado dela, entre parênteses." +
            " Não insira nada além do pedido na resposta, nenhuma observação.";
        
        const result = await model.generateContent(prompt);
        
        const response = await result.response;
        
            if (response) {
              const text = response.text().replace("```json\n", '').replace("\n```", '');
              // console.log(text);
              return text;
            } else {
              throw new Error("Empty response received from Google Generative AI");
            }
    } catch(error){
        console.error("Error fetching memory card pairs:", error);
        throw error;
    }
}

export default useGeminiApiMemoryCard;