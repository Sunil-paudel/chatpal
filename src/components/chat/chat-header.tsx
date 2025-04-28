'use client';

import { Button } from '@/components/ui/button';
import { Edit, History, Trash2, PlusCircle } from 'lucide-react';
import { AuthButton } from '@/components/auth-button'; // Import AuthButton

interface ChatHeaderProps {
  onNewChat: () => void;
  onEditChat: () => void;
  onShowHistory: () => void;
  onDeleteChat: () => void;
}

export function ChatHeader({ onNewChat, onEditChat, onShowHistory, onDeleteChat }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-card">
      <h1 className="text-lg font-semibold text-card-foreground">MyAI Pal</h1>
      <div className="flex gap-1 items-center">
         <Button variant="ghost" size="icon" onClick={onNewChat} title="New Chat">
            <PlusCircle size={20} />
            <span className="sr-only">New Chat</span>
          </Button>
        <Button variant="ghost" size="icon" onClick={onEditChat} title="Edit Chat">
          <Edit size={20} />
          <span className="sr-only">Edit Chat</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={onShowHistory} title="Show History">
          <History size={20} />
          <span className="sr-only">Show History</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={onDeleteChat} title="Delete Chat (Clear)">
          <Trash2 size={20} className="text-destructive" />
           <span className="sr-only">Delete Chat</span>
        </Button>
        <AuthButton /> {/* Add AuthButton here */}
      </div>
    </header>
  );
}
