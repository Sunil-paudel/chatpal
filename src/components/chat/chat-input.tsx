'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t">
      <Input
        type="text"
        placeholder="Type your message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={isLoading}
        className="flex-grow"
        aria-label="Chat message input"
      />
      <Button
        type="submit"
        disabled={isLoading || !inputValue.trim()}
        size="icon"
        aria-label="Send message"
        className={cn(
          'bg-primary hover:bg-primary/90 text-primary-foreground',
          isLoading && 'opacity-50 cursor-not-allowed'
        )}
      >
        <SendHorizonal size={20} />
      </Button>
    </form>
  );
}
