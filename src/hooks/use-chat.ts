import { useState, useCallback } from 'react';
import type { Message, ChatHistoryItem } from '@/lib/types';
import { chatCompletion } from '@/ai/flows/chat-completion';
import { useToast } from '@/hooks/use-toast';

// Define a default system context
const DEFAULT_SYSTEM_CONTEXT = "You are MyAI Pal, a friendly, helpful, and slightly witty personal AI assistant. Keep your responses concise and informative unless asked for more detail.";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  // Optionally, allow setting the system context via state if needed later
  const [systemContext] = useState<string>(DEFAULT_SYSTEM_CONTEXT);

  const addMessage = useCallback((message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (isLoading || !content.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim(),
    };
    addMessage(userMessage);

    // Check if the user message is "hi" (case-insensitive)
    if (content.trim().toLowerCase() === 'hi') {
      const systemPromptMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        // Reveal the system context instead of calling the AI
        content: `👋 Hello! I'm MyAI Pal.\n\n*System Prompt:*\n"${systemContext}"`,
      };
      addMessage(systemPromptMessage);
      return; // Exit early, don't call the AI
    }

    setIsLoading(true);

    // Prepare chat history for the AI flow (excluding the current "hi" message if it was that)
    // Filter out the user's "hi" message from history sent to AI if needed, but it's already handled above.
    // For other messages, include history up to the message before the current one.
    const chatHistory: ChatHistoryItem[] = messages
      .filter(msg => msg.id !== userMessage.id) // Exclude the current user message before sending history
      .map((msg) => ({
        role: msg.role,
        content: msg.content,
     }));


    try {
      // Pass the system context to the chat completion flow
      const aiResponse = await chatCompletion({
        message: content.trim(),
        systemContext: systemContext, // Include system context
        chatHistory
      });

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: aiResponse.response,
      };
      addMessage(assistantMessage);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      toast({
        title: 'Error',
        description: 'Failed to get response from AI. Please try again.',
        variant: 'destructive',
      });
      // Optionally remove the user message or add an error message
      setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, addMessage, toast, systemContext]); // Add systemContext to dependencies

  const clearChat = useCallback(() => {
    setMessages([]);
    // Optionally add a system message indicating a new chat context starts
    // addMessage({ id: crypto.randomUUID(), role: 'assistant', content: "New chat started. How can I help?" });
     toast({
      title: 'New Chat',
      description: 'Previous conversation cleared.',
    });
  }, [toast]); // Removed addMessage dependency if not adding system message

  const editChat = useCallback(() => {
    // Placeholder for edit functionality
    console.log("Edit chat requested");
    toast({
      title: 'Coming Soon',
      description: 'Edit chat functionality is not yet implemented.',
    });
  }, [toast]);

  const showHistory = useCallback(() => {
    // Placeholder for showing history
    console.log("Show history requested");
     toast({
      title: 'Coming Soon',
      description: 'Chat history display is not yet implemented.',
    });
  }, [toast]);

  const deleteChat = useCallback(() => {
    // Placeholder for deleting chat - for now, just clears
    console.log("Delete chat requested");
    clearChat(); // Re-use clearChat logic
  }, [clearChat]); // Dependency updated to clearChat

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    editChat,
    showHistory,
    deleteChat,
    // Optionally expose systemContext if it needs to be displayed or modified
    // systemContext,
  };
}
