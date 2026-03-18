import { useParams } from "react-router-dom";
import { ChatWindow } from "../components/ChatWindow";

/** Standalone chat page — navigated to via chatRoute(matchId) */
export default function ChatPage() {
  const { matchId } = useParams<{ matchId: string }>();

  if (!matchId) return null;

  return (
    <div className="h-[calc(100vh-4rem)]">
      <ChatWindow matchId={matchId} />
    </div>
  );
}
