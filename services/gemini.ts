import { GoogleGenAI } from "@google/genai";
import { PromptModel } from "../types";

export const generatePromptFromImage = async (
  base64Image: string,
  modelType: PromptModel
): Promise<string> => {
  // Fix: Use mandatory initialization format for GoogleGenAI with named parameter and direct process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  let promptInstruction = "";

  if (modelType === PromptModel.GEMINI_PROMPT) {
    promptInstruction = `
Analyze the provided image and generate a structured description for the following categories. 
Maintain 100% identical facial identity for the subject.

Respond ONLY with the filled version of this template:

+Important Identity Rules
[Describe rules based on the image, e.g., Body proportions, skin texture, unique facial features to maintain]

+Subject & Outfit (Editable)
[Describe the person and their clothing in detail]

+Pose & Body Position (Editable)
[Describe the person's pose and position]

+Setting & Environment (Editable)
[Describe the background and surroundings]

+Lighting
[Describe the lighting of the scene]

+Camera & Composition (Editable)
[Describe the camera shot and composition]

+Atmosphere
[Describe the mood and vibe]
`;
  } else {
    switch (modelType) {
      case PromptModel.STRUCTURED:
        promptInstruction = "Deconstruct this image into a structured prompt. Format: Subject: [details], Environment: [details], Visual Style: [lighting, camera, medium, colors].";
        break;
      case PromptModel.GRAPHIC_DESIGN:
        promptInstruction = "Analyze the graphic design elements of this image. Describe the layout, typography, color palette, and visual hierarchy for a professional designer.";
        break;
      case PromptModel.JSON:
        promptInstruction = "Analyze this image and output a JSON object describing its core components: subject, background, lighting, artistic_style, and predominant_colors.";
        break;
      case PromptModel.FLUX:
        promptInstruction = "Generate a concise, natural language prompt for this image optimized for Flux.1 models. Focus on realism and high-level details.";
        break;
      case PromptModel.MIDJOURNEY:
        promptInstruction = "Write a Midjourney-optimized prompt for this image. Use descriptive keywords and suggest parameters like --ar, --v 6.0, and --stylize.";
        break;
      case PromptModel.STABLE_DIFFUSION:
        promptInstruction = "Create a Stable Diffusion prompt for this image. Use comma-separated tags and keyword weighting for specific features. Include aesthetic modifiers.";
        break;
      case PromptModel.GENERAL:
      default:
        promptInstruction = "Provide a detailed natural language description of this image that can be used to recreate it with an AI art generator.";
        break;
    }
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image.split(',')[1] } },
          { text: promptInstruction }
        ]
      }
    });

    const aiOutput = response.text || "Could not generate prompt. Please try again.";

    if (modelType === PromptModel.GEMINI_PROMPT) {
      const fixedHeader = `Generate an ultra hyper-realistic portrait of the exact same person in the uploaded image.

Maintain 100% identical facial identity with absolutely no changes: same bone structure, same jawline, same eyebrow shape, same beard pattern, same eye shape and color, same hair texture and hairline, same skin tone, same natural expression.

Do NOT alter facial geometry, do NOT beautify, do NOT smooth skin, do NOT age or de-age — perfect likeness required, zero identity drift.

`;
      const fixedFooter = `
+Quality (Always Fixed)
8K ultra hyper-realism. Extremely sharp facial details. Every pore, fine line, and hair follicle captured with cinematic precision. Natural skin textures. Perfect facial likeness identical to the uploaded person.

+Parameters (Always Fixed)
--ar 3:4 --q 2 --s 750`;

      return `${fixedHeader}${aiOutput}${fixedFooter}`;
    }

    return aiOutput;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to communicate with AI service.");
  }
};

export const enhancePrompt = async (input: string): Promise<string> => {
  // Fix: Use mandatory initialization format for GoogleGenAI with named parameter and direct process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Enhance this basic idea into a brilliant, detailed, and artistic AI image generation prompt. Add details about lighting, camera angles, environment, and style. Input: "${input}"`,
    });
    return response.text || "Failed to enhance prompt.";
  } catch (error) {
    console.error("Enhance Error:", error);
    throw new Error("Failed to enhance prompt.");
  }
};

export const generateImageFromText = async (prompt: string): Promise<string> => {
  // Fix: Use mandatory initialization format for GoogleGenAI with named parameter and direct process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned from model.");
  } catch (error) {
    console.error("Generation Error:", error);
    throw new Error("Failed to generate image.");
  }
};