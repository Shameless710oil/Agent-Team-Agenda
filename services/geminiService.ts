
import { GoogleGenAI, Type } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Using a placeholder. Please set your API key for full functionality.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "YOUR_API_KEY_HERE" });

interface GeneratedTask {
    text: string;
    instructions: string;
}

interface GeneratedAgenda {
    tasks: GeneratedTask[];
    overview: string;
}

export async function generateChecklist(topic: string): Promise<GeneratedAgenda> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `First, provide a brief but comprehensive overview summarizing the key components, stages, and requirements for the entire mission. Then, create a detailed, step-by-step agenda with at least 10-15 tasks for building a well-orchestrated team of AI agents for the following purpose: "${topic}". For each task, provide a concise title (text) and detailed, actionable instructions (instructions).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overview: {
                type: Type.STRING,
                description: "A summary of the entire agenda and the mission's key components."
            },
            tasks: {
              type: Type.ARRAY,
              description: "A list of tasks for the user's project.",
              items: {
                type: Type.OBJECT,
                properties: {
                  text: {
                    type: Type.STRING,
                    description: "The short title or summary of the task.",
                   },
                  instructions: {
                    type: Type.STRING,
                    description: "Detailed, step-by-step instructions for completing the task."
                  }
                },
                required: ['text', 'instructions'],
              },
            },
          },
          required: ['overview', 'tasks'],
        },
      },
    });

    const resultText = response.text;
    if (!resultText) {
        throw new Error("Received an empty response from the API.");
    }

    let result;
    try {
        result = JSON.parse(resultText);
    } catch (error) {
        console.error("Failed to parse JSON response from API:", resultText);
        throw new Error("Received an invalid response from the server. Please try again.");
    }
    
    if (result && typeof result.overview === 'string' && Array.isArray(result.tasks)) {
        const filteredTasks = result.tasks.filter((task: any): task is GeneratedTask => 
            typeof task.text === 'string' && typeof task.instructions === 'string'
        );
        return { tasks: filteredTasks, overview: result.overview };
    } else {
        throw new Error("Invalid format for tasks or overview in API response.");
    }
  } catch (error) {
    console.error("Error generating agenda:", error);
    if (error instanceof Error && error.message.includes("API key")) {
        throw new Error("Invalid API Key. Please check your API key and try again.");
    }
    throw new Error("Failed to generate agenda. Please try again later.");
  }
}