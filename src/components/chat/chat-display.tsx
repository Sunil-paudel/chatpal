'use client';

import React, { useRef, useEffect } from 'react';
import type { Message } from '@/lib/types';
import { MessageBubble } from './message-bubble';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton

interface ChatDisplayProps {
  messages: Message[];
  isLoading: boolean;
  handleAction: (actionId: string, messageId: string) => void; // Add handleAction prop
}

export function ChatDisplay({ messages, isLoading, handleAction }: ChatDisplayProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages are added or loading state changes
  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages, isLoading]);


  return (
    // Remove the invalid viewportRef prop from ScrollArea
    <ScrollArea className="flex-grow h-0 p-4" ref={scrollAreaRef}>
       {/* The viewport is implicitly managed within ScrollArea, but we can use the ref if needed for direct manipulation */}
      <div ref={viewportRef} className="flex flex-col gap-4 pb-4">
        {messages.map((message) => (
          // Pass handleAction to each MessageBubble
          <MessageBubble key={message.id} message={message} handleAction={handleAction} />
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
