'use client';

import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button'; // Import Button
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  handleAction?: (actionId: string, messageId: string) => void; // Optional handler prop
}

export function MessageBubble({ message, handleAction }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex flex-col items-start gap-3 mb-4 message-bubble w-full', // Use flex-col and w-full for action buttons layout
        isUser ? 'items-end' : 'items-start' // Align outer container based on role
      )}
    >
      <div className={cn('flex items-start gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}>
          {/* Avatar */}
          {!isUser && (
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot size={18} />
              </AvatarFallback>
            </Avatar>
          )}
          {isUser && (
             <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-secondary text-secondary-foreground">
                <User size={18} />
              </AvatarFallback>
            </Avatar>
          )}

          {/* Message Content Bubble */}
          <div
            className={cn(
              'p-3 rounded-lg shadow-md max-w-[75%]',
              isUser
                ? 'bg-primary text-primary-foreground rounded-br-none'
                : 'bg-secondary text-secondary-foreground rounded-bl-none'
            )}
          >
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          </div>
      </div>

       {/* Action Buttons Section */}
      {!isUser && message.actions && message.actions.length > 0 && handleAction && (
        <div className="flex gap-2 mt-2 ml-11"> {/* Margin left to align with bot message bubble */}
          {message.actions.map((action) => (
            <Button
              key={action.actionId}
              variant="outline"
              size="sm"
              className="bg-background hover:bg-accent text-accent-foreground border-primary text-primary hover:text-primary/90" // Style the buttons
              onClick={() => handleAction(action.actionId, message.id)}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
