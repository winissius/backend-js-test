import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function generateDescription(imageBuffer) {
    const prompt = "Generate an English description for the following image";

    try {
        const image = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: "image/png",
            },
        };
        const res = await model.generateContent([prompt, image]);
        return res.response.text() || "Alt-text not available.";
    } catch (error) {
        console.error("Error generating alt-text:", error.message, error);
        throw new Error("Error generating alt-text with Gemini.");
    }
}