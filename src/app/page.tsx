import { ChatContainer } from "@/components/chat/chat-container";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-background to-secondary/30">
        {/* Placeholder for Auth integration - Content shown regardless of login for now */}
       <ChatContainer />
    </main>
  );
}
