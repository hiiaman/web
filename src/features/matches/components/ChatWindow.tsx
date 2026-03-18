import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { Button } from "@shared/components/ui/Button";
import { Input } from "@shared/components/ui/Input";
import LoadingSpinner from "@shared/components/feedback/LoadingSpinner";
import { timeAgo } from "@shared/utils/format";
import { usePetsStore } from "@features/pets/store/pets.store";
import { useMessages, useSendMessage } from "../hooks/useMessages";
import { useChatSocket } from "../hooks/useChatSocket";

interface Props {
  matchId: string;
}

export function ChatWindow({ matchId }: Props) {
  const { t } = useTranslation();
  const { activePetId } = usePetsStore();
  const { data: messages, isLoading } = useMessages(matchId, activePetId ?? "");
  const { mutate: send, isPending } = useSendMessage(matchId, activePetId ?? "");
  useChatSocket(matchId, activePetId ?? "");
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const content = text.trim();
    if (!content) return;
    send({ content }, { onSuccess: () => setText("") });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages?.map((msg) => {
          const isMine = msg.sender_pet_id === activePetId;
          return (
            <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
              <div
                className={[
                  "max-w-[70%] rounded-2xl px-4 py-2 text-sm",
                  isMine
                    ? "bg-brand-500 text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-800 rounded-bl-sm",
                ].join(" ")}
              >
                <p>{msg.content}</p>
                <p className={`mt-0.5 text-xs ${isMine ? "text-brand-100" : "text-gray-400"}`}>
                  {timeAgo(msg.created_at)}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 p-4 flex gap-2">
        <Input
          placeholder={t("chat.placeholder")}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          className="flex-1"
        />
        <Button type="button" onClick={handleSend} loading={isPending} disabled={!text.trim()}>
          {t("chat.send")}
        </Button>
      </div>
    </div>
  );
}
