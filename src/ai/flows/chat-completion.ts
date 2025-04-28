
'use server';
/**
 * @fileOverview Implements the chat completion flow for the AI assistant.
 *
 * - chatCompletion - A function that sends a message to the AI and receives a response.
 * - ChatCompletionInput - The input type for the chatCompletion function.
 * - ChatCompletionOutput - The return type for the chatCompletion function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import type { ChatHistoryItem } from '@/lib/types'; // Import ChatHistoryItem type

// Use the imported ChatHistoryItem for consistency
const ChatCompletionInputSchema = z.object({
  message: z.string().describe('The message to send to the AI.'),
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional().describe('The history of the chat.'),
});
export type ChatCompletionInput = z.infer<typeof ChatCompletionInputSchema>;

const ChatCompletionOutputSchema = z.object({
  response: z.string().describe('The response from the AI.'),
});
export type ChatCompletionOutput = z.infer<typeof ChatCompletionOutputSchema>;

export async function chatCompletion(input: ChatCompletionInput): Promise<ChatCompletionOutput> {
  return chatCompletionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatCompletionPrompt',
  input: {
    schema: z.object({
      message: z.string().describe('The message to send to the AI.'),
      // Update schema to use consistent role enum
      chatHistory: z.array(z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
      })).optional().describe('The history of the chat.'),
    }),
  },
  output: {
    schema: z.object({
      response: z.string().describe('The response from the AI.'),
    }),
  },
  // Updated prompt to better reflect the assistant's role and use history
  prompt: `You are MyAI Pal, a friendly and helpful personal AI assistant.
Respond to the user's message below. Use the provided chat history to understand the context and provide relevant, coherent, and engaging responses.

{% if chatHistory %}
Chat History (Oldest to Newest):
{{#each chatHistory}}
{{role}}: {{content}}
{{/each}}
{% endif %}

Current User Message: {{{message}}}

Your Response:`,
});

const chatCompletionFlow = ai.defineFlow<
  typeof ChatCompletionInputSchema,
  typeof ChatCompletionOutputSchema
>({
  name: 'chatCompletionFlow',
  inputSchema: ChatCompletionInputSchema,
  outputSchema: ChatCompletionOutputSchema,
}, async input => {
  // Ensure chatHistory is passed to the prompt correctly
  const {output} = await prompt({
      message: input.message,
      chatHistory: input.chatHistory
  });
  return output!;
});

