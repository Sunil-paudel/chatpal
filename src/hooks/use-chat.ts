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

  // Function to handle clicks on interactive prompts
  const handleAction = useCallback((actionId: string, messageId: string) => {
    let responseContent = '';
    if (actionId === 'continue_chat') {
        responseContent = "Okay, how can I help you today?";
    } else if (actionId === 'know_developer') {
        responseContent = "Sunil Paudel is my developer.";
    }

    if (responseContent) {
        const actionResponseMessage: Message = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: responseContent,
        };
        addMessage(actionResponseMessage);
    }

    // Remove actions from the original message after one is clicked
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, actions: undefined } : msg
      )
    );

  }, [addMessage]);


  const sendMessage = useCallback(async (content: string) => {
    if (isLoading || !content.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim(),
    };
    addMessage(userMessage);

    // Handle "hi" specifically to show interactive prompts
    if (content.trim().toLowerCase() === 'hi') {
      const interactiveMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: '👋 Hello! How can I assist you?', // Initial greeting part
        actions: [
            { label: 'Continue', actionId: 'continue_chat' },
            { label: 'Know the developer', actionId: 'know_developer' },
        ],
      };
      addMessage(interactiveMessage);
      return; // Exit early, don't call the AI
    }

    setIsLoading(true);

    // Prepare chat history for the AI flow
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
     toast({
      title: 'New Chat',
      description: 'Previous conversation cleared.',
    });
  }, [toast]);

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
    handleAction, // Expose handleAction
  };
}
