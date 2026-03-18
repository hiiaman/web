import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { env } from "@config/env";
import { queryKeys } from "@shared/constants/queryKeys";
import { tokenService } from "@services/auth/tokenService";
import type { MessageResponse } from "../types/matches.types";

// Derive ws:// or wss:// from the configured API base URL
const WS_BASE = (env.API_BASE_URL ?? "http://localhost:8000").replace(/^http/, "ws");

export function useChatSocket(matchId: string, petId: string) {
  const qc = useQueryClient();

  useEffect(() => {
    if (!matchId || !petId) return;

    const token = tokenService.getAccessToken();
    if (!token) return;

    const url = `${WS_BASE}/api/v1/ws/chat/${matchId}?token=${token}&pet_id=${petId}`;
    const ws = new WebSocket(url);

    ws.onmessage = (event: MessageEvent) => {
      const message: MessageResponse = JSON.parse(event.data);
      qc.setQueryData(
        queryKeys.messages(matchId),
        (old: MessageResponse[] | undefined) => {
          if (!old) return [message];
          if (old.some((m) => m.id === message.id)) return old; // dedup
          return [...old, message];
        }
      );
    };

    ws.onerror = () => {
      // Silently close — ChatWindow will fall back to the cached messages
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, [matchId, petId, qc]);
}
