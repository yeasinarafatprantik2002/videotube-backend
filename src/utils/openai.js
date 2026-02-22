import OpenAI from "openai";

let openaiClient = null;

const getOpenAIClient = () => {
    if (!openaiClient) {
        openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
    return openaiClient;
};

/**
 * Uses the OpenAI API to generate a video title and description
 * based on a user-supplied topic or prompt.
 *
 * @param {string} topic - The subject or idea for the video.
 * @returns {{ title: string, description: string }}
 */
const generateVideoMetadata = async (topic) => {
    const openai = getOpenAIClient();

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content:
                    "You are a creative YouTube content creator assistant. " +
                    "When given a topic, respond with ONLY valid JSON (no markdown) " +
                    'containing exactly two keys: "title" (a catchy, SEO-friendly video title, max 100 characters) ' +
                    'and "description" (an engaging video description of 2-3 sentences, max 500 characters).',
            },
            {
                role: "user",
                content: `Generate a video title and description for the following topic: ${topic}`,
            },
        ],
        response_format: { type: "json_object" },
        max_tokens: 300,
    });

    if (!completion.choices || completion.choices.length === 0) {
        throw new Error("No response from AI service");
    }

    const raw = completion.choices[0].message.content;
    return JSON.parse(raw);
};

export { generateVideoMetadata };
