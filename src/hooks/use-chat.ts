import { useState, useCallback } from 'react';
import type { Message, ChatHistoryItem } from '@/lib/types';
import { chatCompletion } from '@/ai/flows/chat-completion';
import { useToast } from '@/hooks/use-toast';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
    setIsLoading(true);

    // Prepare chat history for the AI flow
    const chatHistory: ChatHistoryItem[] = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    try {
      const aiResponse = await chatCompletion({ message: content.trim(), chatHistory });

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
  }, [messages, isLoading, addMessage, toast]);

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

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
    clearChat();
    toast({
      title: 'Chat Cleared',
      description: 'Current chat has been cleared.',
    });
  }, [clearChat, toast]);

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    editChat,
    showHistory,
    deleteChat,
  };
}
