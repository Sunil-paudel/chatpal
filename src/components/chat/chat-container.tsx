'use client';

import { useChat } from '@/hooks/use-chat';
import { ChatHeader } from './chat-header';
import { ChatDisplay } from './chat-display';
import { ChatInput } from './chat-input';
import { Card } from '@/components/ui/card';

export function ChatContainer() {
  const {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    editChat,
    showHistory,
    deleteChat
  } = useChat();

  // Note: User Login (NextAuth) is not implemented here, assumed to be handled at a higher level or page route.

  return (
    <Card className="flex flex-col w-full max-w-2xl h-[80vh] mx-auto mt-10 shadow-xl rounded-lg overflow-hidden">
      <ChatHeader
        onNewChat={clearChat} // Use clearChat for New Chat for now
        onEditChat={editChat}
        onShowHistory={showHistory}
        onDeleteChat={deleteChat}
      />
      <ChatDisplay messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </Card>
  );
}
