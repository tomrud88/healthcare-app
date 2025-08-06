import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export interface AIResponse {
  message: string;
  confidence: number;
  suggestedSpecialties?: string[];
}

export class AIHealthService {
  private systemPrompt = `You are a professional AI health assistant for a healthcare application. Your role is to:

1. Provide helpful, accurate health information and guidance
2. Analyze symptoms and suggest appropriate medical specialties
3. Offer immediate care advice for common health concerns
4. Always recommend professional medical consultation for serious symptoms
5. Maintain a caring, professional, and reassuring tone

Guidelines:
- Keep responses concise but comprehensive (max 500 words)
- Use bullet points and clear formatting
- Include relevant emojis for better readability
- Always include appropriate disclaimers about seeking professional care
- For serious symptoms, emphasize emergency care
- Focus on evidence-based information

Format your response with:
- Brief assessment of the concern
- Immediate care recommendations
- When to seek professional help
- Relevant specialty recommendations (if applicable)

Never provide specific diagnoses or replace professional medical advice.`;

  async getHealthAdvice(
    userQuery: string,
    context?: string
  ): Promise<AIResponse> {
    try {
      // Check if API key is properly configured
      if (
        !import.meta.env.VITE_GEMINI_API_KEY ||
        import.meta.env.VITE_GEMINI_API_KEY === "your_gemini_api_key_here" ||
        import.meta.env.VITE_GEMINI_API_KEY === "your_actual_api_key_here"
      ) {
        console.error(
          "Gemini API key not configured properly. Please add your API key to .env.local"
        );
        return this.getFallbackResponse();
      }

      const contextPrompt = context
        ? `Previous conversation context: ${context}\n\nCurrent question: ${userQuery}`
        : userQuery;

      const prompt = `${this.systemPrompt}\n\nUser Query: ${contextPrompt}`;

      console.log("Calling Gemini API for query:", userQuery);

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const message =
        response.text() ||
        "I apologize, but I'm unable to provide a response at this time. Please try again or consult with a healthcare professional.";

      console.log("Gemini API response received successfully");

      // Extract suggested specialties based on keywords in the response
      const suggestedSpecialties = this.extractSpecialties(message);

      return {
        message,
        confidence: 0.85,
        suggestedSpecialties,
      };
    } catch (error) {
      console.error("AI Service Error:", error);
      console.error("Error details:", {
        message: error instanceof Error ? error.message : "Unknown error",
        name: error instanceof Error ? error.name : "Unknown",
      });
      return this.getFallbackResponse();
    }
  }

  async analyzeSymptoms(symptoms: string): Promise<{
    specialties: string[];
    urgencyLevel: "low" | "medium" | "high" | "emergency";
    advice: string;
  }> {
    try {
      const analysisPrompt = `You are a medical triage AI. Analyze these symptoms and provide:
1. Most relevant medical specialties (from: Cardiology, Dermatology, Neurology, Pediatrics, Dentistry, Orthopedics, Nephrology, Pulmonology, Gynecology)
2. Urgency level (low/medium/high/emergency)
3. Brief advice

Symptoms: ${symptoms}

Respond in this JSON format:
{
  "specialties": ["specialty1", "specialty2"],
  "urgencyLevel": "level",
  "advice": "brief advice"
}`;

      const result = await model.generateContent(analysisPrompt);
      const response = await result.response;
      const responseText = response.text() || "";

      try {
        const parsed = JSON.parse(responseText);
        return {
          specialties: parsed.specialties || ["General Medicine"],
          urgencyLevel: parsed.urgencyLevel || "medium",
          advice:
            parsed.advice ||
            "Please consult with a healthcare professional for proper evaluation.",
        };
      } catch {
        // Fallback if JSON parsing fails
        return this.getFallbackSymptomAnalysis(symptoms);
      }
    } catch (error) {
      console.error("Symptom Analysis Error:", error);
      return this.getFallbackSymptomAnalysis(symptoms);
    }
  }

  private extractSpecialties(message: string): string[] {
    const specialtyKeywords = {
      Cardiology: [
        "heart",
        "cardiac",
        "chest pain",
        "blood pressure",
        "cardio",
      ],
      Dermatology: ["skin", "rash", "acne", "dermat", "eczema"],
      Neurology: ["head", "brain", "neuro", "migraine", "seizure", "headache"],
      Orthopedics: ["bone", "joint", "ortho", "fracture", "spine"],
      Pulmonology: ["lung", "breath", "cough", "respiratory", "asthma"],
      Gynecology: ["women", "gynec", "pregnancy", "menstrual"],
      Pediatrics: ["child", "pediatric", "baby", "infant", "kid"],
      Dentistry: ["tooth", "dental", "teeth", "oral", "gum", "toothache"],
      Nephrology: ["kidney", "urine", "renal", "bladder"],
    };

    const foundSpecialties: string[] = [];
    const messageLower = message.toLowerCase();

    for (const [specialty, keywords] of Object.entries(specialtyKeywords)) {
      if (keywords.some((keyword) => messageLower.includes(keyword))) {
        foundSpecialties.push(specialty);
      }
    }

    return foundSpecialties;
  }

  private getFallbackResponse(): AIResponse {
    const isConfigured =
      import.meta.env.VITE_GEMINI_API_KEY &&
      import.meta.env.VITE_GEMINI_API_KEY !== "your_gemini_api_key_here" &&
      import.meta.env.VITE_GEMINI_API_KEY !== "your_actual_api_key_here";

    const configMessage = !isConfigured
      ? `\n\n🔧 **Configuration Issue:** The AI service requires a Gemini API key to provide personalized responses. Please add your API key to .env.local\n\n`
      : `\n\n⚠️ **Technical Issue:** I'm experiencing temporary difficulties connecting to the AI service.\n\n`;

    return {
      message: `Thank you for your question about your health concerns.${configMessage}In the meantime, here's general health guidance:

🩺 **General Health Advice:**
• Monitor your symptoms and note any changes
• Stay hydrated and get adequate rest
• Contact your healthcare provider if symptoms persist or worsen
• Seek immediate medical attention for severe or emergency symptoms

**⚠️ Important:** This is general information only. Please consult with a qualified healthcare professional for personalized medical advice.`,
      confidence: 0.5,
      suggestedSpecialties: ["General Medicine"],
    };
  }

  private getFallbackSymptomAnalysis(symptoms: string) {
    // Simple keyword-based fallback
    const symptomsLower = symptoms.toLowerCase();
    let specialties: string[] = [];
    let urgencyLevel: "low" | "medium" | "high" | "emergency" = "medium";

    if (
      symptomsLower.includes("chest pain") ||
      symptomsLower.includes("heart")
    ) {
      specialties.push("Cardiology");
      urgencyLevel = "high";
    }
    if (symptomsLower.includes("skin") || symptomsLower.includes("rash")) {
      specialties.push("Dermatology");
    }
    if (
      symptomsLower.includes("headache") ||
      symptomsLower.includes("neurological")
    ) {
      specialties.push("Neurology");
    }
    if (symptomsLower.includes("tooth") || symptomsLower.includes("dental")) {
      specialties.push("Dentistry");
    }

    if (specialties.length === 0) {
      specialties = ["General Medicine"];
    }

    return {
      specialties,
      urgencyLevel,
      advice:
        "Please consult with a healthcare professional for proper evaluation of your symptoms.",
    };
  }
}

export const aiHealthService = new AIHealthService();
