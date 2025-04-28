'use client';

import React, { useRef, useEffect } from 'react';
import type { Message } from '@/lib/types';
import { MessageBubble } from './message-bubble';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton

interface ChatDisplayProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatDisplay({ messages, isLoading }: ChatDisplayProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages are added or loading state changes
  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages, isLoading]);


  return (
    // Pass viewportRef prop correctly to the ScrollArea component
    <ScrollArea className="flex-grow h-0 p-4" viewportRef={viewportRef} ref={scrollAreaRef}>
      <div className="flex flex-col gap-4 pb-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-start gap-3 mb-4 justify-start">
             <Skeleton className="w-8 h-8 rounded-full" />
            <div className="p-3 rounded-lg shadow-md bg-secondary rounded-bl-none max-w-[75%]">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
