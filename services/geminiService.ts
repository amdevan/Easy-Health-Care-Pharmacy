import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

const initializeAI = () => {
  if (!apiKey) {
    console.warn("Gemini API Key is missing.");
    return;
  }
  ai = new GoogleGenAI({ apiKey });
};

export const startChatSession = () => {
  if (!ai) initializeAI();
  if (!ai) return null;

  try {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are a helpful, professional, and empathetic pharmacist assistant for "Easy Health Care - Online Pharmacy" in Nepal. 
        Your goal is to assist users with general medication questions, OTC product recommendations, and explain how the prescription upload works.
        
        Guidelines:
        1. Always be polite and concise.
        2. If a user describes serious symptoms (chest pain, trouble breathing, severe bleeding, etc.), IMMEDIATELY advise them to see a doctor or go to a hospital. Do not try to treat them.
        3. For minor ailments (headache, cold), suggest OTC categories but add a disclaimer that you are an AI and they should verify with a real pharmacist.
        4. Explain that for prescription meds (Antibiotics, Cardiac, etc.), they MUST upload a doctor's prescription via the "Upload Prescription" tab.
        5. Mention "EasyCare 365" for chronic disease refill plans if relevant.
        6. Prices are in NPR (Nepalese Rupees).
        
        Keep answers short and helpful.`,
      },
    });
    return chatSession;
  } catch (error) {
    console.error("Failed to start chat session", error);
    return null;
  }
};

export const sendMessageToPharmacist = async (message: string): Promise<string> => {
  if (!chatSession) {
    startChatSession();
  }
  
  if (!chatSession) {
    return "I'm having trouble connecting to the pharmacist network right now. Please try again later.";
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "I understood, but I don't have a specific answer for that. Could you rephrase?";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "I apologize, but I'm having trouble processing your request right now. Please try again.";
  }
};
