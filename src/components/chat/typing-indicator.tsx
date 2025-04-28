'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot } from 'lucide-react';

export function TypingIndicator() {
    return (
        <div className="flex items-end gap-3 mb-4 justify-start pr-8 message-bubble"> {/* Apply animation class */}
            <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot size={18} />
                </AvatarFallback>
            </Avatar>
            <div className="p-3 rounded-lg shadow-sm bg-secondary rounded-bl-none max-w-[80%]">
                <div className="typing-indicator">
                    <span className="animate-typing-dot-1"></span>
                    <span className="animate-typing-dot-2"></span>
                    <span className="animate-typing-dot-3"></span>
                </div>
            </div>
        </div>
    );
}