import {getPuter} from "../getPuter";

export const createAISlice = (set: any, get: any, setError: any) => ({
    chat: async (prompt: any, imageURL?: any, testMode?: any, options?: any) => {
        const p = getPuter();
        if (!p) return setError("Puter.js not available");
        return p.ai.chat(prompt, imageURL, testMode, options);
    },

    feedback: async (path: string, message: string) => {
        const p = getPuter();
        if (!p) return setError("Puter.js not available");

        return p.ai.chat(
            [
                {
                    role: "user",
                    content: [
                        {type: "file", puter_path: path},
                        {type: "text", text: message},
                    ],
                },
            ],
            {model: "claude-3-7-sonnet"}
        );
    },

    img2txt: async (image: any, testMode?: boolean) => {
        const p = getPuter();
        if (!p) return setError("Puter.js not available");
        return p.ai.img2txt(image, testMode);
    },
});
